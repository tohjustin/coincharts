import React from "react";
import { render } from "react-testing-library";

import Cursor from "../Cursor";

const TEST_PROPS = {
  height: 5,
  x: 10,
  y: 15,
  visible: true,
};

describe("<Cursor />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Cursor {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders in correct position based on `props.x`, `props.y` & `props.height`", () => {
    const { container } = render(<Cursor {...TEST_PROPS} />);
    expect(container.querySelector("line").getAttribute("x1")).toEqual(`${TEST_PROPS.x}`);
    expect(container.querySelector("line").getAttribute("x2")).toEqual(`${TEST_PROPS.x}`);
    expect(container.querySelector("line").getAttribute("y1")).toEqual("0");
    expect(container.querySelector("line").getAttribute("y2")).toEqual(`${TEST_PROPS.height}`);
    expect(container.querySelector("circle").getAttribute("cx")).toEqual(`${TEST_PROPS.x}`);
    expect(container.querySelector("circle").getAttribute("cy")).toEqual(`${TEST_PROPS.y}`);
  });

  it("shows component when `props.visible` is true", () => {
    const { container } = render(<Cursor {...TEST_PROPS} visible />);
    expect(container.firstChild.style.opacity).toEqual("1");
    expect(container.firstChild).toMatchSnapshot();
  });

  it("hides component when `props.visible` is false", () => {
    const { container } = render(<Cursor {...TEST_PROPS} visible={false} />);
    expect(container.firstChild.style.opacity).toEqual("0");
    expect(container.firstChild).toMatchSnapshot();
  });
});
