import React from "react";
import PropTypes from "prop-types";
import currencyFormatter from "currency-formatter";

import { PROPTYPES } from "../../constants";

const DownArrowSvg = () => (
  <svg width="12" height="12"viewBox="8135 12432 15 15" xmlns="http://www.w3.org/2000/svg" direction="down">
    <path fillRule="evenodd" d="M8149.72 12439.36l-7.36-7.36-7.36 7.36 1 1 5.64-5.64v11.82h1.4v-11.87l5.68 5.69z"/>
  </svg>
);

const UpArrowSvg = () => (
  <svg width="12" height="12"viewBox="8135 12432 15 15" xmlns="http://www.w3.org/2000/svg" direction="up">
    <path fillRule="evenodd" d="M8149.72 12439.36l-7.36-7.36-7.36 7.36 1 1 5.64-5.64v11.82h1.4v-11.87l5.68 5.69z"/>
  </svg>
);

const PriceDetails = ({ currency, priceDifference, percentDifference }) => {
  const formattedPriceDifference = currencyFormatter.format(Math.abs(priceDifference), { code: currency });
  const formattedPercentDifference = Math.abs(percentDifference).toFixed(2);

  if (priceDifference > 0) {
    return (
      <div className="PriceDetails positive">
        <UpArrowSvg/>
        {`${formattedPriceDifference} (${formattedPercentDifference}%)`}
      </div>
    );
  }

  return (
    <div className="PriceDetails negative">
      <DownArrowSvg/>
      {`${formattedPriceDifference} (${formattedPercentDifference}%)`}
    </div>
  );
};

PriceDetails.propTypes = {
  currency: PROPTYPES.CURRENCY.isRequired,
  priceDifference: PropTypes.number.isRequired,
  percentDifference: PropTypes.number.isRequired,
};

export default PriceDetails;
