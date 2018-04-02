import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import TableMobile from "../../components/TableMobile";
import { CRYPTOCURRENCY_LIST, DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsActions, SettingsSelectors } from "../../store/settings";

const PriceTableMobile = ({
  handleCryptocurrencyChange,
  percentDifference,
  priceDifference,
  spotPrice,
  selectedCryptocurrency,
  selectedCurrency
}) => {
  const cryptocurrencies = CRYPTOCURRENCY_LIST.filter(e => e.key);

  return (
    <div className="table">
      <TableMobile
        currency={selectedCurrency}
        spotPrice={spotPrice}
        priceDifference={priceDifference}
        percentDifference={percentDifference}
        cryptocurrencies={cryptocurrencies}
        selectedCryptocurrency={selectedCryptocurrency}
        onCryptocurrencyChange={handleCryptocurrencyChange}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleCryptocurrencyChange: cryptocurrencyKey => {
      dispatch(SettingsActions.selectCryptocurrency(cryptocurrencyKey));
    }
  };
};

function mapStateToProps(state) {
  const percentDifference = PriceSelectors.getSelectedPercentDifference(state);
  const priceDifference = PriceSelectors.getSelectedPriceDifference(state);
  const spotPrice = PriceSelectors.getSelectedSpotPrice(state);
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(state);
  const selectedCurrency = SettingsSelectors.getSelectedCurrency(state);

  return {
    percentDifference,
    priceDifference,
    spotPrice,
    selectedCryptocurrency,
    selectedCurrency
  };
}

PriceTableMobile.propTypes = {
  handleCryptocurrencyChange: PropTypes.func.isRequired,
  percentDifference: PropTypes.number,
  priceDifference: PropTypes.number,
  spotPrice: PropTypes.number,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  selectedCurrency: PROPTYPES.CURRENCY
};

PriceTableMobile.defaultProps = {
  percentDifference: 0,
  priceDifference: 0,
  spotPrice: 0,
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedCurrency: DEFAULT_PROPS.CURRENCY
};

// Use named export for tests
export { PriceTableMobile as UnconnectedPriceTableMobile, mapStateToProps, mapDispatchToProps };

export default connect(mapStateToProps, mapDispatchToProps)(PriceTableMobile);
