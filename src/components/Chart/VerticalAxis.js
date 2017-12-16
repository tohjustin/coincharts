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
  const textAlignClass = textAlign === "left" ? "left" : "right";

  return (
    <div className={`VerticalAxis ${textAlignClass}`}>
      <div className="tick">
        {formatAxisPrice(maxPrice, DEFAULT_PROPS.CURRENCY)}
      </div>
      <div className="tick">
        {formatAxisPrice(minPrice, DEFAULT_PROPS.CURRENCY)}
      </div>
    </div>
  );
};

VerticalAxis.propTypes = {
  data: PROPTYPES.PRICE_DATA.isRequired,
  textAlign: PROPTYPES.TEXT_ALIGNMENT.isRequired
};

export default VerticalAxis;
