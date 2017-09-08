import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { extent } from 'd3-array';
import { timeFormat } from 'd3-time-format';

import {
  DEFAULT_TICK_COUNT,
  DURATION,
  DURATION_LIST,
} from './constants';

import './index.css';

class HorizontalChartAxis extends Component {
  static formatTime(timestamp, duration) {
    switch (duration) {
      case DURATION.ALL:
        return timeFormat('%b %Y')(timestamp); // 'Mmm YYYY'
      case DURATION.YEAR:
      case DURATION.MONTH:
      case DURATION.WEEK:
        return timeFormat('%b %_d')(timestamp); // 'Mmm D'
      case DURATION.DAY:
      case DURATION.HOUR:
      default:
        return timeFormat('%I:%M %p')(timestamp); // 'HH:MM PM/AM'
    }
  }

  static generateTimeAxisTicks(data, tickCount) {
    if (data.length < 2) {
      return [];
    }

    const [minTime, maxTime] = extent(data, d => d.time);
    const rangeStep = (maxTime - minTime) / (tickCount - 1);
    const generatedTicks = [];
    for (let i = 0; i < tickCount; i += 1) {
      const time = new Date(minTime).valueOf();
      generatedTicks.push(time + (i * rangeStep));
    }

    return generatedTicks;
  }

  static renderTimeAxisTick(string, duration) {
    return (
      <div key={string} className="tick">
        <span>{HorizontalChartAxis.formatTime(string, duration)}</span>
      </div>
    );
  }

  // Only update when we receive new data
  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    const { data: nextData } = nextProps;

    return !isEqual(data, nextData);
  }

  render() {
    const { data, duration, tickCount } = this.props;
    const axisTicks = HorizontalChartAxis.generateTimeAxisTicks(data, tickCount);

    return (
      <div className="HorizontalChartAxis">
        {axisTicks && axisTicks.map(time => HorizontalChartAxis.renderTimeAxisTick(time, duration))}
      </div>
    );
  }
}

HorizontalChartAxis.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data,
  })).isRequired,
  duration: PropTypes.oneOf(DURATION_LIST).isRequired,
  tickCount: PropTypes.number,
};

HorizontalChartAxis.defaultProps = {
  tickCount: DEFAULT_TICK_COUNT,
};

export default HorizontalChartAxis;
