import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import { extent } from 'd3-array';

import './index.css';

const ACTIVE_CURRENCY = 'USD';

function formatAxisPrice(price, currencyCode) {
  return currencyFormatter.format(price, { code: currencyCode, precision: 0 });
}

const VerticalChartAxis = ({ data }) => {
  const [minPrice, maxPrice] = extent(data, d => d.price);

  return (
    <div className="chartVerticalAxisContainer containerFlex">
      <div className="chartAxis">{formatAxisPrice(maxPrice, ACTIVE_CURRENCY)}</div>
      <div className="chartAxis">{formatAxisPrice(minPrice, ACTIVE_CURRENCY)}</div>
    </div>
  );
};

VerticalChartAxis.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VerticalChartAxis;
