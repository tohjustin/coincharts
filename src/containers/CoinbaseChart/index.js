import React, { Component } from 'react';
import currencyFormatter from 'currency-formatter';

import InfoBox from './../../components/InfoBox';
import Tabs from './../../components/Tabs';

import {
  fetchPriceData,
  humanizeDuration,
} from './utils';

import './index.css';

const CURRENCY = 'USD';
const INITIAL_STATE = {
  currency: [
    'Bitcoin · $2,730.75',
    'Ethereum · $225.19',
    'Litecoin · $42.93',
  ],
  selectedCurrencyIndex: 0,
};

class CoinbaseChart extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillMount() {
    fetchPriceData('btc', 'spot')
      .then((data) => {
        const btcPrice = currencyFormatter.format(data.amount, { code: CURRENCY });
        const info = [
          { label: 'bitcoin price', value: btcPrice },
          { label: `${humanizeDuration('hour')} (${CURRENCY})`, value: '+$17.83' },
          { label: `${humanizeDuration('hour')} (%)`, value: '+0.91%' },
        ];
        this.setState({ info });
      })
      .catch((err) => { console.log(err); });
  }

  handleOptionClick = (nextIndex) => {
    this.setState({
      selectedCurrencyIndex: nextIndex,
    });
  }

  render() {
    return (
      <div className="coinbase-chart">
        <div>
          <Tabs
            options={this.state.currency}
            selectedIndex={this.state.selectedCurrencyIndex}
            handleOptionClick={this.handleOptionClick}
          />
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
