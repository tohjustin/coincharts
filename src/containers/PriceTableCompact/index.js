import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import TableCompact from "../../components/TableCompact";
import { CRYPTOCURRENCY_LIST, DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsActions, SettingsSelectors } from "../../store/settings";

const PriceTableCompact = ({
  handleCryptocurrencyChange,
  isLoading,
  percentDifference,
  priceDifference,
  spotPrice,
  selectedCryptocurrency,
  selectedCurrency,
}) => {
  const cryptocurrencies = CRYPTOCURRENCY_LIST.filter(e => e.key);

  return (
    <TableCompact
      currency={selectedCurrency}
      isLoading={isLoading}
      spotPrice={spotPrice}
      priceDifference={priceDifference}
      percentDifference={percentDifference}
      cryptocurrencies={cryptocurrencies}
      selectedCryptocurrency={selectedCryptocurrency}
      onCryptocurrencyChange={handleCryptocurrencyChange}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  handleCryptocurrencyChange: cryptocurrencyKey => {
    dispatch(SettingsActions.selectCryptocurrency(cryptocurrencyKey));
  },
});

function mapStateToProps(state) {
  const isLoading = PriceSelectors.getPriceLoadingStatus(state);
  const percentDifference = PriceSelectors.getSelectedPercentDifference(state);
  const priceDifference = PriceSelectors.getSelectedPriceDifference(state);
  const spotPrice = PriceSelectors.getSelectedSpotPrice(state);
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(state);
  const selectedCurrency = SettingsSelectors.getSelectedCurrency(state);

  return {
    isLoading,
    percentDifference,
    priceDifference,
    spotPrice,
    selectedCryptocurrency,
    selectedCurrency,
  };
}

PriceTableCompact.propTypes = {
  handleCryptocurrencyChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  percentDifference: PropTypes.number,
  priceDifference: PropTypes.number,
  spotPrice: PropTypes.number,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  selectedCurrency: PROPTYPES.CURRENCY,
};

PriceTableCompact.defaultProps = {
  isLoading: false,
  percentDifference: 0,
  priceDifference: 0,
  spotPrice: 0,
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedCurrency: DEFAULT_PROPS.CURRENCY,
};

// Use named export for tests
export { PriceTableCompact as UnconnectedPriceTableCompact, mapStateToProps, mapDispatchToProps };

export default connect(mapStateToProps, mapDispatchToProps)(PriceTableCompact);
