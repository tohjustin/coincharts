import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CURSOR_RADIUS_SIZE = 4;

const Cursor = ({ height, visible, x, y }) => (
  <g className={classNames({ 'Chart-show': visible, 'Chart-hidden': !visible })}>
    <line className="Chart-cursorLine" x1={x} x2={x} y1={0} y2={height} />
    <circle className="Chart-activePoint" cx={x} cy={y} r={CURSOR_RADIUS_SIZE} />
  </g>
);

Cursor.propTypes = {
  height: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Cursor;
