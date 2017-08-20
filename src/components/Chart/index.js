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

import { formatCurrency } from './../../containers/CoinbaseChart/utils';

import './index.css';

const ACTIVE_CURRENCY = 'USD';
const ACTIVE_POINT_RADIUS = 4;
const HOVER_CONTAINER_WIDTH = 200;
const CHART_HEIGHT = 221;
const CHART_WIDTH = 1060;
const IDENTITY_FUNCTION = arg => arg;
const INITIAL_STATE = {
  data: [],
  oldData: [],
  hoverPositionX: null,
  showContainers: false,
  scaleTimeToPositionX: IDENTITY_FUNCTION,
  scalePriceToPositionY: IDENTITY_FUNCTION,
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillReceiveProps(nextProps) {
    const { data: nextData } = nextProps;
    const { data: oldData } = this.state;
    const scaleTimeToPositionX = scaleTime()
      .range([0, CHART_WIDTH])
      .domain(extent(nextData, d => d.time));
    const scalePriceToPositionY = scaleLinear()
      .range([CHART_HEIGHT - 20, 20])
      .domain(extent(nextData, d => d.price));

    const nextData2 = nextData.map(({ price, time }) => ({
      price: scalePriceToPositionY(price),
      time: scaleTimeToPositionX(time),
    }));

    const oldData2 = (oldData.length === 0) ?
      nextData2.map(({ time }) => ({ price: CHART_HEIGHT, time })) :
      oldData;

    this.setState({
      data: nextData2,
      oldData: oldData2,
      scaleTimeToPositionX,
      scalePriceToPositionY,
    });
  }

  componentDidUpdate() {
    const { data, oldData } = this.state;

    const area2 = d3area()
      .x(d => d.time)
      .y0(CHART_HEIGHT)
      .y1(d => d.price);

    const line2 = d3line()
      .x(d => d.time)
      .y(d => d.price);

    const chartSvgNode = select(this.svgChartNode);

    chartSvgNode
      .selectAll('path')
      .remove();

    chartSvgNode
      .append('path')
        .attr('class', 'area')
        .style('fill', '#FFEBC5')
        .attr('d', area2(oldData))
      .transition()
        .duration(500)
        .ease(easeCubicOut)
        .style('fill', '#F0F1F8')
        .attrTween('d', () => interpolatePath(area2(oldData), area2(data)));

    chartSvgNode
      .append('path')
        .attr('class', 'line')
        .style('stroke', '#FFB119')
        .attr('d', line2(oldData))
      .transition()
        .duration(500)
        .ease(easeCubicOut)
        .style('stroke', '#6F7CBA')
        .attrTween('d', () => interpolatePath(line2(oldData), line2(data)));
  }

  showHoverContainers = () => {
    const { data } = this.state;
    this.setState({ showContainers: true, oldData: data });
  }
  hideHoverContainers = () => {
    this.setState({ showContainers: false });
  }

  updateHoverPosition = (e) => {
    const svgPosition = this.chartSvgComponent.getBoundingClientRect();
    const hoverPositionX = e.clientX - svgPosition.left;
    this.setState({ hoverPositionX });
  }

  renderHoverContainers = () => {
    const { data, hoverPositionX, showContainers } = this.state;
    const containerLeftPosition = hoverPositionX - (HOVER_CONTAINER_WIDTH / 2);
    const index = Math.round((hoverPositionX / CHART_WIDTH) * (data.length - 1));
    const dataPoint = data[index] || {};
    const displayClass = classNames({ show: showContainers, hidden: !showContainers });

    return (
      <div>
        <div className={`hoverPriceContainer ${displayClass}`} style={{ left: containerLeftPosition }}>
          <div className="content">{dataPoint.price && formatCurrency(dataPoint.price, ACTIVE_CURRENCY)}</div>
        </div>
        <div className={`hoverTimeContainer ${displayClass}`} style={{ left: containerLeftPosition }}>
          <div className="content">{dataPoint.time && dataPoint.time.toLocaleString()}</div>
        </div>
      </div>
    );
  }

  renderActivePoint() {
    const { data, hoverPositionX, scaleTimeToPositionX, scalePriceToPositionY, showContainers } = this.state;
    const index = Math.round((hoverPositionX / CHART_WIDTH) * (data.length - 1));
    const dataPoint = data[index] || {};
    const displayClass = classNames({ show: showContainers, hidden: !showContainers });

    return (
      <circle
        className={`activePoint ${displayClass}`}
        r={ACTIVE_POINT_RADIUS}
        cx={scaleTimeToPositionX(dataPoint.time)}
        cy={scalePriceToPositionY(dataPoint.price)}
      />
    );
  }

  renderCursorLine() {
    const { hoverPositionX, showContainers } = this.state;
    const displayClass = classNames({ show: showContainers, hidden: !showContainers });
    return (
      <line
        className={`cursorLine ${displayClass}`}
        x1={hoverPositionX}
        x2={hoverPositionX}
        y1={0}
        y2={CHART_HEIGHT}
      />
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
            <g ref={(node) => { this.svgChartNode = node; }} />
            <g>
              {this.renderCursorLine()}
              {this.renderActivePoint()}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
