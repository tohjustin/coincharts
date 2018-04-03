import React from "react";
import currencyFormatter from "currency-formatter";
import { extent } from "d3-array";

import { PROPTYPES } from "../../constants";

const VerticalAxis = ({ data, textAlign, currency }) => {
  const formatPrice = price => currencyFormatter.format(price, { code: currency, precision: 0 });
  const [minPrice, maxPrice] = extent(data, d => d.price);
  const textAlignClass = textAlign;

  return (
    <div className={`VerticalAxis ${textAlignClass}`}>
      {maxPrice && <div className="tick">{formatPrice(maxPrice)}</div>}
      {minPrice && <div className="tick">{formatPrice(minPrice)}</div>}
    </div>
  );
};

VerticalAxis.propTypes = {
  currency: PROPTYPES.CURRENCY.isRequired,
  data: PROPTYPES.PRICE_DATA.isRequired,
  textAlign: PROPTYPES.TEXT_ALIGNMENT.isRequired
};

export default VerticalAxis;
