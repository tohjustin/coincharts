import React from "react";
import currencyFormatter from "currency-formatter";
import { extent } from "d3-array";

import { DEFAULT_PROPS, PROPTYPES } from "../../constants";

function formatAxisPrice(price, currencyCode) {
  return currencyFormatter.format(price, {
    code: currencyCode.toUpperCase(),
    precision: 0
  });
}

const VerticalAxis = ({ data, textAlign }) => {
  const [minPrice, maxPrice] = extent(data, d => d.price);
  const textAlignClass = textAlign;

  return (
    <div className={`VerticalAxis ${textAlignClass}`}>
      {maxPrice && <div className="tick">{formatAxisPrice(maxPrice, DEFAULT_PROPS.CURRENCY)}</div>}
      {minPrice && <div className="tick">{formatAxisPrice(minPrice, DEFAULT_PROPS.CURRENCY)}</div>}
    </div>
  );
};

VerticalAxis.propTypes = {
  data: PROPTYPES.PRICE_DATA.isRequired,
  textAlign: PROPTYPES.TEXT_ALIGNMENT.isRequired
};

// Use named export for tests
export { formatAxisPrice };

export default VerticalAxis;
