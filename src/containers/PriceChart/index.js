import React from "react";
import { connect } from "react-redux";

import Chart from "../../components/Chart";
import { CRYPTOCURRENCY_LIST, DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsSelectors } from "../../store/settings";

const PriceChart = ({
  priceData,
  selectedCryptocurrency,
  selectedDuration
}) => {
  const cryptocurrency = CRYPTOCURRENCY_LIST.filter(
    e => e.key === selectedCryptocurrency
  )[0];

  return (
    <Chart
      data={priceData}
      durationType={selectedDuration}
      color={
        cryptocurrency && {
          fill: cryptocurrency.fillColor,
          stroke: cryptocurrency.strokeColor
        }
      }
    />
  );
};

function mapStateToProps(state) {
  const priceData = PriceSelectors.getSelectedPriceHistory(state);
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(
    state
  );
  const selectedDuration = SettingsSelectors.getSelectedDuration(state);

  return {
    priceData,
    selectedCryptocurrency,
    selectedDuration
  };
}

PriceChart.propTypes = {
  priceData: PROPTYPES.PRICE_DATA,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  selectedDuration: PROPTYPES.DURATION
};

PriceChart.defaultProps = {
  priceData: DEFAULT_PROPS.PRICE_DATA,
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedDuration: DEFAULT_PROPS.DURATION
};

// Use named export for tests
export { PriceChart as UnconnectedPriceChart, mapStateToProps };

export default connect(mapStateToProps)(PriceChart);
