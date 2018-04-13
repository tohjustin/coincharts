/* eslint-disable class-methods-use-this */
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import styled from "styled-components";

import { POLL_FREQUENCY, MOBILE_WIDTH } from "../../constants";
import { border, boxShadow, color, font, fontSize, fontWeight } from "../../styles/constants";
import { PriceActions } from "../../store/price";
import Flex from "../../components/Flex";
import Footer from "../../components/Footer";
import GithubBanner from "../../components/GithubBanner";
import DocumentHead from "../../containers/DocumentHead";
import CryptocurrencyTabs from "../../containers/CryptocurrencyTabs";
import DurationTabs from "../../containers/DurationTabs";
import PriceChart from "../../containers/PriceChart";
import PriceTable from "../../containers/PriceTable";
import PriceTableCompact from "../../containers/PriceTableCompact";

const Dashboard = styled(Flex)`
  background-color: ${color.white};
  width: 100vw;
`;

const DashboardDesktop = styled(Dashboard)`
  background-color: ${color.white};
  border-radius: ${border.borderRadius};
  box-shadow: ${boxShadow.default};
  max-width: 1500px;
  min-width: 960px;
  width: 90vw;
`;

const HeaderText = styled(Flex)`
  color: ${color.coincharts};
  font-size: ${fontSize.large};
  font-weight: ${fontWeight.medium};
`;

const StyledBody = styled.div`
  margin: 0 20px 20px 20px;
`;

const StyledHeader = styled(Flex)`
  border-bottom: 1px solid #dae1e9;
  height: 55px;
  padding: 0 20px;
`;

const StyledMainView = styled(Flex)`
  background-image: linear-gradient(to bottom, ${color.dark}, ${color.slateDark});
  font-family: ${font.fontFamily};
  height: 100vh;
  line-height: 1.4;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;

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
      <Dashboard column>
        <StyledHeader justify="space-between">
          <HeaderText center>Coincharts</HeaderText>
          <DurationTabs />
        </StyledHeader>
        <StyledBody>
          <PriceTableCompact />
          <PriceChart disableCursor hideRightVerticalAxis hideTopBorder horizontalAxisTickCount={4} />
        </StyledBody>
      </Dashboard>
    );
  }

  renderDesktop() {
    return (
      <DashboardDesktop column>
        <StyledHeader justify="space-between">
          <CryptocurrencyTabs />
          <DurationTabs />
        </StyledHeader>
        <StyledBody>
          <PriceTable />
          <PriceChart />
        </StyledBody>
      </DashboardDesktop>
    );
  }

  render() {
    return (
      <StyledMainView center column>
        <DocumentHead />
        <GithubBanner />
        <MediaQuery maxWidth={MOBILE_WIDTH}>
          {matches => (matches ? this.renderMobile() : this.renderDesktop())}
        </MediaQuery>
        <Footer />
      </StyledMainView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestPriceData: () => {
    dispatch(PriceActions.request());
  },
});

MainView.propTypes = {
  requestPriceData: PropTypes.func.isRequired,
};

// Use named export for tests
export { MainView as UnconnectedMainView, mapDispatchToProps };

export default connect(null, mapDispatchToProps)(MainView);
