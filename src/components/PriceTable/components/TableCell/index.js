import React from "react";
import PropTypes from "prop-types";

import { formatCurrency } from "../../../../utils";
import "./index.css";

const ACTIVE_CURRENCY = "usd";
const PLUS_CHAR = "+";
const MINUS_CHAR = "\u2212";

const TableCell = ({
  label,
  value,
  isCurrency,
  isPercentage,
  showPlusCharacter,
  visible
}) => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const currencyValue = formatCurrency(absValue, ACTIVE_CURRENCY);
  const percentageValue = Number(absValue).toFixed(2);

  return (
    visible && (
      <div className="TableCell">
        <div className="value">
          {showPlusCharacter && (
            <span className="small-font green">{PLUS_CHAR}</span>
          )}
          {isNegative && <span className="small-font">{MINUS_CHAR}</span>}
          {isCurrency && (
            <span className="small-font">{currencyValue.slice(0, 1)}</span>
          )}
          {isCurrency && (
            <span className="large-font">{currencyValue.slice(1, -3)}</span>
          )}
          {isCurrency && (
            <span className="small-font">{currencyValue.slice(-3)}</span>
          )}
          {isPercentage && (
            <span className="large-font">{percentageValue}</span>
          )}
          {isPercentage && <span className="small-font">%</span>}
        </div>
        <div className="label">{label}</div>
      </div>
    )
  );
};

TableCell.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isCurrency: PropTypes.bool,
  isPercentage: PropTypes.bool,
  showPlusCharacter: PropTypes.bool,
  visible: PropTypes.bool
};

TableCell.defaultProps = {
  isCurrency: false,
  isPercentage: false,
  showPlusCharacter: false,
  visible: true
};

export default TableCell;
