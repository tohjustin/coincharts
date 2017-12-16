import React from "react";
import PropTypes from "prop-types";

import "./index.css";

const Tabs = ({ options, onChange, selectedKey }) => {
  return (
    <div className="Tabs" role="tabpanel">
      {Object.keys(options).map(key => {
        const isSelectedClass = key === selectedKey && "selected";

        return (
          <div
            key={options[key].listKey}
            aria-labelledby={options[key].listKey}
            className={`Tabs-item ${isSelectedClass}`}
            onClick={function() {
              onChange(key);
            }}
            role="tab"
            tabIndex="-1"
          >
            {options[key].element}
          </div>
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  selectedKey: PropTypes.string
};

Tabs.defaultProps = {
  selectedKey: undefined
};

export default Tabs;
