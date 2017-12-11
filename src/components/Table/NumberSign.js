import React from "react";
import PropTypes from "prop-types";

const PLUS_CHAR = "+";
const MINUS_CHAR = "\u2212";

const NumberSign = ({ isPositive }) =>
  isPositive ? <span className="small-font green">{PLUS_CHAR}</span> : <span className="small-font">{MINUS_CHAR}</span>;

NumberSign.propTypes = {
  isPositive: PropTypes.bool.isRequired
};

// Use named export for tests
export { PLUS_CHAR, MINUS_CHAR };

export default NumberSign;
