import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import currencyFormatter from "currency-formatter";

import { PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsSelectors } from "../../store/settings";

const DocumentHead = ({ selectedCryptocurrency, selectedCurrency, spotPrice }) => {
  const cryptocurrencySymbol = selectedCryptocurrency.toUpperCase();
  const iconPath = `${process.env.PUBLIC_URL}/icons/icon-${selectedCryptocurrency}.png`;
  const priceText = currencyFormatter.format(spotPrice, { code: selectedCurrency }) || "";

  return spotPrice >= 0 ? (
    <Helmet>
      <title>{`${cryptocurrencySymbol}: ${priceText}`}</title>
      <link rel="icon" href={iconPath} />
    </Helmet>
  ) : (
    <Helmet>
      <title>{process.env.REACT_APP_NAME}</title>
      <link rel="icon" href={iconPath} />
    </Helmet>
  );
};

function mapStateToProps(state) {
  const selectedCurrency = SettingsSelectors.getSelectedCurrency(state);
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(state);
  const spotPrice = PriceSelectors.getSelectedSpotPrice(state);

  return {
    selectedCurrency,
    selectedCryptocurrency,
    spotPrice,
  };
}

DocumentHead.propTypes = {
  selectedCurrency: PROPTYPES.CURRENCY.isRequired,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY.isRequired,
  spotPrice: PropTypes.number.isRequired,
};

// Use named export for tests
export { DocumentHead as UnconnectedDocumentHead, mapStateToProps };

export default connect(mapStateToProps)(DocumentHead);
