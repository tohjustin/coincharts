import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Tabs = ({ children, keys, onChange, selectedIndex }) => (
  <div className="Tabs" role="tabpanel">
    {
      children.map((child, index) => {
        const isSelectedClass = (index === selectedIndex) && 'selected';
        return (
          <div
            aria-labelledby={keys[index]}
            className={`Tabs-item ${isSelectedClass}`}
            key={keys[index]}
            onClick={() => onChange(index)}
            role="tab"
            tabIndex="-1"
          >
            {child}
          </div>
        );
      })
    }
  </div>
);

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default Tabs;
