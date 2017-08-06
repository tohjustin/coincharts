import React, { Component } from 'react';
import currencyFormatter from 'currency-formatter';
import _ from 'lodash';

import InfoBox from './../../components/InfoBox';
import Tabs from './../../components/Tabs';

import { CRYPTOCURRENCY, DURATION } from './constants';
import { fetchPriceData, fetchSpotPrices } from './utils';

import './index.css';

const ACTIVE_CURRENCY = 'USD';
const CRYPTOCURRENCY_LIST = _.toArray(CRYPTOCURRENCY);
const DURATION_LIST = _.toArray(DURATION);
const INITIAL_STATE = {
  cryptocurrencySpotPrices: [],
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

    fetchPriceData(activeCryptocurrency.key, ACTIVE_CURRENCY, 'spot')
      .then((data) => {
        const price = currencyFormatter.format(data.amount, { code: ACTIVE_CURRENCY });
        const info = [
          { label: `${activeCryptocurrency.name} price`, value: price },
          { label: `${activeDuration.humanize} (${ACTIVE_CURRENCY})`, value: '+$17.83' },
          { label: `${activeDuration.humanize} (%)`, value: '+0.91%' },
        ];
        this.setState({ info });
      })
      .catch((err) => { console.log(err); });

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
    return (
      this.state.info && this.state.info.map(e => (
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
