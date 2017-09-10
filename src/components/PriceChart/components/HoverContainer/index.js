import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const HOVER_CONTAINER_WIDTH = 200;
const VERTICAL_OFFSET = -12;

const HoverContainer = ({ bottom, top, value, visible, x }) => {
  const containerClass = classNames({
    HoverContainer: true,
    hidden: !visible,
    show: visible,
  });

  const contentClass = classNames({
    content: true,
    invertColor: top,
  });

  return (
    <div
      className={containerClass}
      style={{
        bottom: bottom && VERTICAL_OFFSET,
        left: x - (HOVER_CONTAINER_WIDTH / 2),
        top: top && VERTICAL_OFFSET,
      }}
    >
      <div className={contentClass}>{value}</div>
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
