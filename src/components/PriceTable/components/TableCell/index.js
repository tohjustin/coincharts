import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const BIG_MINUS_SIGN = '\u2212';
const MINUS_SIGN = '-';
const PERCENTAGE_FORMAT_REGEX = /^(\+?)(-?)([\d+.?\d{0,2}]+)(%)$/;
const PRICE_FORMAT_REGEX = /^(\+?)(-?\$?)([\d|,]+)(.*)$/;

const useBigMinusChar = (str = '') => str.replace(RegExp(MINUS_SIGN, 'g'), BIG_MINUS_SIGN);

function formatValue(str) {
  const regex = PERCENTAGE_FORMAT_REGEX.test(str) ? PERCENTAGE_FORMAT_REGEX : PRICE_FORMAT_REGEX;
  const [, plusChar, dollarChar, mainValue, superscriptValue] = regex.exec(str) || [];
  return [plusChar, dollarChar, mainValue, superscriptValue];
}

const TableCell = ({ label, value, visible }) => {
  const [plusChar, dollarChar, mainValue, superscriptValue] = formatValue(value);

  return (
    visible &&
    <div className="TableCell">
      <div className="value">
        <span className="small-font plus-char">{plusChar}</span>
        <span className="small-font">{useBigMinusChar(dollarChar)}</span>
        <span className="large-font">{mainValue}</span>
        <span className="small-font">{superscriptValue}</span>
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

TableCell.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};

TableCell.defaultProps = {
  visible: true,
};

export default TableCell;
