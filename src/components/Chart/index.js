import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import { easeCubicOut } from 'd3-ease';
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
    const {
      data: oldData, // already transformed
    } = this.state;
    const { data } = nextProps;
    const scaleTimeToPositionX = scaleTime()
      .range([0, CHART_WIDTH])
      .domain(extent(data, d => d.time));
    const scalePriceToPositionY = scaleLinear()
      .range([CHART_HEIGHT - 20, 20])
      .domain(extent(data, d => d.price));

    const data2 = data.map(({ price, time }) => ({
      price: scalePriceToPositionY(price),
      time: scaleTimeToPositionX(time),
    }));

    console.log(data2.length);

    this.setState({
      data: data2,
      oldData,
      scaleTimeToPositionX,
      scalePriceToPositionY,
    });
  }

  componentDidUpdate() {
    let { data, oldData } = this.state;

    if (oldData.length === 0) {
      oldData = data.map(({ time }) => ({ price: CHART_HEIGHT, time }));
    }

    const area2 = d3area()
      .x(d => d.time)
      .y0(CHART_HEIGHT)
      .y1(d => d.price);

    const line2 = d3line()
      .x(d => d.time)
      .y(d => d.price);

    const chartSvgNode = select(this.chartSvgComponent);

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
        .attr('d', area2(data))
      .transition()
        .duration(1)
        .style('fill', '#FFEBC5');

    chartSvgNode
      .append('path')
        .attr('class', 'line')
        .style('stroke', '#FFB119')
        .attr('d', line2(oldData))
      .transition()
        .duration(500)
        .ease(easeCubicOut)
        .style('stroke', '#6F7CBA')
        .attr('d', line2(data))
      .transition()
        .duration(1)
        .style('stroke', '#FFB119');
  }

  // showHoverContainers = () => {
  //   this.setState({ showContainers: true });
  // }
  // hideHoverContainers = () => {
  //   this.setState({ showContainers: false });
  // }

  // updateHoverPosition = (e) => {
  //   const svgPosition = this.chartSvgComponent.getBoundingClientRect();
  //   const hoverPositionX = e.clientX - svgPosition.left;
  //   this.setState({ hoverPositionX });
  // }

  // renderHoverContainers = () => {
  //   const { data, hoverPositionX, showContainers } = this.state;
  //   const containerLeftPosition = hoverPositionX - (HOVER_CONTAINER_WIDTH / 2);
  //   const index = Math.round((hoverPositionX / CHART_WIDTH) * (data.length - 1));
  //   const dataPoint = data[index] || {};
  //   const displayClass = classNames({ show: showContainers, hidden: !showContainers });

  //   return (
  //     <div>
  //       <div className={`hoverPriceContainer ${displayClass}`} style={{ left: containerLeftPosition }}>
  //         <div className="content">{dataPoint.price && formatCurrency(dataPoint.price, ACTIVE_CURRENCY)}</div>
  //       </div>
  //       <div className={`hoverTimeContainer ${displayClass}`} style={{ left: containerLeftPosition }}>
  //         <div className="content">{dataPoint.time && dataPoint.time.toLocaleString()}</div>
  //       </div>
  //     </div>
  //   );
  // }

  // renderActivePoint() {
  //   const { data, hoverPositionX, scaleTimeToPositionX, scalePriceToPositionY, showContainers } = this.state;
  //   const index = Math.round((hoverPositionX / CHART_WIDTH) * (data.length - 1));
  //   const dataPoint = data[index] || {};
  //   const displayClass = classNames({ show: showContainers, hidden: !showContainers });

  //   return (
  //     <circle
  //       className={`activePoint ${displayClass}`}
  //       r={ACTIVE_POINT_RADIUS}
  //       cx={scaleTimeToPositionX(dataPoint.time)}
  //       cy={scalePriceToPositionY(dataPoint.price)}
  //     />
  //   );
  // }

  // renderCursorLine() {
  //   const { hoverPositionX, showContainers } = this.state;
  //   const displayClass = classNames({ show: showContainers, hidden: !showContainers });
  //   return (
  //     <line
  //       className={`cursorLine ${displayClass}`}
  //       x1={hoverPositionX}
  //       x2={hoverPositionX}
  //       y1={0}
  //       y2={CHART_HEIGHT}
  //     />
  //   );
  // }

  // renderLineGraph() {

  //   const { data, scaleTimeToPositionX, scalePriceToPositionY } = this.state;

  //   const line = d3line()
  //     .x(d => scaleTimeToPositionX(d.time))
  //     .y(d => scalePriceToPositionY(d.price));
  //   const area = d3area()
  //     .x(d => scaleTimeToPositionX(d.time))
  //     .y0(CHART_HEIGHT)
  //     .y1(d => scalePriceToPositionY(d.price));

  //   const priceHistoryLine = line(data);
  //   const priceHistoryArea = area(data);

  //   return (
  //     <g>
  //       <path className="area" d={priceHistoryArea} />
  //       <path className="line" d={priceHistoryLine} />
  //     </g>
  //   );
  // }

  render() {
    return (
      <div className="containerFlex">
        <div className="chartContainer">
          {/* {this.renderHoverContainers()} */}
          <svg
            ref={(svg) => { this.chartSvgComponent = svg; }}
            /* onMouseEnter={this.showHoverContainers} */
            /* onMouseLeave={this.hideHoverContainers} */
            /* onMouseMove={this.updateHoverPosition} */
          >
            {/* {this.renderLineGraph()} */}
            {/* {this.renderCursorLine()}
            {this.renderActivePoint()} */}
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
