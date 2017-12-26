import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Tabs from "../../components/Tabs";
import { CRYPTOCURRENCY_LIST, DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsActions, SettingsSelectors } from "../../store/settings";
import { formatCurrency } from "../../utils";

const CryptocurrencyTabs = ({
  handleCryptocurrencyChange,
  selectedCryptocurrency,
  spotPrices
}) => {
  const options = CRYPTOCURRENCY_LIST.reduce((accumulator, { key, name }) => {
    const price = formatCurrency(spotPrices[key], DEFAULT_PROPS.CURRENCY);
    accumulator[key] = {
      listKey: `${name}-${price}`,
      element: (
        <span className="cryptocurrency">
          <span>{name}</span>
          <span>{price}</span>
        </span>
      )
    };
    return accumulator;
  }, {});

  return (
    <Tabs
      options={options}
      onChange={handleCryptocurrencyChange}
      selectedKey={selectedCryptocurrency}
    />
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
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(
    state
  );
  const spotPrices = PriceSelectors.getSpotPrices(state);
  return { selectedCryptocurrency, spotPrices };
}

CryptocurrencyTabs.propTypes = {
  handleCryptocurrencyChange: PropTypes.func.isRequired,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  spotPrices: PROPTYPES.SPOT_PRICES
};

CryptocurrencyTabs.defaultProps = {
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  spotPrices: DEFAULT_PROPS.SPOT_PRICES
};

// Use named export for tests
export {
  CryptocurrencyTabs as UnconnectedCryptocurrencyTabs,
  mapDispatchToProps,
  mapStateToProps
};

export default connect(mapStateToProps, mapDispatchToProps)(CryptocurrencyTabs);
