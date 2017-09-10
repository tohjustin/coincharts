import React, { Component } from 'react';
import { scan } from 'd3-array';

import PriceChart from '../components/PriceChart';
import HorizontalChartAxis from '../components/HorizontalChartAxis';
import InfoBox from '../components/InfoBox';
import Tabs from '../components/Tabs';
import VerticalChartAxis from '../components/VerticalChartAxis';

import { CRYPTOCURRENCY, DURATION } from '../constants';
import {
  prependPlusSymbol,
  fetchPriceData,
  fetchSpotPrices,
  formatCurrency,
} from '../utils';

import './App.css';

const ACTIVE_CURRENCY = 'usd';
const CRYPTOCURRENCY_LIST = Object.values(CRYPTOCURRENCY);
const DURATION_LIST = Object.values(DURATION);
const INITIAL_STATE = {
  activePriceHistory: [],
  activeSpotPrice: 0,
  selectedCryptocurrencyIndex: 0,
  selectedDurationIndex: 2,
  spotPrices: [],
};

class App extends Component {
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
    const cryptocurrency = CRYPTOCURRENCY_LIST[cryptocurrencyIndex];
    const duration = DURATION_LIST[durationIndex];

    const promises = [
      fetchPriceData(cryptocurrency.key, ACTIVE_CURRENCY, duration.key),
      fetchSpotPrices(CRYPTOCURRENCY_LIST, ACTIVE_CURRENCY),
    ];

    Promise.all(promises)
      .then(([priceHistoryData, spotPrices]) => {
        const activePriceHistory = priceHistoryData.prices
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .map(d => ({
            price: +d.price,
            time: new Date(d.time),
          }));

        this.setState({
          activeSpotPrice: spotPrices[cryptocurrencyIndex],
          activePriceHistory,
          spotPrices,
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
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
    const { spotPrices } = this.state;
    const tabOptions = CRYPTOCURRENCY_LIST.map((e, index) => {
      if (spotPrices[index]) {
        const price = spotPrices[index].amount;
        const formattedPrice = formatCurrency(price, ACTIVE_CURRENCY, { prependPlusSymbol: false });
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
      activePriceHistory,
      activeSpotPrice,
      selectedCryptocurrencyIndex,
      selectedDurationIndex,
      spotPrices,
    } = this.state;

    if (activePriceHistory.length === 0) {
      return null;
    }

    const cryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex];
    const duration = DURATION_LIST[selectedDurationIndex];

    const spotPrice = spotPrices[selectedCryptocurrencyIndex].amount;
    const currentPrice = activeSpotPrice.amount;
    const oldPriceIndex = scan(activePriceHistory, (a, b) => a.time - b.time);
    const oldPrice = activePriceHistory[oldPriceIndex].price;

    // Compute the price metric values
    const percentageDifference = Number(((currentPrice / oldPrice) - 1) * 100).toFixed(2);
    const priceDifference = currentPrice - oldPrice;

    const formattedSpotPrice = formatCurrency(spotPrice, ACTIVE_CURRENCY);
    const formattedPercentageDifference = prependPlusSymbol(percentageDifference, priceDifference);
    let formattedPriceDifference = formatCurrency(priceDifference, ACTIVE_CURRENCY);
    formattedPriceDifference = prependPlusSymbol(formattedPriceDifference, priceDifference);

    const priceMetrics = [
      { label: `${cryptocurrency.name} price`, value: formattedSpotPrice },
      { label: `${duration.humanize} (${ACTIVE_CURRENCY})`, value: formattedPriceDifference },
      { label: `${duration.humanize} (%)`, value: `${formattedPercentageDifference}%` },
    ];

    // Display only the cryptocurrency's spot price when duration 'ALL' is selected
    return (
      <div className="infoboxes">
        {
          priceMetrics &&
          priceMetrics
            .filter((e, index) => (
              (duration !== DURATION.ALL) ||
              (duration === DURATION.ALL && index === 0)
            ))
            .map(e => (
              <InfoBox key={e.label} label={e.label} value={e.value} />
            ))
        }
      </div>
    );
  }

  renderPriceHistoryChart() {
    const { activePriceHistory, selectedCryptocurrencyIndex, selectedDurationIndex } = this.state;
    const cryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex];
    const durationType = DURATION_LIST[selectedDurationIndex].key;
    return (
      <div className="chart">
        <div className="chart-svg">
          <VerticalChartAxis data={activePriceHistory} textAlign="left" />
          <PriceChart
            data={activePriceHistory}
            color={
              cryptocurrency && {
                fill: cryptocurrency.fillColor,
                stroke: cryptocurrency.strokeColor,
              }
            }
          />
          <VerticalChartAxis data={activePriceHistory} textAlign="right" />
        </div>
        <HorizontalChartAxis data={activePriceHistory} duration={durationType} />
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        <div className="app-container">
          <div className="tabs">
            { this.renderCryptocurrencyTabs() }
            { this.renderDurationTabs() }
          </div>
          { this.renderInfoBoxes() }
          { this.renderPriceHistoryChart() }
        </div>
      </div>
    );
  }
}

export default App;
