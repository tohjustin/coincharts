import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Tabs from "../../components/Tabs";
import { DEFAULT_PROPS, DURATION_LIST, PROPTYPES } from "../../constants";
import { SettingsActions, SettingsSelectors } from "../../store/settings";

const DurationTabs = ({ handleDurationChange, selectedDuration }) => {
  const options = DURATION_LIST.reduce((accumulator, { key, codename }) => {
    // eslint-disable-next-line no-param-reassign
    accumulator[key] = {
      listKey: codename,
      element: <span>{codename}</span>,
    };
    return accumulator;
  }, {});

  return <Tabs options={options} onChange={handleDurationChange} selectedKey={selectedDuration} />;
};

const mapDispatchToProps = dispatch => ({
  handleDurationChange: durationKey => {
    dispatch(SettingsActions.selectDuration(durationKey));
  },
});

function mapStateToProps(state) {
  const selectedDuration = SettingsSelectors.getSelectedDuration(state);
  return { selectedDuration };
}

DurationTabs.propTypes = {
  selectedDuration: PROPTYPES.DURATION,
  handleDurationChange: PropTypes.func.isRequired,
};

DurationTabs.defaultProps = {
  selectedDuration: DEFAULT_PROPS.DURATION,
};

// Use named export for tests
export { DurationTabs as UnconnectedDurationTabs, mapDispatchToProps, mapStateToProps };

export default connect(mapStateToProps, mapDispatchToProps)(DurationTabs);
