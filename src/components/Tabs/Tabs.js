/* eslint-disable react/jsx-no-bind */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Flex from "../Flex";
import { animation, border, color, fontSize, fontWeight } from "../../styles/constants";

const StyledTabs = styled(Flex)`
  font-size: ${fontSize.small};
  font-weight: ${fontWeight.medium};
`;

const StyledTab = styled(Flex).attrs({
  color: props => (props.selected ? color.coincharts : color.coinchartsGray),
  border: props => (props.selected ? `1px solid ${color.coincharts}` : border.border),
})`
  color: ${props => props.color};
  height: inherit;
  margin: 0 0.5em;
  position: relative;
  transition: ${animation.default};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: none;
  }

  &::after {
    border-bottom: ${props => props.border};
    bottom: -1px;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &:hover::after {
    border-bottom-color: ${props => props.color};
  }
`;

const Tabs = ({ options, onChange, selectedKey }) => (
  <StyledTabs role="tabpanel">
    {Object.keys(options).map(key => (
      <StyledTab
        align="center"
        selected={key === selectedKey}
        key={options[key].listKey}
        aria-labelledby={options[key].listKey}
        aria-selected={key === selectedKey}
        onClick={onChange.bind(null, key)}
        role="tab"
        tabIndex="-1"
      >
        {options[key].element}
      </StyledTab>
    ))}
  </StyledTabs>
);

Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({
    key: PropTypes.string,
  }).isRequired,
  selectedKey: PropTypes.string.isRequired,
};

export default Tabs;
