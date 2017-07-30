import React from 'react';
import PropTypes from 'prop-types';

const InfoBox = ({ label, value }) => (
  <div>
    <div>{value}</div>
    <div>{label}</div>
  </div>
);

InfoBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InfoBox;
