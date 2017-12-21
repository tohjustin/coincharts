import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { POLL_FREQUENCY } from "../../constants";
import { PriceActions } from "../../store/price";
import CryptocurrencyTabs from "../../containers/CryptocurrencyTabs";
import DurationTabs from "../../containers/DurationTabs";
import PriceChart from "../../containers/PriceChart";
import PriceTable from "../../containers/PriceTable";

import "./index.css";

class MainView extends Component {
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

  fetchPriceData() {
    const { requestPriceData } = this.props;
    requestPriceData();
  }

  render() {
    return (
      <div className="App">
        <div className="dashboard">
          <div className="tabs">
            {<CryptocurrencyTabs />}
            {<DurationTabs />}
          </div>
          {<PriceTable />}
          {<PriceChart />}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestPriceData: () => {
      dispatch(PriceActions.request());
    }
  };
};

MainView.propTypes = {
  requestPriceData: PropTypes.func.isRequired
};

// Use named export for tests
export { MainView as UnconnectedMainView, mapDispatchToProps };

export default connect(null, mapDispatchToProps)(MainView);
