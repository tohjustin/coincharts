/* eslint-disable global-require, react/prop-types */

/*
 * For testing components using React-responsive
 */
const mockWindow = window;

jest.mock("react-responsive", () => {
  const React = require("react");
  const MediaQuery = require.requireActual("react-responsive").default;

  const MockMediaQuery = props => {
    const defaultWidth = mockWindow.innerWidth;
    const defaultHeight = mockWindow.innerHeight;
    const values = Object.assign({}, { width: defaultWidth, height: defaultHeight }, props.values);
    const newProps = Object.assign({}, props, { values });

    return React.createElement(MediaQuery, newProps);
  };

  return MockMediaQuery;
});
