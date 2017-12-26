import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Table from "../../components/Table";
import {
  CRYPTOCURRENCY_LIST,
  DEFAULT_PROPS,
  DURATION_LIST,
  PROPTYPES
} from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsSelectors } from "../../store/settings";

const PriceTable = ({
  priceData,
  selectedCryptocurrency,
  selectedDuration,
  spotPrice
}) => {
  const cryptocurrencyLabel = CRYPTOCURRENCY_LIST.filter(
    e => e.key === selectedCryptocurrency
  )[0].name;
  const durationLabel = DURATION_LIST.filter(e => e.key === selectedDuration)[0]
    .humanize;

  return (
    <div className="table">
      <Table
        cryptocurrencyLabel={cryptocurrencyLabel}
        durationLabel={durationLabel}
        priceHistory={priceData}
        spotPrice={spotPrice}
      />
    </div>
  );
};

function mapStateToProps(state) {
  const priceData = PriceSelectors.getSelectedPriceHistory(state);
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(
    state
  );
  const selectedDuration = SettingsSelectors.getSelectedDuration(state);
  const spotPrice = PriceSelectors.getSelectedSpotPrice(state);

  return {
    priceData,
    selectedCryptocurrency,
    selectedDuration,
    spotPrice
  };
}

PriceTable.propTypes = {
  priceData: PROPTYPES.PRICE_DATA,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  selectedDuration: PROPTYPES.DURATION,
  spotPrice: PropTypes.number
};

PriceTable.defaultProps = {
  priceData: DEFAULT_PROPS.PRICE_DATA,
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedDuration: DEFAULT_PROPS.DURATION,
  spotPrice: 0
};

// Use named export for tests
export { PriceTable as UnconnectedPriceTable, mapStateToProps };

export default connect(mapStateToProps)(PriceTable);
