import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { PROPTYPES } from "../../constants";
import { HOVER_CONTAINER_WIDTH, VERTICAL_OFFSET } from "./constants";

const HoverContainer = ({ position, label, visible, x }) => {
  const containerClass = classNames({
    HoverContainer: true,
    hidden: !visible,
    show: visible
  });

  const contentClass = classNames({
    content: true,
    invertColor: position === "top"
  });

  return (
    <div
      className={containerClass}
      style={{
        [position]: VERTICAL_OFFSET,
        left: x - HOVER_CONTAINER_WIDTH / 2
      }}
    >
      <div className={contentClass}>{label}</div>
    </div>
  );
};

HoverContainer.propTypes = {
  position: PROPTYPES.HOVER_CONTAINER_POSITION.isRequired,
  visible: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  label: PropTypes.string
};

HoverContainer.defaultProps = {
  label: ""
};

export default HoverContainer;
