# coincharts

[![CircleCI](https://circleci.com/gh/tohjustin/coincharts/tree/master.svg?style=shield&circle-token=3fd04aa6997f211630fc7d4f45931bef1953a97b)](https://circleci.com/gh/tohjustin/coincharts/tree/master)
[![codecov](https://codecov.io/gh/tohjustin/coincharts/branch/master/graph/badge.svg)](https://codecov.io/gh/tohjustin/coincharts)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftohjustin%2Fcoincharts.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftohjustin%2Fcoincharts?ref=badge_shield)

<p align="center">
  <img src="./docs/screenshot.png">
</p>

A cryptocurrency price chart based off [https://www.coinbase.com/charts](https://www.coinbase.com/charts)

* Bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app)
* Built with [React.js](https://facebook.github.io/react/), [Redux](https://redux.js.org/)\*\*, [Redux-Saga](https://redux-saga.js.org/)\*\*, [styled-components](https://www.styled-components.com/), [D3.js](https://d3js.org/)
* Prices retrieved from [Coinbase API](https://developers.coinbase.com/api/v2)
* Deployed with [Now](https://zeit.co/now)
* Error Logging with [Sentry + Raven.js](https://github.com/getsentry/raven-js)
* Page View tracking with [Google Analytics + react-ga](https://github.com/react-ga/react-ga)

*\*\* [Redux](https://redux.js.org/), [Redux-Saga](https://redux-saga.js.org/) is used for learning purposes (slight overkill for this simple app)*

## Installation

**Prerequisites**: [Node](https://nodejs.org/en/download/) & [npm](https://docs.npmjs.com/getting-started/installing-node) installed on your system.

``` bash
git clone https://github.com/tohjustin/coincharts.git
cd ./coincharts
npm install
```

You might also want to install [Now](https://zeit.co/now) for deployment

``` bash
npm install now-cli -g
```

## Getting Started

**\*\*NOTE\*\*** Make sure you create a `.env` file before proceeding on (see [.env.example](./.env.example) for list of environment variables to populate)

``` bash
# Runs the app in development mode at `localhost:3000`
npm run start

# Create production build in `/build` folder
npm run build

# Deploy app with `now.sh` using configuration defined in `now.json`
npm run script:deploy

# Takes a snapshot of responses from coinbase API & saves them into JSON files in `public/priceData` (for offline development)
npm run script:downloadPriceData
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftohjustin%2Fcoincharts.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftohjustin%2Fcoincharts?ref=badge_large)