import React from "react";
import currencyFormatter from "currency-formatter";
import { extent } from "d3-array";

import { PROPTYPES } from "../../constants";

const VerticalAxis = ({ data, textAlign, currency }) => {
  const [minPrice, maxPrice] = extent(data, d => d.price)
    .map(price => currencyFormatter.format(price, { code: currency, precision: 0 }));
  const textAlignClass = textAlign;

  return (
    <div className={`VerticalAxis ${textAlignClass}`}>
      {maxPrice && <div className="tick">{maxPrice}</div>}
      {minPrice && <div className="tick">{minPrice}</div>}
    </div>
  );
};

VerticalAxis.propTypes = {
  currency: PROPTYPES.CURRENCY.isRequired,
  data: PROPTYPES.PRICE_DATA.isRequired,
  textAlign: PROPTYPES.TEXT_ALIGNMENT.isRequired
};

export default VerticalAxis;
