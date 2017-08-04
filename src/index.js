import React from 'react';
import ReactDOM from 'react-dom';
import CoinbaseChart from './containers/CoinbaseChart';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

// eslint-disable-next-line no-undef
ReactDOM.render(<CoinbaseChart />, document.getElementById('root'));
registerServiceWorker();
