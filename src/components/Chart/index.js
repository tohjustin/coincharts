import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import { area as d3Area, line as d3Line } from 'd3-shape';
import { extent } from 'd3-array';
import { interpolatePath } from 'd3-interpolate-path';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import 'd3-transition';

import Cursor from './components/Cursor';

import {
  HOVER_CONTAINER_WIDTH,
  DEFAULT_COLOR,
  DEFAULT_TRANSITION,
  DEFAULT_FUNCTION,
} from './constants';
import { formatCurrency } from '../../utils';
import './index.css';

const ACTIVE_CURRENCY = 'usd';
const CHART_PADDING_TOP = 20;
const INITIAL_STATE = {
  data: [],
  dimensions: {
    height: 0,
    width: 0,
  },
  hovered: false,
  hoveredDataPoint: {},
  hoverX: -1,
  hoverY: -1,
  previousColor: DEFAULT_COLOR,
  previousScaledData: [],
  scaledData: [],
  scalePriceToY: DEFAULT_FUNCTION,
  scaleTimeToX: DEFAULT_FUNCTION,
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillReceiveProps(nextProps) {
    const { data: nextData } = nextProps;
    const { color } = this.props;
    const { dimensions, scaledData } = this.state;

    const scaleTimeToX = scaleTime()
      .range([0, dimensions.width])
      .domain(extent(nextData, d => d.time));

    const scalePriceToY = scaleLinear()
      .range([dimensions.height, CHART_PADDING_TOP])
      .domain(extent(nextData, d => d.price));

    const nextScaledData = nextData.map(({ price, time }) => ({
      price: scalePriceToY(price),
      time: scaleTimeToX(time),
    }));

    const previousScaledData = (scaledData.length > 0) ?
      scaledData :
      nextScaledData.map(({ time }) => ({ price: dimensions.height, time }));

    this.setState({
      data: nextData,
      scaledData: nextScaledData,
      previousScaledData,
      previousColor: color,
      scaleTimeToX,
      scalePriceToY,
    });
  }

  // Only update when we receive new data or when the component is being hovered over
  shouldComponentUpdate(nextProps, nextState) {
    const { data } = this.props;
    const { dimensions, hovered, hoverX } = this.state;
    const { data: nextData } = nextProps;
    const {
      dimensions: nextDimensions,
      hovered: nextHovered,
      hoverX: nextHoverX,
    } = nextState;

    return (
      !isEqual(dimensions, nextDimensions) ||
      !isEqual(hovered, nextHovered) ||
      !isEqual(hoverX, nextHoverX) ||
      !isEqual(data, nextData)
    );
  }

  componentDidUpdate() {
    const { previousColor, previousScaledData, scaledData, dimensions } = this.state;
    const { color, transition } = this.props;
    const chart = select(this.svgNode);

    const area = d3Area()
      .x(d => d.time)
      .y0(dimensions.height)
      .y1(d => d.price);
    const line = d3Line()
      .x(d => d.time)
      .y(d => d.price);

    const previousAreaChart = area(previousScaledData);
    const previousLineChart = line(previousScaledData);
    const newAreaChart = area(scaledData);
    const newLineChart = line(scaledData);

    chart
      .selectAll('path')
      .remove();

    chart
      .append('path')
        .attr('class', 'Chart-area')
        .attr('d', previousAreaChart)
        .style('fill', previousColor.fill)
      .transition()
        .duration(transition.duration)
        .ease(transition.ease)
        .attrTween('d', () => interpolatePath(previousAreaChart, newAreaChart))
        .style('fill', color.fill);

    chart
      .append('path')
        .attr('class', 'Chart-line')
        .attr('d', previousLineChart)
        .style('stroke', previousColor.stoke)
      .transition()
        .duration(transition.duration)
        .ease(transition.ease)
        .attrTween('d', () => interpolatePath(previousLineChart, newLineChart))
        .style('stroke', color.stroke);

    // shouldComponentUpdate() ensures the following setState() doesn't cause a uneccesary rerender
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ previousScaledData: scaledData });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { data } = this.state;
    const { height, width } = this.chartSvgComponent.getBoundingClientRect();
    const dimensions = {
      height: Math.round(height),
      width: Math.round(width),
    };

    const scaleTimeToX = scaleTime()
      .range([0, dimensions.width])
      .domain(extent(data, d => d.time));

    const scalePriceToY = scaleLinear()
      .range([dimensions.height, CHART_PADDING_TOP])
      .domain(extent(data, d => d.price));

    const scaledData = data.map(({ price, time }) => ({
      price: scalePriceToY(price),
      time: scaleTimeToX(time),
    }));

    this.setState({
      data,
      dimensions,
      scaledData,
      previousScaledData: scaledData,
      scaleTimeToX,
      scalePriceToY,
    });
  }

  showHoverElements = () => {
    this.setState({ hovered: true });
  }

  hideHoverElements = () => {
    this.setState({ hovered: false });
  }

  updateHoverPosition = (e) => {
    const { data, dimensions, scalePriceToY } = this.state;
    const hoverX =
      e.nativeEvent.clientX - this.chartSvgComponent.getBoundingClientRect().left;

    // Find closest data point to the x-coordinates of where the user's mouse is hovering
    const index = Math.round((hoverX / dimensions.width) * (data.length - 1));
    const hoveredDataPoint = data[index] || {};

    const hoverY = scalePriceToY(hoveredDataPoint.price) || 0;

    this.setState({
      hoveredDataPoint,
      hoverX,
      hoverY,
      hovered: !!hoveredDataPoint,
    });
  };

  renderHoverElements() {
    const { hoveredDataPoint, hoverX, hovered } = this.state;
    const containerLeftPosition = hoverX - (HOVER_CONTAINER_WIDTH / 2);
    const displayClass = classNames({ 'Chart-show': hovered, 'Chart-hidden': !hovered });

    return (
      <div className={displayClass}>
        <div className="Chart-priceContainer" style={{ left: containerLeftPosition }}>
          <div className="content">{hoveredDataPoint.price && formatCurrency(hoveredDataPoint.price, ACTIVE_CURRENCY)}</div>
        </div>
        <div className="Chart-timeContainer" style={{ left: containerLeftPosition }}>
          <div className="content">{hoveredDataPoint.time && hoveredDataPoint.time.toLocaleString()}</div>
        </div>
      </div>
    );
  }

  render() {
    const { dimensions, hoverX, hoverY, hovered } = this.state;

    return (
      <div className="Chart-container">
        {this.renderHoverElements()}
        <svg
          ref={(node) => { this.chartSvgComponent = node; }}
          onMouseEnter={this.showHoverElements}
          onMouseLeave={this.hideHoverElements}
          onMouseMove={this.updateHoverPosition}
        >
          <g ref={(node) => { this.svgNode = node; }} />
          <Cursor
            height={dimensions.height}
            visible={hovered}
            x={hoverX}
            y={hoverY}
          />
        </svg>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data,
  })).isRequired,
  color: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
  }),
  transition: PropTypes.shape({
    duration: PropTypes.number,
    ease: PropTypes.function,
  }),
};

Chart.defaultProps = {
  color: DEFAULT_COLOR,
  transition: DEFAULT_TRANSITION,
};

export default Chart;
