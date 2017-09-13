import React from 'react';

import logo from './assets/logo.svg';
import './index.css';

const Footer = () => (
  <div className="Footer">
    <span>Powered by </span>
    <a
      href="https://developers.coinbase.com/api/v2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={logo}
        className="logo"
        alt="coinbase"
      />
    </a>
  </div>
);

export default Footer;
