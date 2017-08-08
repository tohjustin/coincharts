import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { curveLinear, line as d3line } from 'd3-shape';

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
    const height = 200;
    const width = 800;

    const x = scaleTime()
      .range([0, width])
      .domain(extent(data, d => d.time));

    const y = scaleLinear()
      .range([height, 0])
      .domain(extent(data, d => d.price));

    const line = d3line()
      .x(d => x(d.time))
      .y(d => y(d.price))
      .curve(curveLinear);

    const priceHistoryLine = line(data);

    return (
      <svg>
        <g>
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
