import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const PRICE_FORMAT_REGEX = /^(\+?)(\$?)([\d|,]+)(.*)$/;

function formatValue(str) {
  const regex = PRICE_FORMAT_REGEX;
  const [, plusChar, dollarChar, mainValue, superscriptValue] = regex.exec(str);
  return [plusChar, dollarChar, mainValue, superscriptValue];
}

const InfoBox = ({ label, value }) => {
  const [plusChar, dollarChar, mainValue, superscriptValue] = formatValue(value);

  return (
    <div className="infobox">
      <div className="value">
        <span className="small-font plus-char">{plusChar}</span>
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
