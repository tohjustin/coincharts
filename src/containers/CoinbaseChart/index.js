import React, { Component } from 'react';
import currencyFormatter from 'currency-formatter';
import _ from 'lodash';

import InfoBox from './../../components/InfoBox';
import Tabs from './../../components/Tabs';

import { CRYPTOCURRENCY, DURATION } from './constants';
import { fetchPriceData } from './utils';

import './index.css';

const ACTIVE_CURRENCY = 'USD';
const CRYPTOCURRENCY_LIST = _.toArray(CRYPTOCURRENCY);
const DURATION_LIST = _.toArray(DURATION);
const INITIAL_STATE = {
  selectedCryptocurrencyIndex: 0,
  selectedDurationIndex: 0,
};

class CoinbaseChart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillMount() {
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
  }

  handleCryptocurrencyChange = (nextIndex) => {
    this.setState({ selectedCryptocurrencyIndex: nextIndex });
  }

  handleDurationChange = (nextIndex) => {
    this.setState({ selectedDurationIndex: nextIndex });
  }

  renderDurationTabs() {
    return (
      <Tabs
        options={DURATION_LIST.map(e => e.codename)}
        selectedIndex={this.state.selectedDurationIndex}
        onChange={this.handleDurationChange}
      />
    );
  }

  render() {
    return (
      <div className="coinbase-chart">
        <div>
          <Tabs
            options={CRYPTOCURRENCY_LIST.map(e => e.name)}
            selectedIndex={this.state.selectedCryptocurrencyIndex}
            onChange={this.handleCryptocurrencyChange}
          />
          { this.renderDurationTabs() }
        </div>
        <div>
          {
            this.state.info && this.state.info.map(e => (
              <InfoBox key={e.label} label={e.label} value={e.value} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default CoinbaseChart;
