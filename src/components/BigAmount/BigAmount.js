import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import currencyFormatter from "currency-formatter";

import { color, fontSize, fontWeight } from "../../styles/constants";
import { DEFAULT_PROPS, PROPTYPES } from "../../constants";

export const MINUS_SYMBOL = "\u2212";
export const PLUS_SYMBOL = "+";

const StyledBigAmount = styled.div`
  color: ${color.slateDark};
  font-size: ${fontSize.mega};
  font-weight: ${fontWeight.regular};
`;

const Superscript = styled.span.attrs({
  color: props => props.color || color.slateDark,
})`
  color: ${props => props.color};
  font-size: 30px;
  font-weight: ${fontWeight.medium};
  position: relative;
  top: -13px;
  vertical-align: baseline;
`;

const BigAmount = ({ type, showPlusMinusSymbol, value, currency }) => {
  switch (type) {
    case "currency": {
      const { decimalSeparator, spaceBetweenAmountAndSymbol, symbol, symbolOnLeft } = currencyFormatter.findCurrency(
        currency,
      );
      const formattedValue = currencyFormatter.format(Math.abs(value), {
        code: currency,
        symbol: "",
      });
      const [integerValue, decimalValue] = formattedValue.split(decimalSeparator);
      const optionalSpacing = spaceBetweenAmountAndSymbol ? " " : "";

      return (
        <StyledBigAmount>
          {showPlusMinusSymbol && value > 0 && <Superscript color={color.positive}>{PLUS_SYMBOL}</Superscript>}
          {showPlusMinusSymbol && value < 0 && <Superscript>{MINUS_SYMBOL}</Superscript>}
          {symbolOnLeft && <Superscript>{`${symbol}${optionalSpacing}`}</Superscript>}
          {integerValue && <span>{integerValue}</span>}
          {decimalValue && <Superscript>{`${decimalSeparator}${decimalValue}`}</Superscript>}
          {!symbolOnLeft && <Superscript>{`${optionalSpacing}${symbol}`}</Superscript>}
        </StyledBigAmount>
      );
    }
    case "percentage": {
      const formattedValue = Math.abs(value).toFixed(2);

      return (
        <StyledBigAmount>
          {showPlusMinusSymbol && value > 0 && <Superscript color={color.positive}>{PLUS_SYMBOL}</Superscript>}
          {showPlusMinusSymbol && value < 0 && <Superscript>{MINUS_SYMBOL}</Superscript>}
          <span>{formattedValue}</span>
          <Superscript>%</Superscript>
        </StyledBigAmount>
      );
    }
    default:
      return (
        <StyledBigAmount>
          <span>{value}</span>
        </StyledBigAmount>
      );
  }
};

BigAmount.propTypes = {
  value: PropTypes.number.isRequired,
  type: PROPTYPES.BIG_AMOUNT_TYPE,
  currency: PropTypes.string,
  showPlusMinusSymbol: PropTypes.bool,
};

BigAmount.defaultProps = {
  type: undefined,
  currency: DEFAULT_PROPS.CURRENCY,
  showPlusMinusSymbol: false,
};

export default BigAmount;
