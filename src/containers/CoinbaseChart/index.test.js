import React from 'react';
import ReactDOM from 'react-dom';
import CoinbaseChart from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoinbaseChart />, div);
});
