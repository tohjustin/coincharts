import React from "react";
import PropTypes from "prop-types";

import BigAmount from "../BigAmount";
import "./index.css";

const Table = ({ cryptocurrencyLabel, durationLabel, percentDifference, priceDifference, spotPrice, currency }) => {
  const showOtherCells = Boolean(durationLabel);

  return (
    <div className="Table">
      <div className="TableCell">
        <div className="value">
          <BigAmount type="currency" currency={currency} value={spotPrice} />
        </div>
        <div className="label">{cryptocurrencyLabel} price</div>
      </div>
      {showOtherCells && (
        <div className="TableCell">
          <div className="value">
            <BigAmount showNumberSign type="currency" currency={currency} value={priceDifference} />
          </div>
          <div className="label">
            {durationLabel} ({currency})
          </div>
        </div>
      )}
      {showOtherCells && (
        <div className="TableCell">
          <div className="value">
            <BigAmount showNumberSign type="percentage" value={percentDifference} />
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
  percentDifference: PropTypes.number.isRequired,
  priceDifference: PropTypes.number.isRequired,
  spotPrice: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired
};

export default Table;
