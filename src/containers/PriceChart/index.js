import React from "react";
import { connect } from "react-redux";

import Chart from "../../components/Chart";
import { CRYPTOCURRENCY_LIST, DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsSelectors } from "../../store/settings";

const PriceChart = ({ isLoading, priceData, selectedCryptocurrency, selectedCurrency, selectedDuration, ...props }) => {
  const cryptocurrency = CRYPTOCURRENCY_LIST.filter(e => e.key === selectedCryptocurrency)[0];

  return (
    <Chart
      currency={selectedCurrency}
      color={
        cryptocurrency && {
          fill: cryptocurrency.fillColor,
          stroke: cryptocurrency.strokeColor,
        }
      }
      data={priceData}
      durationType={selectedDuration}
      isLoading={isLoading}
      {...props}
    />
  );
};

function mapStateToProps(state) {
  const isLoading = PriceSelectors.getPriceLoadingStatus(state);
  const priceData = PriceSelectors.getSelectedPriceHistory(state);
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(state);
  const selectedCurrency = SettingsSelectors.getSelectedCurrency(state);
  const selectedDuration = SettingsSelectors.getSelectedDuration(state);

  return {
    isLoading,
    priceData,
    selectedCryptocurrency,
    selectedCurrency,
    selectedDuration,
  };
}

PriceChart.propTypes = {
  isLoading: PROPTYPES.PRICE_STATUS.loading,
  priceData: PROPTYPES.PRICE_DATA,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  selectedCurrency: PROPTYPES.CURRENCY,
  selectedDuration: PROPTYPES.DURATION,
};

PriceChart.defaultProps = {
  isLoading: DEFAULT_PROPS.PRICE_STATUS.loading,
  priceData: DEFAULT_PROPS.PRICE_DATA,
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedCurrency: DEFAULT_PROPS.CURRENCY,
  selectedDuration: DEFAULT_PROPS.DURATION,
};

// Use named export for tests
export { PriceChart as UnconnectedPriceChart, mapStateToProps };

export default connect(mapStateToProps)(PriceChart);
