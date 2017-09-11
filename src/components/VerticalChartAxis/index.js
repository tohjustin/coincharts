import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import { extent } from 'd3-array';

import './index.css';

const ACTIVE_CURRENCY = 'usd';

function formatAxisPrice(price, currencyCode) {
  return currencyFormatter.format(price, {
    code: currencyCode.toUpperCase(),
    precision: 0,
  });
}

const VerticalChartAxis = ({ data, textAlign }) => {
  const [minPrice, maxPrice] = extent(data, d => d.price);
  const textAlignClass = (textAlign === 'left') ? 'left' : 'right';

  return (
    <div className={`VerticalChartAxis ${textAlignClass}`}>
      <div className="tick">{formatAxisPrice(maxPrice, ACTIVE_CURRENCY)}</div>
      <div className="tick">{formatAxisPrice(minPrice, ACTIVE_CURRENCY)}</div>
    </div>
  );
};

VerticalChartAxis.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data,
  })).isRequired,
  textAlign: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default VerticalChartAxis;
