import PropTypes from "prop-types";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import Footer from "../components/Footer";
import PriceChart from "../components/PriceChart";
import PriceTable from "../components/PriceTable";
import Tabs from "../components/Tabs";

import { CRYPTOCURRENCY, DURATION, POLL_FREQUENCY } from "../constants";
import { PriceSelectors, PriceActions } from "../store/price";
import { formatCurrency } from "../utils";

import "./App.css";

// `Object.values` polyfill for IE (since it's not supported by CRA)
const CRYPTOCURRENCY_LIST = Object.keys(CRYPTOCURRENCY).map(
  e => CRYPTOCURRENCY[e]
);
const DURATION_LIST = Object.keys(DURATION).map(e => DURATION[e]);

const ACTIVE_CURRENCY = "usd";
const INITIAL_STATE = {
  priceHistory: [],
  spotPrice: { amount: "0", currency: ACTIVE_CURRENCY },
  selectedCryptocurrencyIndex: 0,
  selectedDurationIndex: 2
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    // Bind event-handlers
    this.handleCryptocurrencyChange = this.handleCryptocurrencyChange.bind(
      this
    );
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }

  componentDidMount() {
    this.fetchPriceData();
    this.startPriceDataPolling();
  }

  componentWillUnmount() {
    this.clearPriceDataPolling();
  }

  startPriceDataPolling() {
    this.pollingId = setInterval(() => {
      this.fetchPriceData();
    }, POLL_FREQUENCY);
  }

  clearPriceDataPolling() {
    clearInterval(this.pollingId);
  }

  componentWillReceiveProps(nextProps) {
    const {
      duration: nextDuration,
      cryptocurrency: nextCryptocurrency
    } = nextProps;
    const { duration, cryptocurrency } = this.props;

    if (nextDuration !== duration || nextCryptocurrency !== cryptocurrency) {
      this.fetchPriceData(nextCryptocurrency, nextDuration);
    }
  }

  fetchPriceData(cryptocurrency, duration) {
    const {
      fetchPriceData,
      cryptocurrency: propsCryptocurrency,
      duration: propsDuration
    } = this.props;

    // Use prop's value if `cryptocurrency` or `duration` is undefined
    fetchPriceData(
      cryptocurrency || propsCryptocurrency,
      duration || propsDuration
    );
  }

  handleCryptocurrencyChange(nextIndex) {
    this.setState({ selectedCryptocurrencyIndex: nextIndex }, () => {
      this.fetchPriceData();
    });
  }

  handleDurationChange(nextIndex) {
    this.setState({ selectedDurationIndex: nextIndex }, () => {
      this.fetchPriceData();
    });
  }

  renderHelmet() {
    const { spotPrices } = this.props;
    const { selectedCryptocurrencyIndex } = this.state;
    const cryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex].key;
    const price = spotPrices[selectedCryptocurrencyIndex] || "";
    const priceText = formatCurrency(price.amount, ACTIVE_CURRENCY) || "";

    return (
      <Helmet>
        <title>{`${cryptocurrency.toUpperCase()}: ${priceText}`}</title>
        <link
          rel="icon"
          href={`${process.env.PUBLIC_URL}/icons/icon-${cryptocurrency}.png`}
        />
      </Helmet>
    );
  }

  renderCryptocurrencyTabs() {
    const { spotPrices } = this.props;
    const keys = [];
    const tabOptions = [];
    CRYPTOCURRENCY_LIST.forEach(({ name }, index) => {
      let key;
      let tabOption;
      if (spotPrices[index]) {
        const price = formatCurrency(spotPrices[index].amount, ACTIVE_CURRENCY);
        key = `${name} ${price}`;
        tabOption = (
          <span key={key} className="cryptocurrency">
            <span>{name}</span>
            <span>{price}</span>
          </span>
        );
      } else {
        key = name;
        tabOption = (
          <span key={name} className="cryptocurrency">
            {name}
          </span>
        );
      }

      keys.push(key);
      tabOptions.push(tabOption);
    });

    return (
      <Tabs
        keys={keys}
        onChange={this.handleCryptocurrencyChange}
        selectedIndex={this.state.selectedCryptocurrencyIndex}
      >
        {tabOptions}
      </Tabs>
    );
  }

  renderDurationTabs() {
    const tabOptions = DURATION_LIST.map(({ codename }) => (
      <span key={codename}>{codename}</span>
    ));

    return (
      <Tabs
        keys={DURATION_LIST.map(({ codename }) => codename)}
        onChange={this.handleDurationChange}
        selectedIndex={this.state.selectedDurationIndex}
      >
        {tabOptions}
      </Tabs>
    );
  }

  renderPriceTable() {
    const { selectedCryptocurrencyIndex, selectedDurationIndex } = this.state;
    const { spotPrices, priceHistory } = this.props;
    const spotPrice = spotPrices[selectedCryptocurrencyIndex];

    return (
      <div className="table">
        <PriceTable
          cryptocurrencyLabel={
            CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex].name
          }
          durationLabel={DURATION_LIST[selectedDurationIndex].humanize}
          priceHistory={priceHistory}
          spotPrice={(spotPrice && Number(spotPrice.amount)) || 0}
        />
      </div>
    );
  }

  renderPriceHistoryChart() {
    const { selectedCryptocurrencyIndex, selectedDurationIndex } = this.state;
    const { priceHistory } = this.props;

    const cryptocurrency = CRYPTOCURRENCY_LIST[selectedCryptocurrencyIndex];
    const durationType = DURATION_LIST[selectedDurationIndex].key;

    return (
      <PriceChart
        data={priceHistory}
        durationType={durationType}
        color={
          cryptocurrency && {
            fill: cryptocurrency.fillColor,
            stroke: cryptocurrency.strokeColor
          }
        }
      />
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderHelmet()}
        <div className="dashboard">
          <div className="tabs">
            {this.renderCryptocurrencyTabs()}
            {this.renderDurationTabs()}
          </div>
          {this.renderPriceTable()}
          {this.renderPriceHistoryChart()}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPriceData: (cryptocurrency, duration) => {
      dispatch(PriceActions.price.request(cryptocurrency, duration));
    }
  };
};

function mapStateToProps(state, ownProps) {
  const { location } = ownProps;
  const cryptocurrency = location.query.cryptocurrency;
  const duration = location.query.duration;
  const priceHistory = PriceSelectors.getPriceHistory(state);
  const spotPrices = PriceSelectors.getPriceSpot(state);

  return {
    cryptocurrency,
    duration,
    priceHistory,
    spotPrices
  };
}

App.propTypes = {
  priceHistory: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      time: PropTypes.instanceOf(Date).isRequired
    }).isRequired
  ),
  spotPrices: PropTypes.array,
  fetchPriceData: PropTypes.func,
  cryptocurrency: PropTypes.oneOf(["btc", "eth", "ltc"]),
  duration: PropTypes.oneOf(["day", "week", "month", "year", "all"])
};

App.defaultProps = {
  priceHistory: [],
  spotPrices: [],
  fetchPriceData: undefined,
  cryptocurrency: "btc",
  duration: "day"
};

// Use named export for tests
export { App as UnconnectedApp, mapDispatchToProps, mapStateToProps };

export default connect(mapStateToProps, mapDispatchToProps)(App);
