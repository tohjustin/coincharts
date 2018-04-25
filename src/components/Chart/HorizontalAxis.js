import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { extent } from "d3-array";
import { timeFormat } from "d3-time-format";
import styled from "styled-components";

import Flex from "../Flex";
import { DURATION, PROPTYPES } from "../../constants";
import { color, fontSize, fontWeight } from "../../styles/constants";

const StyledHorizontalAxis = styled(Flex).attrs({
  margin: props => (props.hideRightMargin ? "10px 0 0 20px" : "10px 20px 0 20px"),
})`
  margin: ${props => props.margin};
`;

const Tick = styled.div`
  color: ${color.coinchartsGray};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.medium};
`;

class HorizontalAxis extends PureComponent {
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

  static generateTicks(data, tickCount) {
    if (data.length < 2 || tickCount < 2) {
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

  render() {
    const { data, duration, tickCount, hideRightMargin } = this.props;
    const durationTicks = HorizontalAxis.generateTicks(data, tickCount);
    const axisTicks = durationTicks.map(timestamp => ({
      timestamp,
      label: HorizontalAxis.formatTime(timestamp, duration),
    }));

    return (
      <StyledHorizontalAxis data-testid="HorizontalAxis" justify="space-between" hideRightMargin={hideRightMargin}>
        {axisTicks && axisTicks.map(({ timestamp, label }) => <Tick key={timestamp}>{label}</Tick>)}
      </StyledHorizontalAxis>
    );
  }
}

HorizontalAxis.propTypes = {
  data: PROPTYPES.PRICE_DATA.isRequired,
  duration: PROPTYPES.DURATION.isRequired,
  tickCount: PropTypes.number.isRequired,
  hideRightMargin: PropTypes.bool.isRequired,
};

export default HorizontalAxis;
