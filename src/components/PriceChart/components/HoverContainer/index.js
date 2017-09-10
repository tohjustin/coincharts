import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HOVER_CONTAINER_WIDTH = 200;
const VERTICAL_OFFSET = -12;

const HoverContainer = ({ bottom, top, value, visible, x }) => {
  const hoverContainerClass = classNames({
    'Chart-hidden': !visible,
    'Chart-hoverContainer': true,
    'Chart-show': visible,
  });

  const hoverContainerContentClass = classNames({
    content: true,
    top,
    bottom,
  });

  return (
    <div
      className={hoverContainerClass}
      style={{
        bottom: bottom && VERTICAL_OFFSET,
        left: x - (HOVER_CONTAINER_WIDTH / 2),
        top: top && VERTICAL_OFFSET,
      }}
    >
      <div className={hoverContainerContentClass}>{value}</div>
    </div>
  );
};

HoverContainer.propTypes = {
  bottom: PropTypes.bool,
  top: PropTypes.bool,
  value: PropTypes.string,
  visible: PropTypes.bool,
  x: PropTypes.number,
};

HoverContainer.defaultProps = {
  bottom: false,
  top: false,
  value: '',
  visible: false,
  x: 0,
};

export default HoverContainer;
