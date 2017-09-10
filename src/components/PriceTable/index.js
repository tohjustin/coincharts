import React from 'react';
import PropTypes from 'prop-types';
import { scan } from 'd3-array';

import TableCell from './components/TableCell';

import {
  prependPlusSymbol,
  formatCurrency,
} from '../../utils';
import './index.css';

const ACTIVE_CURRENCY = 'usd';
const PriceTable = ({ cryptocurrencyLabel, durationLabel, spotPrice, priceHistory }) => {
  const lastIndex = scan(priceHistory, (a, b) => a.time - b.time);
  const oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price;

  // Compute the price metric values
  const percentageDifference = Number(((spotPrice / oldPrice) - 1) * 100).toFixed(2);
  const priceDifference = spotPrice - oldPrice;

  let formattedPriceDifference = formatCurrency(priceDifference, ACTIVE_CURRENCY);
  formattedPriceDifference = prependPlusSymbol(formattedPriceDifference, priceDifference);

  return (
    <div className="PriceTable">
      <TableCell
        label={`${cryptocurrencyLabel} price`}
        value={formatCurrency(spotPrice, ACTIVE_CURRENCY)}
      />
      <TableCell
        visible={!!durationLabel}
        label={`${durationLabel} (${ACTIVE_CURRENCY})`}
        value={formattedPriceDifference}
      />
      <TableCell
        visible={!!durationLabel}
        label={`${durationLabel} (%)`}
        value={prependPlusSymbol(percentageDifference, priceDifference)}
      />
    </div>
  );
};

PriceTable.propTypes = {
  cryptocurrencyLabel: PropTypes.string.isRequired,
  durationLabel: PropTypes.string.isRequired,
  priceHistory: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.date,
  })).isRequired,
  spotPrice: PropTypes.string.isRequired,
};

export default PriceTable;
