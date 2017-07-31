import React, { Component } from 'react';

import InfoBox from './components/InfoBox';

const INITIAL_STATE = {
  label: 'bitcoin price',
  value: '$2,719.91',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    const { label, value } = this.state;

    return (
      <div className="App">
        <InfoBox
          label={label}
          value={value}
        />
      </div>
    );
  }
}

export default App;
