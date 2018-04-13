import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { animation, color, size } from "../../styles/constants";

const StyledCursor = styled.svg.attrs({
  style: ({ visible }) => ({
    opacity: visible ? 1 : 0,
  }),
})`
  height: 100%;
  width: 100%;
  transition: opacity ${animation.speed};
`;

const Circle = styled.circle`
  r: ${size.small};
  fill: ${color.white};
  stroke: ${color.coinchartsGray};
  stroke-width: 2;
`;

const Line = styled.line`
  stroke: ${color.coinchartsGray};
  stroke-width: 1;
`;

const Cursor = ({ height, visible, x, y }) => (
  <StyledCursor data-testid="Cursor" visible={visible}>
    <Line x1={x} x2={x} y1={0} y2={height} />
    <Circle cx={x} cy={y} />
  </StyledCursor>
);

Cursor.propTypes = {
  height: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Cursor;
