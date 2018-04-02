import React from "react";
import PropTypes from "prop-types";

const PLUS_CHAR = "+";
const MINUS_CHAR = "\u2212";

const NumberSign = ({ value }) => {
  switch (true) {
    case value > 0:
      return <span className="small-font green">{PLUS_CHAR}</span>;
    case value < 0:
      return <span className="small-font">{MINUS_CHAR}</span>;
    default:
      return null;
  }
};

NumberSign.propTypes = {
  value: PropTypes.number.isRequired
};

// Use named export for tests
export { PLUS_CHAR, MINUS_CHAR };

export default NumberSign;
