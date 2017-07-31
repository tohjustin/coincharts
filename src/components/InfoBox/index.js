import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const InfoBox = ({ label, value }) => (
  <div className="infobox">
    <div className="value">
      <span className="small-font">$</span>
      <span className="large-font">2,719</span>
      <span className="small-font">.91</span>
    </div>
    <div className="label">{label}</div>
  </div>
);

InfoBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default InfoBox;
