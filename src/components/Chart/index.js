import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { extent } from 'd3-array';
import { easeCubicOut } from 'd3-ease';
import { interpolatePath } from 'd3-interpolate-path';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import {
  area as d3area,
  line as d3line,
} from 'd3-shape';
import 'd3-transition';

import { formatCurrency } from '../../utils';

import './index.css';

const ACTIVE_CURRENCY = 'usd';
const ACTIVE_POINT_RADIUS = 4;
const HOVER_CONTAINER_WIDTH = 200;
const CHART_HEIGHT = 221;
const CHART_WIDTH = 1060;
const IDENTITY_FUNCTION = arg => arg;
const DEFAULT_FILL_COLOR = '#FFEBC5';
const DEFAULT_STROKE_COLOR = '#FFB119';
const INITIAL_STATE = {
  data: [],
  hoveredDataPoint: {},
  hoverXPosition: null,
  previousFillColor: DEFAULT_FILL_COLOR,
  previousScaledData: [],
  previousStrokeColor: DEFAULT_STROKE_COLOR,
  scaledData: [],
  scalePriceToY: IDENTITY_FUNCTION,
  scaleTimeToX: IDENTITY_FUNCTION,
  showContainers: false,
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillReceiveProps(nextProps) {
    const { data: nextData } = nextProps;
    const { fillColor, strokeColor } = this.props;
    let { scaledData: previousScaledData } = this.state;
    const scaleTimeToX = scaleTime()
      .range([0, CHART_WIDTH])
      .domain(extent(nextData, d => d.time));
    const scalePriceToY = scaleLinear()
      .range([CHART_HEIGHT - 20, 20])
      .domain(extent(nextData, d => d.price));

    const nextScaledData = nextData.map(({ price, time }) => ({
      price: scalePriceToY(price),
      time: scaleTimeToX(time),
    }));

    if (previousScaledData.length === 0) {
      previousScaledData = nextScaledData
        .map(({ time }) => ({ price: CHART_HEIGHT, time }));
    }

    this.setState({
      data: nextData,
      scaledData: nextScaledData,
      previousScaledData,
      previousFillColor: fillColor,
      previousStrokeColor: strokeColor,
      scaleTimeToX,
      scalePriceToY,
    });
  }

  // Don't update when component only receives new colors
  shouldComponentUpdate(nextProps) {
    const { fillColor, strokeColor } = this.props;
    const { fillColor: nextFillColor, strokeColor: nextStrokeColor } = nextProps;

    if (fillColor !== nextFillColor || strokeColor !== nextStrokeColor) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    const {
      scaledData,
      previousScaledData,
      previousFillColor,
      previousStrokeColor,
    } = this.state;
    const { fillColor, strokeColor } = this.props;

    const area = d3area()
      .x(d => d.time)
      .y0(CHART_HEIGHT)
      .y1(d => d.price);

    const line = d3line()
      .x(d => d.time)
      .y(d => d.price);

    const chart = select(this.svgNode);

    chart
      .selectAll('path')
      .remove();

    chart
      .append('path')
        .attr('class', 'area')
        .style('fill', previousFillColor)
        .attr('d', area(previousScaledData))
      .transition()
        .duration(500)
        .ease(easeCubicOut)
        .style('fill', fillColor)
        .attrTween('d', () => interpolatePath(area(previousScaledData), area(scaledData)));

    chart
      .append('path')
        .attr('class', 'line')
        .style('stroke', previousStrokeColor)
        .attr('d', line(previousScaledData))
      .transition()
        .duration(500)
        .ease(easeCubicOut)
        .style('stroke', strokeColor)
        .attrTween('d', () => interpolatePath(line(previousScaledData), line(scaledData)));
  }

  showHoverContainers = () => {
    const { scaledData } = this.state;
    this.setState({ showContainers: true, previousScaledData: scaledData });
  }

  hideHoverContainers = () => {
    this.setState({ showContainers: false });
  }

  updateHoverPosition = (e) => {
    const { data } = this.state;
    const svgBoundary = this.chartSvgComponent.getBoundingClientRect();
    const hoverXPosition = e.clientX - svgBoundary.left;

    // Find closest data point to the x-coordinates of where the user's mouse is hovering
    const index = Math.round((hoverXPosition / CHART_WIDTH) * (data.length - 1));
    const hoveredDataPoint = data[index] || {};

    this.setState({ hoveredDataPoint, hoverXPosition });
  }

  renderCursor() {
    const {
      hoveredDataPoint,
      scaleTimeToX,
      scalePriceToY,
      showContainers,
    } = this.state;

    // Find the closest data point to the hovered x-coordinate
    const xPosition = scaleTimeToX(hoveredDataPoint.time) || 0;
    const yPosition = scalePriceToY(hoveredDataPoint.price) || 0;
    const displayClass = classNames({ show: showContainers, hidden: !showContainers });

    return (
      <g>
        <line
          className={`cursorLine ${displayClass}`}
          x1={xPosition}
          x2={xPosition}
          y1={0}
          y2={CHART_HEIGHT}
        />
        <circle
          className={`activePoint ${displayClass}`}
          r={ACTIVE_POINT_RADIUS}
          cx={xPosition}
          cy={yPosition}
        />
      </g>
    );
  }

  renderHoverContainers = () => {
    const { hoveredDataPoint, hoverXPosition, showContainers } = this.state;
    const containerLeftPosition = hoverXPosition - (HOVER_CONTAINER_WIDTH / 2);
    const displayClass = classNames({ show: showContainers, hidden: !showContainers });

    return (
      <div>
        <div className={`hoverPriceContainer ${displayClass}`} style={{ left: containerLeftPosition }}>
          <div className="content">{hoveredDataPoint.price && formatCurrency(hoveredDataPoint.price, ACTIVE_CURRENCY)}</div>
        </div>
        <div className={`hoverTimeContainer ${displayClass}`} style={{ left: containerLeftPosition }}>
          <div className="content">{hoveredDataPoint.time && hoveredDataPoint.time.toLocaleString()}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="containerFlex">
        <div className="chartContainer">
          {this.renderHoverContainers()}
          <svg
            ref={(node) => { this.chartSvgComponent = node; }}
            onMouseEnter={this.showHoverContainers}
            onMouseLeave={this.hideHoverContainers}
            onMouseMove={this.updateHoverPosition}
          >
            <g ref={(node) => { this.svgNode = node; }} />
            {this.renderCursor()}
          </svg>
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
};

Chart.defaultProps = {
  fillColor: DEFAULT_FILL_COLOR,
  strokeColor: DEFAULT_STROKE_COLOR,
};

export default Chart;
