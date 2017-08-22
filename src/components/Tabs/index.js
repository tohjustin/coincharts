import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Tabs = ({ onChange, options, selectedIndex }) => (
  <div className="tabs" role="tabpanel">
    {
      options.map((option, index) => {
        const isSelectedClass = (index === selectedIndex) && 'selected';
        return (
          <div
            aria-labelledby={option}
            className={`tabItem ${isSelectedClass}`}
            key={option}
            onClick={() => onChange(index)}
            role="tab"
            tabIndex="-1"
          >
            <div>{option}</div>
          </div>
        );
      })
    }
  </div>
);

Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default Tabs;
