import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ options, selectedIndex, handleOptionClick }) => (
  <div className="tabs">
    {
      options.map((option, index) => {
        const computedClass = (index === selectedIndex) ? 'tabItem selected' : 'tabItem';
        return (
          <div
            className={computedClass}
            key={option}
            onClick={() => handleOptionClick(index)}
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
  handleOptionClick: PropTypes.func.isRequired,
};

export default Tabs;
