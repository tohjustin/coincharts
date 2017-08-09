import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import {
  area as d3area,
  line as d3line,
} from 'd3-shape';

import './index.css';

const INITIAL_STATE = {
  name: 'Chart Component',
};

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const data = this.props.data
      .map(d => ({
        price: +d.price,
        time: new Date(d.time),
      }));
    const height = 221;
    const width = 1060;

    const x = scaleTime()
      .range([0, width])
      .domain(extent(data, d => d.time));

    const y = scaleLinear()
      .range([height, 0])
      .domain(extent(data, d => d.price));

    const line = d3line()
      .x(d => x(d.time))
      .y(d => y(d.price));

    const area = d3area()
      .x(d => x(d.time))
      .y0(height)
      .y1(d => y(d.price));

    const priceHistoryLine = line(data);
    const priceHistoryArea = area(data);

    return (
      <svg viewBox="0 0 1060 221" preserveAspectRatio="none">
        <g>
          <path className="area" d={priceHistoryArea} />
          <path className="line" d={priceHistoryLine} />
        </g>
      </svg>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
