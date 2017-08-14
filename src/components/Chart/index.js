import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import {
  area as d3area,
  line as d3line,
} from 'd3-shape';

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
    const { data } = nextProps;
    const scaleTimeToPositionX = scaleTime()
      .range([0, CHART_WIDTH])
      .domain(extent(data, d => d.time));
    const scalePriceToPositionY = scaleLinear()
      .range([CHART_HEIGHT - 20, 20])
      .domain(extent(data, d => d.price));

    this.setState({
      data,
      scaleTimeToPositionX,
      scalePriceToPositionY,
    });
  }

  showHoverContainers = () => {
    this.setState({ showContainers: true });
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

  renderLineGraph() {
    const { data, scaleTimeToPositionX, scalePriceToPositionY } = this.state;

    const line = d3line()
      .x(d => scaleTimeToPositionX(d.time))
      .y(d => scalePriceToPositionY(d.price));
    const area = d3area()
      .x(d => scaleTimeToPositionX(d.time))
      .y0(CHART_HEIGHT)
      .y1(d => scalePriceToPositionY(d.price));

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
      <div className="containerFlex">
        <div className="chartContainer">
          {this.renderHoverContainers()}
          <svg
            ref={(svg) => { this.chartSvgComponent = svg; }}
            onMouseEnter={this.showHoverContainers}
            onMouseLeave={this.hideHoverContainers}
            onMouseMove={this.updateHoverPosition}
          >
            {this.renderLineGraph()}
            {this.renderCursorLine()}
            {this.renderActivePoint()}
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
