import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import {
  area as d3area,
  line as d3line,
} from 'd3-shape';

import './index.css';

const ACTIVE_POINT_RADIUS = 4;
const HOVER_CONTAINER_WIDTH = 200;
const CHART_HEIGHT = 221;
const CHART_WIDTH = 1060;
const INITIAL_STATE = {
  data: [],
  hoverPositionX: null,
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data
      .map(d => ({
        price: +d.price,
        time: new Date(d.time),
      }));

    this.setState({ data });
  }

  removeHoverCursor = () => {
    this.setState({ hoverPositionX: null });
  }

  updateHoverPosition = (e) => {
    const svgPosition = this.chartSvgComponent.getBoundingClientRect();
    const hoverPositionX = e.clientX - svgPosition.left;
    this.setState({ hoverPositionX });
  }

  renderHoverContainers = () => {
    const { data, hoverPositionX } = this.state;
    const containerLeftPosition = hoverPositionX - (HOVER_CONTAINER_WIDTH / 2);
    const index = data.length - Math.round((hoverPositionX / CHART_WIDTH) * data.length);
    const dataPoint = data[index] || {};

    return (
      <div>
        <div className="hoverContainer price" style={{ left: containerLeftPosition }}>
          <div className="hoverContent price">{dataPoint.price}</div>
        </div>
        <div className="hoverContainer time" style={{ left: containerLeftPosition }}>
          <div className="hoverContent time">{dataPoint.time && dataPoint.time.toLocaleString()}</div>
        </div>
      </div>
    );
  }

  renderActivePoint() {
    const { data, hoverPositionX } = this.state;
    const index = data.length - Math.round((hoverPositionX / CHART_WIDTH) * data.length);
    const dataPoint = data[index] || {};

    const y = scaleLinear()
      .range([CHART_HEIGHT, 0])
      .domain(extent(data, d => d.price));

    return (
      <circle
        className="activePoint"
        r={ACTIVE_POINT_RADIUS}
        cx={hoverPositionX}
        cy={y(dataPoint.price)}
      />
    );
  }

  renderCursorLine() {
    const { hoverPositionX } = this.state;
    return (
      <line
        className="cursorLine"
        x1={hoverPositionX}
        x2={hoverPositionX}
        y1={0}
        y2={CHART_HEIGHT}
      />
    );
  }

  renderLineGraph() {
    const { data } = this.state;

    const x = scaleTime()
      .range([0, CHART_WIDTH])
      .domain(extent(data, d => d.time));

    const y = scaleLinear()
      .range([CHART_HEIGHT, 0])
      .domain(extent(data, d => d.price));

    const line = d3line()
      .x(d => x(d.time))
      .y(d => y(d.price));

    const area = d3area()
      .x(d => x(d.time))
      .y0(CHART_HEIGHT)
      .y1(d => y(d.price));

    const priceHistoryLine = line(data);
    const priceHistoryArea = area(data);

    return (
      <g>
        <path className="area" d={priceHistoryArea} />
        <path className="line" d={priceHistoryLine} />
      </g>
    );
  }

  render() {
    return (
      <div className="chartContainer">
        {this.state.hoverPositionX && this.renderHoverContainers()}
        <svg
          ref={(svg) => { this.chartSvgComponent = svg; }}
          onMouseMove={this.updateHoverPosition}
          onMouseLeave={this.removeHoverCursor}
        >
          {this.renderLineGraph()}
          {this.state.hoverPositionX && this.renderCursorLine()}
          {this.state.hoverPositionX && this.renderActivePoint()}
        </svg>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
