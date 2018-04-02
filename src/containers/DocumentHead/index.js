import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import { DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsSelectors } from "../../store/settings";
import { formatCurrency } from "../../utils";

const DocumentHead = ({ selectedCryptocurrency, selectedCurrency, spotPrice }) => {
  const cryptocurrencySymbol = selectedCryptocurrency.toUpperCase();
  const iconPath = `${process.env.PUBLIC_URL}/icons/icon-${selectedCryptocurrency}.png`;
  const priceText = formatCurrency(spotPrice, selectedCurrency) || "";

  return (
    <Helmet>
      <title>{`${cryptocurrencySymbol}: ${priceText}`}</title>
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
    spotPrice
  };
}

DocumentHead.propTypes = {
  selectedCurrency: PropTypes.string,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  spotPrice: PropTypes.number
};

DocumentHead.defaultProps = {
  selectedCurrency: DEFAULT_PROPS.CURRENCY,
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  spotPrice: 0
};

// Use named export for tests
export { DocumentHead as UnconnectedDocumentHead, mapStateToProps };

export default connect(mapStateToProps)(DocumentHead);
