import React, { Component } from "react";
import PropTypes from "prop-types";
import Raven from "raven-js";
import styled from "styled-components";

import Flex from "../Flex";
import GithubBanner from "../GithubBanner";
import { color, fontFamily, fontSize, fontWeight } from "../../styles/constants";

const StyledErrorBoundary = styled(Flex)`
  font-family: ${fontFamily.regular};
  color: ${color.white};
  font-size: ${fontSize.huge};
  font-weight: ${fontWeight.medium};
  width: 100vw;
`;

const ERROR_MESSAGE_TEXT = "Uh-oh, Something went wrong...";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    Raven.captureException(error, { extra: info });
  }

  render() {
    return this.state.hasError ? (
      <StyledErrorBoundary center>
        <GithubBanner />
        <div center>{ERROR_MESSAGE_TEXT}</div>
      </StyledErrorBoundary>
    ) : (
      this.props.children
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
