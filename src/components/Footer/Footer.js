import React from "react";
import styled from "styled-components";

import coinbaseLogo from "./assets/coinbase-logo.svg";
import { color, fontFamily, fontSize, fontWeight, size } from "../../styles/constants";

const StyledFooter = styled.div`
  color: ${color.white};
  font-family: ${fontFamily.regular};
  font-size: ${fontSize.medium};
  font-weight: ${fontWeight.medium};
  height: 0;
  line-height: 4em;
  text-align: center;
`;

const Image = styled.img`
  height: ${size.large};
`;

const Footer = props => (
  <StyledFooter {...props}>
    <span>Powered by </span>
    <a href="https://developers.coinbase.com/api/v2" target="_blank" rel="noopener noreferrer">
      <Image src={coinbaseLogo} alt="coinbase-logo" />
    </a>
  </StyledFooter>
);

export default Footer;
