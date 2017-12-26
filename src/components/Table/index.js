import React from "react";
import PropTypes from "prop-types";
import { scan } from "d3-array";

import { DEFAULT_PROPS, PROPTYPES } from "../../constants";
import TableCell from "./TableCell";

import "./index.css";

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
        label={`${durationLabel} (${DEFAULT_PROPS.CURRENCY})`}
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
  priceHistory: PROPTYPES.PRICE_DATA.isRequired,
  spotPrice: PropTypes.number.isRequired
};

export default PriceTable;
