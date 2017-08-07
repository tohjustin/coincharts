import React, { Component } from 'react';
import currencyFormatter from 'currency-formatter';
import _ from 'lodash';

import InfoBox from './../../components/InfoBox';
import Tabs from './../../components/Tabs';

import { CRYPTOCURRENCY, DURATION } from './constants';
import {
  appendPlusSignIfPositive,
  fetchPriceData,
  fetchSpotPrices,
} from './utils';

import './index.css';

const ACTIVE_CURRENCY = 'USD';
const CRYPTOCURRENCY_LIST = _.toArray(CRYPTOCURRENCY);
const DURATION_LIST = _.toArray(DURATION);
const INITIAL_STATE = {
  cryptocurrencySpotPrices: [],
  selectedCryptocurrencyPriceHistory: [],
  info: [],
  selectedCryptocurrencyIndex: 0,
  selectedDurationIndex: 0,
};

class CoinbaseChart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const {
      selectedCryptocurrencyIndex,
      selectedDurationIndex,
    } = this.state;
    const activeCryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex];
    const activeDuration = DURATION_LIST[selectedDurationIndex];

    fetchPriceData(activeCryptocurrency.key, ACTIVE_CURRENCY, activeDuration.key)
      .then((data) => {
        this.setState({ selectedCryptocurrencyPriceHistory: data.prices });
      })
      .catch((err) => {
        console.log(err);
      });

    fetchSpotPrices(CRYPTOCURRENCY_LIST, ACTIVE_CURRENCY)
      .then((spotPrices) => {
        this.setState({ cryptocurrencySpotPrices: spotPrices });
      })
      .catch((err) => {
        console.log('[CoinbaseChart.componentDidMount] Unable to fetchSpotPrices(): ', err);
      });
  }

  handleCryptocurrencyChange = (nextIndex) => {
    this.setState({ selectedCryptocurrencyIndex: nextIndex });
  }

  handleDurationChange = (nextIndex) => {
    this.setState({ selectedDurationIndex: nextIndex });
  }

  renderCryptocurrencyTabs() {
    const { cryptocurrencySpotPrices } = this.state;
    const tabOptions = CRYPTOCURRENCY_LIST.map((e, index) => {
      if (cryptocurrencySpotPrices[index]) {
        const price = cryptocurrencySpotPrices[index].amount;
        const formattedPrice = currencyFormatter.format(price, { code: ACTIVE_CURRENCY });
        return `${e.name} · ${formattedPrice}`;
      }

      return `${e.name}`;
    });

    return (
      <Tabs
        onChange={this.handleCryptocurrencyChange}
        options={tabOptions}
        selectedIndex={this.state.selectedCryptocurrencyIndex}
      />
    );
  }

  renderDurationTabs() {
    return (
      <Tabs
        onChange={this.handleDurationChange}
        options={DURATION_LIST.map(e => e.codename)}
        selectedIndex={this.state.selectedDurationIndex}
      />
    );
  }

  renderInfoBoxes() {
    const {
      cryptocurrencySpotPrices,
      selectedCryptocurrencyIndex,
      selectedCryptocurrencyPriceHistory,
      selectedDurationIndex,
    } = this.state;

    if (cryptocurrencySpotPrices.length === 0 ||
        selectedCryptocurrencyPriceHistory.length === 0) {
      return null;
    }

    const activeCryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex];
    const activeDuration = DURATION_LIST[selectedDurationIndex];
    const currentPrice = cryptocurrencySpotPrices[selectedCryptocurrencyIndex].amount;
    const previousPrice = _.last(selectedCryptocurrencyPriceHistory).price;
    const priceDifference = currentPrice - previousPrice;
    const percentageDifference = _.round((currentPrice / previousPrice - 1) * 100, 2);

    const formattedCurrentPrice = currencyFormatter.format(currentPrice, { code: ACTIVE_CURRENCY });
    const formattedPriceDifference = appendPlusSignIfPositive(currencyFormatter.format(priceDifference, { code: ACTIVE_CURRENCY }), priceDifference);
    const formattedPercentageDifference = appendPlusSignIfPositive(percentageDifference, priceDifference);

    const info = [
      { label: `${activeCryptocurrency.name} price`, value: formattedCurrentPrice },
      { label: `${activeDuration.humanize} (${ACTIVE_CURRENCY})`, value: formattedPriceDifference },
      { label: `${activeDuration.humanize} (%)`, value: `${formattedPercentageDifference}%` },
    ];

    return (
      info && info.map(e => (
        <InfoBox key={e.label} label={e.label} value={e.value} />
      ))
    );
  }

  render() {
    return (
      <div className="coinbase-chart">
        <div>
          { this.renderCryptocurrencyTabs() }
          { this.renderDurationTabs() }
        </div>
        <div>
          { this.renderInfoBoxes() }
        </div>
      </div>
    );
  }
}

export default CoinbaseChart;
