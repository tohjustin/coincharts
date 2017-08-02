import React, { Component } from 'react';

import InfoBox from './components/InfoBox';
import Tabs from './components/Tabs';

import './App.css';

const INITIAL_STATE = {
  info: [
    { label: 'bitcoin price', value: '$2,857.01' },
    { label: 'SINCE AN HOUR AGO (USD)', value: '+$17.83' },
    { label: 'SINCE AN HOUR AGO (%)', value: '+0.91%' },
  ],
  currency: [
    'Bitcoin · $2,730.75',
    'Ethereum · $225.19',
    'Litecoin · $42.93',
  ],
  selectedCurrencyIndex: 0,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleOptionClick = (nextIndex) => {
    this.setState({
      selectedCurrencyIndex: nextIndex,
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <Tabs
            options={this.state.currency}
            selectedIndex={this.state.selectedCurrencyIndex}
            handleOptionClick={this.handleOptionClick}
          />
        </div>
        <div>
          {
            this.state.info.map(e => (
              <InfoBox key={e.label} label={e.label} value={e.value} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
