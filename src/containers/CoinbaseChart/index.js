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
    this.fetchPriceMetrics(selectedCryptocurrencyIndex, selectedDurationIndex);
  }

  fetchPriceMetrics(cryptocurrencyIndex, durationIndex) {
    const activeCryptocurrency = CRYPTOCURRENCY_LIST[cryptocurrencyIndex];
    const activeDuration = DURATION_LIST[durationIndex];

    const promises = [
      fetchPriceData(activeCryptocurrency.key, ACTIVE_CURRENCY, activeDuration.key),
      fetchSpotPrices(CRYPTOCURRENCY_LIST, ACTIVE_CURRENCY),
    ];

    Promise.all(promises)
      .then(([priceHistory, spotPrices]) => {
        this.setState({
          cryptocurrencySpotPrices: spotPrices,
          selectedCryptocurrencyPriceHistory: priceHistory.prices,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCryptocurrencyChange = (nextIndex) => {
    this.setState({ selectedCryptocurrencyIndex: nextIndex });
    this.fetchPriceMetrics(nextIndex, this.state.selectedDurationIndex);
  }

  handleDurationChange = (nextIndex) => {
    this.setState({ selectedDurationIndex: nextIndex });
    this.fetchPriceMetrics(this.state.selectedCryptocurrencyIndex, nextIndex);
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
    const formattedCurrentPrice = currencyFormatter.format(currentPrice, { code: ACTIVE_CURRENCY });

    const previousPrice = _.last(selectedCryptocurrencyPriceHistory).price;
    const priceDifference = currentPrice - previousPrice;
    const formattedPriceDifference = appendPlusSignIfPositive(currencyFormatter.format(priceDifference, { code: ACTIVE_CURRENCY }), priceDifference);

    const percentageDifference = _.round((currentPrice / previousPrice - 1) * 100, 2);
    const formattedPercentageDifference = appendPlusSignIfPositive(percentageDifference, priceDifference);

    const priceMetrics = [
      { label: `${activeCryptocurrency.name} price`, value: formattedCurrentPrice },
      { label: `${activeDuration.humanize} (${ACTIVE_CURRENCY})`, value: formattedPriceDifference },
      { label: `${activeDuration.humanize} (%)`, value: `${formattedPercentageDifference}%` },
    ];

    // Display only the cryptocurrency's spot price (i.e. `priceMetrics[0]`)
    // when duration 'ALL' is selected
    return (
      priceMetrics &&
      priceMetrics
        .filter((e, index) => (
          (activeDuration !== DURATION.ALL) ||
          (activeDuration === DURATION.ALL && index === 0)
        ))
        .map(e => (
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
