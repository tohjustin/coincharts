import React from "react";
import PropTypes from "prop-types";
import currencyFormatter from "currency-formatter";

import { DEFAULT_PROPS, PROPTYPES } from "./../../constants";
import "./index.css";

const PLUS_CHAR = "+";
const MINUS_CHAR = "\u2212";

const BigAmount = ({ type, showNumberSign, value, currency }) => {
  switch (type) {
    case "currency": {
      const { decimalSeparator, spaceBetweenAmountAndSymbol, symbol, symbolOnLeft } = currencyFormatter.findCurrency(
        currency,
      );
      const formattedValue = currencyFormatter.format(Math.abs(value), { code: currency, symbol: "" });
      const [integerValue, decimalValue] = formattedValue.split(decimalSeparator);
      const optionalSpacing = spaceBetweenAmountAndSymbol ? " " : "";

      return (
        <div className="BigAmount">
          {showNumberSign && value > 0 && <span className="small-font green">{PLUS_CHAR}</span>}
          {showNumberSign && value < 0 && <span className="small-font">{MINUS_CHAR}</span>}
          {symbolOnLeft && (
            <span className="small-font">
              {symbol}
              {optionalSpacing}
            </span>
          )}
          {integerValue && <span className="large-font">{integerValue}</span>}
          {decimalValue && <span className="small-font">{`${decimalSeparator}${decimalValue}`}</span>}
          {!symbolOnLeft && (
            <span className="small-font">
              {optionalSpacing}
              {symbol}
            </span>
          )}
        </div>
      );
    }
    case "percentage": {
      const formattedValue = Math.abs(value).toFixed(2);

      return (
        <div className="BigAmount">
          {showNumberSign && value > 0 && <span className="small-font green">{PLUS_CHAR}</span>}
          {showNumberSign && value < 0 && <span className="small-font">{MINUS_CHAR}</span>}
          <span className="large-font">{formattedValue}</span>
          <span className="small-font">%</span>
        </div>
      );
    }
    default:
      return null;
  }
};

BigAmount.propTypes = {
  type: PROPTYPES.BIG_AMOUNT_TYPE.isRequired,
  value: PropTypes.number.isRequired,
  showNumberSign: PropTypes.bool,
  currency: PropTypes.string,
};

BigAmount.defaultProps = {
  showNumberSign: false,
  currency: DEFAULT_PROPS.CURRENCY,
};

export default BigAmount;
