import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Flex from "../Flex";
import { PROPTYPES } from "../../constants";
import { animation, border, color, fontSize, fontWeight } from "../../styles/constants";

const HOVER_CONTAINER_WIDTH = 200;
export const VERTICAL_OFFSET = -12;

const StyledHoverContainer = styled(Flex).attrs({
  style: ({ left, position, visible }) => ({
    bottom: position === "bottom" ? `${VERTICAL_OFFSET}px` : undefined,
    top: position === "top" ? `${VERTICAL_OFFSET}px` : undefined,
    left: `${left - HOVER_CONTAINER_WIDTH / 2}px`,
    opacity: visible ? 1 : 0,
  }),
})`
  position: absolute;
  transition: opacity ${animation.speed};
  width: ${`${HOVER_CONTAINER_WIDTH}px`};
  z-index: 10;
`;

const Label = styled.div.attrs({
  background: props => (props.invertColor ? color.coinchartsGray : color.white),
  border: props => (props.invertColor ? "none" : border.border),
  color: props => (props.invertColor ? color.white : color.coinchartsGray),
})`
  background: ${props => props.background};
  border-radius: ${border.radius};
  border: ${props => props.border};
  color: ${props => props.color};
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.medium}
  padding: 1px 6px;;
`;

const HoverContainer = ({ position, label, visible, x }) => (
  <StyledHoverContainer data-testid="HoverContainer" justify="center" left={x} position={position} visible={visible}>
    <Label invertColor={position === "top"}>{label}</Label>
  </StyledHoverContainer>
);

HoverContainer.propTypes = {
  position: PROPTYPES.HOVER_CONTAINER_POSITION.isRequired,
  visible: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  label: PropTypes.string,
};

HoverContainer.defaultProps = {
  label: "",
};

export default HoverContainer;
