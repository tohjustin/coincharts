import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Tabs = ({ options, selectedIndex, onChange }) => (
  <div className="tabs">
    {
      options.map((option, index) => {
        const computedClass = (index === selectedIndex) ? 'tabItem selected' : 'tabItem';
        return (
          <div
            className={computedClass}
            key={option}
            onClick={() => onChange(index)}
          >
            <div>{option}</div>
          </div>
        );
      })
    }
  </div>
);

Tabs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tabs;
