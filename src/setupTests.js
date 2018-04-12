/* eslint-disable import/no-extraneous-dependencies, global-require, react/prop-types */
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";

// We have to rename window to `mockWindow` so that `jest.mock` doesn't
// complain.
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

configure({ adapter: new Adapter() });
