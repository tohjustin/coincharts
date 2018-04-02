import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

import { POLL_FREQUENCY, MOBILE_WIDTH } from "../../constants";
import { PriceActions } from "../../store/price";
import CryptocurrencyTabs from "../../containers/CryptocurrencyTabs";
import DurationTabs from "../../containers/DurationTabs";
import PriceChart from "../../containers/PriceChart";
import PriceTable from "../../containers/PriceTable";
import PriceTableMobile from "../../containers/PriceTableMobile";

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

  renderMobile() {
    return (
      <div className="dashboard mobile">
        <div className="tabs">
          <div className="tabs-header">Price Chart</div>
          {<DurationTabs />}
        </div>
        {<PriceTableMobile />}
        {<PriceChart />}
      </div>
    );
  }

  renderDesktop() {
    return (
      <div className="dashboard desktop">
        <div className="tabs">
          {<CryptocurrencyTabs />}
          {<DurationTabs />}
        </div>
        {<PriceTable />}
        {<PriceChart />}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <MediaQuery maxWidth={MOBILE_WIDTH}>
          {(matches) => matches ? this.renderMobile() : this.renderDesktop()}
        </MediaQuery>
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
