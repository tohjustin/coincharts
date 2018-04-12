import React from "react";
import { render } from "react-testing-library";

import HoverContainer, { VERTICAL_OFFSET } from "../HoverContainer";

const TEST_PROPS = {
  position: "top",
  visible: true,
  x: 0,
  label: "test-label",
};

describe("<HoverContainer />", () => {
  it("renders without crashing", () => {
    const { container } = render(<HoverContainer {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders `prop.label` correctly inside <HoverContainer/>", () => {
    const { container } = render(<HoverContainer {...TEST_PROPS} />);
    expect(container.firstChild.textContent).toEqual(TEST_PROPS.label);
  });

  it("shows component when `props.visible` is true", () => {
    const { container } = render(<HoverContainer {...TEST_PROPS} visible />);
    expect(container.firstChild.style.opacity).toEqual("1");
    expect(container.firstChild).toMatchSnapshot();
  });

  it("hides component when `props.visible` is false", () => {
    const { container } = render(<HoverContainer {...TEST_PROPS} visible={false} />);
    expect(container.firstChild.style.opacity).toEqual("0");
    expect(container.firstChild).toMatchSnapshot();
  });

  it("has `style.top` defined when `prop.position` is `top`", () => {
    const { container } = render(<HoverContainer {...TEST_PROPS} position="top" />);
    expect(container.firstChild.style.top).toEqual(`${VERTICAL_OFFSET}px`);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("has `style.bottom` defined when `prop.position` is `bottom`", () => {
    const { container } = render(<HoverContainer {...TEST_PROPS} position="bottom" />);
    expect(container.firstChild.style.bottom).toEqual(`${VERTICAL_OFFSET}px`);
    expect(container.firstChild).toMatchSnapshot();
  });
});
