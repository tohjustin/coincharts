import React from "react";
import PropTypes from "prop-types";
import { scan } from "d3-array";

import TableCell from "./TableCell";

import "./index.css";

const ACTIVE_CURRENCY = "usd";
const PriceTable = ({
  cryptocurrencyLabel,
  durationLabel,
  spotPrice,
  priceHistory
}) => {
  const lastIndex = scan(priceHistory, (a, b) => a.time - b.time);
  const oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price;
  const priceDifference = spotPrice - oldPrice;
  const percentageDifference = (spotPrice / oldPrice - 1) * 100 || 0;

  return (
    <div className="PriceTable">
      <TableCell
        label={`${cryptocurrencyLabel} price`}
        isCurrency
        value={spotPrice}
      />
      <TableCell
        showPlusCharacter={priceDifference > 0}
        isCurrency
        label={`${durationLabel} (${ACTIVE_CURRENCY})`}
        value={priceDifference}
        visible={Boolean(durationLabel)}
      />
      <TableCell
        showPlusCharacter={percentageDifference > 0}
        isPercentage
        label={`${durationLabel} (%)`}
        value={percentageDifference}
        visible={Boolean(durationLabel)}
      />
    </div>
  );
};

PriceTable.propTypes = {
  cryptocurrencyLabel: PropTypes.string.isRequired,
  durationLabel: PropTypes.string.isRequired,
  priceHistory: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      time: PropTypes.date
    })
  ).isRequired,
  spotPrice: PropTypes.number.isRequired
};

export default PriceTable;
