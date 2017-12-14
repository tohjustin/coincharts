import React from "react";
import PropTypes from "prop-types";
import { scan } from "d3-array";

import { DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { formatCurrency } from "../../utils";
import NumberSign from "./NumberSign";

import "./index.css";

const Table = ({ cryptocurrencyLabel, durationLabel, spotPrice, priceHistory }) => {
  const lastIndex = scan(priceHistory, (a, b) => a.time - b.time);
  const oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price;
  const priceDifference = spotPrice - oldPrice;
  const percentageDifference = (spotPrice / oldPrice - 1) * 100 || 0;

  const priceDifferenceFormatted = formatCurrency(Math.abs(priceDifference), DEFAULT_PROPS.CURRENCY);
  const spotPriceFormatted = formatCurrency(Math.abs(spotPrice), DEFAULT_PROPS.CURRENCY);
  const percentageFormatted = Number(Math.abs(percentageDifference)).toFixed(2);
  const showOtherCells = Boolean(durationLabel);

  return (
    <div className="Table">
      <div className="TableCell">
        <div className="value">
          <span className="small-font">{spotPriceFormatted.slice(0, 1)}</span>
          <span className="large-font">{spotPriceFormatted.slice(1, -3)}</span>
          <span className="small-font">{spotPriceFormatted.slice(-3)}</span>
        </div>
        <div className="label">{cryptocurrencyLabel} price</div>
      </div>
      {showOtherCells && (
        <div className="TableCell">
          <div className="value">
            <NumberSign isPositive={percentageDifference > 0} />
            <span className="small-font">{priceDifferenceFormatted.slice(0, 1)}</span>
            <span className="large-font">{priceDifferenceFormatted.slice(1, -3)}</span>
            <span className="small-font">{priceDifferenceFormatted.slice(-3)}</span>
          </div>
          <div className="label">
            {durationLabel} (${DEFAULT_PROPS.CURRENCY})
          </div>
        </div>
      )}
      {showOtherCells && (
        <div className="TableCell">
          <div className="value">
            <NumberSign isPositive={percentageDifference > 0} />
            <span className="large-font">{percentageFormatted}</span>
            <span className="small-font">%</span>
          </div>
          <div className="label">{durationLabel} (%)</div>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  cryptocurrencyLabel: PropTypes.string.isRequired,
  durationLabel: PropTypes.string.isRequired,
  priceHistory: PROPTYPES.PRICE_DATA.isRequired,
  spotPrice: PropTypes.number.isRequired
};

export default Table;
