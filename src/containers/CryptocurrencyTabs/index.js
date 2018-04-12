import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import currencyFormatter from "currency-formatter";
import styled from "styled-components";

import { fontSize, fontWeight } from "../../styles/constants";
import { CRYPTOCURRENCY_LIST, DEFAULT_PROPS, PROPTYPES } from "../../constants";
import { PriceSelectors } from "../../store/price";
import { SettingsActions, SettingsSelectors } from "../../store/settings";
import Tabs from "../../components/Tabs";

const StyledCryptocurrencyTabs = styled.span`
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.medium};

  span + span::before {
    content: " · ";
  }
`;

const CryptocurrencyTabs = ({ handleCryptocurrencyChange, selectedCryptocurrency, selectedCurrency, spotPrices }) => {
  const options = CRYPTOCURRENCY_LIST.reduce((accumulator, { key, name }) => {
    const price = currencyFormatter.format(spotPrices[key], { code: selectedCurrency });

    // eslint-disable-next-line no-param-reassign
    accumulator[key] = {
      listKey: `${name}-${price}`,
      element: (
        <StyledCryptocurrencyTabs>
          <span>{name}</span>
          <span>{price}</span>
        </StyledCryptocurrencyTabs>
      ),
    };
    return accumulator;
  }, {});

  return <Tabs options={options} onChange={handleCryptocurrencyChange} selectedKey={selectedCryptocurrency} />;
};

const mapDispatchToProps = dispatch => ({
  handleCryptocurrencyChange: cryptocurrencyKey => {
    dispatch(SettingsActions.selectCryptocurrency(cryptocurrencyKey));
  },
});

function mapStateToProps(state) {
  const selectedCryptocurrency = SettingsSelectors.getSelectedCryptocurrency(state);
  const selectedCurrency = SettingsSelectors.getSelectedCurrency(state);
  const spotPrices = PriceSelectors.getSpotPrices(state);
  return { selectedCryptocurrency, selectedCurrency, spotPrices };
}

CryptocurrencyTabs.propTypes = {
  handleCryptocurrencyChange: PropTypes.func.isRequired,
  selectedCryptocurrency: PROPTYPES.CRYPTOCURRENCY,
  selectedCurrency: PROPTYPES.CURRENCY,
  spotPrices: PROPTYPES.SPOT_PRICES,
};

CryptocurrencyTabs.defaultProps = {
  selectedCryptocurrency: DEFAULT_PROPS.CRYPTOCURRENCY,
  selectedCurrency: DEFAULT_PROPS.CURRENCY,
  spotPrices: DEFAULT_PROPS.SPOT_PRICES,
};

// Use named export for tests
export { CryptocurrencyTabs as UnconnectedCryptocurrencyTabs, mapDispatchToProps, mapStateToProps };

export default connect(mapStateToProps, mapDispatchToProps)(CryptocurrencyTabs);
