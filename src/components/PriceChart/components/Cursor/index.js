import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const CURSOR_RADIUS_SIZE = 4;

const Cursor = ({ height, visible, x, y }) => {
  const cursorClass = classNames({
    Cursor: true,
    hidden: !visible,
    show: visible,
  });

  return (
    <g className={cursorClass}>
      <line
        className="line"
        x1={x}
        x2={x}
        y1={0}
        y2={height}
      />
      <circle
        className="circle"
        cx={x}
        cy={y}
        r={CURSOR_RADIUS_SIZE}
      />
    </g>
  );
};

Cursor.propTypes = {
  height: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Cursor;
