import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Table from "../../components/Table";
import { CRYPTOCURRENCY_LIST, DEFAULT_PROPS, DURATION_LIST, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsSelectors } from "../../store/settings";

const PriceTable = ({
  isLoading,
  percentDifference,
  priceDifference,
  spotPrice,
  selectedCryptocurrency,
  selectedCurrency,
  selectedDuration,
}) => {
  const cryptocurrencyLabel = CRYPTOCURRENCY_LIST.filter(e => e.key === selectedCryptocurrency)[0].name;
  const durationLabel = DURATION_LIST.filter(e => e.key === selectedDuration)[0].humanize;

  return (
    <Table
      cryptocurrencyLabel={cryptocurrencyLabel}
      durationLabel={durationLabel}
      currency={selectedCurrency}
      isLoading={isLoading}
      spotPrice={spotPrice}
      priceDifference={priceDifference}
      percentDifference={percentDifference}
    />
  );
};

function mapStateToProps(state) {
  const isLoading = PriceSelectors.getPriceLoadingStatus(state);
  const percentDifference = PriceSelectors.getSelectedPercentDifference(state);
  const priceDifference = PriceSelectors.getSelectedPriceDifference(state);
  const spotPrice = PriceSelectors.getSelectedSpotPrice(state);
  const selectedCurrency = SettingsSelectors.getSelectedCurrency(state);
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(state);
  const selectedDuration = SettingsSelectors.getSelectedDuration(state);

  return {
    isLoading,
    percentDifference,
    priceDifference,
    spotPrice,
    selectedCryptocurrency,
    selectedCurrency,
    selectedDuration,
  };
}

PriceTable.propTypes = {
  isLoading: PropTypes.bool,
  percentDifference: PropTypes.number,
  priceDifference: PropTypes.number,
  spotPrice: PropTypes.number,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  selectedCurrency: PROPTYPES.CURRENCY,
  selectedDuration: PROPTYPES.DURATION,
};

PriceTable.defaultProps = {
  isLoading: false,
  percentDifference: 0,
  priceDifference: 0,
  spotPrice: 0,
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedCurrency: DEFAULT_PROPS.CURRENCY,
  selectedDuration: DEFAULT_PROPS.DURATION,
};

// Use named export for tests
export { PriceTable as UnconnectedPriceTable, mapStateToProps };

export default connect(mapStateToProps)(PriceTable);
