import React, { Component } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import { extent } from "d3-array";
import { timeFormat } from "d3-time-format";

import { DURATION, PROPTYPES } from "../../constants";
import { DEFAULT_TICK_COUNT } from "./constants";

class HorizontalChartAxis extends Component {
  static formatTime(timestamp, duration) {
    switch (duration) {
      case DURATION.ALL.key:
        return timeFormat("%b %Y")(timestamp); // 'Mmm YYYY'
      case DURATION.YEAR.key:
      case DURATION.MONTH.key:
      case DURATION.WEEK.key:
        return timeFormat("%b %_d")(timestamp); // 'Mmm D'
      case DURATION.DAY.key:
      case DURATION.HOUR.key:
      default:
        return timeFormat("%I:%M %p")(timestamp); // 'HH:MM PM/AM'
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
      generatedTicks.push(time + i * rangeStep);
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

    // Don't update if next set of data is not ready
    if (nextData === undefined || nextData.length === 0) {
      return false;
    }

    return !isEqual(data, nextData);
  }

  render() {
    const { data, duration, tickCount } = this.props;
    const axisTicks = HorizontalChartAxis.generateTimeAxisTicks(
      data,
      tickCount
    );

    return (
      <div className="HorizontalChartAxis">
        {axisTicks &&
          axisTicks.map(time =>
            HorizontalChartAxis.renderTimeAxisTick(time, duration)
          )}
      </div>
    );
  }
}

HorizontalChartAxis.propTypes = {
  data: PROPTYPES.PRICE_DATA.isRequired,
  duration: PROPTYPES.DURATION.isRequired,
  tickCount: PropTypes.number
};

HorizontalChartAxis.defaultProps = {
  tickCount: DEFAULT_TICK_COUNT
};

export default HorizontalChartAxis;
