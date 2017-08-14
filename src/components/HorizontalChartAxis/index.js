import React from 'react';
import PropTypes from 'prop-types';
import { extent } from 'd3-array';
import { timeFormat } from 'd3-time-format';

import { DURATION } from './../../containers/CoinbaseChart/constants';
import './index.css';

const AXIS_TICK_COUNT = 7;
const DURATION_LIST = Object.values(DURATION);

function formatTime(timestamp, duration) {
  switch (duration) {
    case DURATION.ALL.key:
      return timeFormat('%b %Y')(timestamp); // 'Mmm YYYY'
    case DURATION.YEAR.key:
    case DURATION.MONTH.key:
    case DURATION.WEEK.key:
      return timeFormat('%b %_d')(timestamp); // 'Mmm D'
    case DURATION.DAY.key:
    case DURATION.HOUR.key:
    default:
      return timeFormat('%I:%M %p')(timestamp); // 'HH:MM PM/AM'
  }
}

function generateTimeAxisTicks(data, tickCount) {
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

const renderTimeAxisTick = (string, duration) => (
  <div key={string} className="chartAxis">
    <span>{formatTime(string, duration)}</span>
  </div>
);

const HorizontalChartAxis = ({ data, duration }) => {
  const axisTicks = generateTimeAxisTicks(data, AXIS_TICK_COUNT);

  return (
    <div className="HorizontalChartAxis">
      {axisTicks && axisTicks.map(time => renderTimeAxisTick(time, duration)) }
    </div>
  );
};

HorizontalChartAxis.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  duration: PropTypes.oneOf([...DURATION_LIST.map(e => e.key)]).isRequired,
};

export default HorizontalChartAxis;
