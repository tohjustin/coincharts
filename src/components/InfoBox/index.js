import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const PRICE_FORMAT_REGEX = /^(\D*)([\d|,]+)(.*)$/;

function formatValue(str) {
  const regex = PRICE_FORMAT_REGEX;
  const [, dollarChar, mainValue, superscriptValue] = regex.exec(str);
  return [dollarChar, mainValue, superscriptValue];
}

const InfoBox = ({ label, value }) => {
  const [dollarChar, mainValue, superscriptValue] = formatValue(value);

  return (
    <div className="infobox">
      <div className="value">
        <span className="small-font">{dollarChar}</span>
        <span className="large-font">{mainValue}</span>
        <span className="small-font">{superscriptValue}</span>
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

InfoBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InfoBox;
