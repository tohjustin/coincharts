import React, { Component } from 'react';

import HorizontalChartAxis from '../components/HorizontalChartAxis';
import PriceChart from '../components/PriceChart';
import PriceTable from '../components/PriceTable';
import Tabs from '../components/Tabs';
import VerticalChartAxis from '../components/VerticalChartAxis';

import { CRYPTOCURRENCY, DURATION } from '../constants';
import {
  fetchPriceData,
  fetchSpotPrices,
  formatCurrency,
} from '../utils';

import './App.css';

const ACTIVE_CURRENCY = 'usd';
const CRYPTOCURRENCY_LIST = Object.values(CRYPTOCURRENCY);
const DURATION_LIST = Object.values(DURATION);
const INITIAL_STATE = {
  priceHistory: [],
  spotPrice: { amount: '0', currency: ACTIVE_CURRENCY },
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
      .then(([priceHistoryData, spotPricesData]) => {
        const priceHistory = priceHistoryData.prices
          .sort((a, b) => new Date(a.time) - new Date(b.time))
          .map(d => ({
            price: +d.price,
            time: new Date(d.time),
          }));

        const spotPrices = spotPricesData.map(d => ({
          amount: +d.amount,
          currency: d.currency,
        }));

        this.setState({
          priceHistory,
          spotPrice: spotPrices[cryptocurrencyIndex],
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

  renderPriceTable() {
    const {
      priceHistory,
      selectedCryptocurrencyIndex,
      selectedDurationIndex,
      spotPrice,
    } = this.state;

    return (
      <div className="table-container">
        <PriceTable
          cryptocurrencyLabel={CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex].name}
          durationLabel={DURATION_LIST[selectedDurationIndex].humanize}
          priceHistory={priceHistory}
          spotPrice={+spotPrice.amount}
        />
      </div>
    );
  }

  renderPriceHistoryChart() {
    const { priceHistory, selectedCryptocurrencyIndex, selectedDurationIndex } = this.state;
    const cryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex];
    const durationType = DURATION_LIST[selectedDurationIndex].key;
    return (
      <div className="chart">
        <div className="chart-svg">
          <VerticalChartAxis data={priceHistory} textAlign="left" />
          <PriceChart
            data={priceHistory}
            color={
              cryptocurrency && {
                fill: cryptocurrency.fillColor,
                stroke: cryptocurrency.strokeColor,
              }
            }
          />
          <VerticalChartAxis data={priceHistory} textAlign="right" />
        </div>
        <HorizontalChartAxis data={priceHistory} duration={durationType} />
      </div>
    );
  }

  render() {
    return (
      <div className="app-container">
        <div className="tabs">
          { this.renderCryptocurrencyTabs() }
          { this.renderDurationTabs() }
        </div>
        { this.renderPriceTable() }
        { this.renderPriceHistoryChart() }
      </div>
    );
  }
}

export default App;
