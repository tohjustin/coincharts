import React from "react";
import { shallow } from "enzyme";

import Cursor from "./Cursor";

describe("<Cursor />", () => {
  it("renders without crashing", () => {
    const props = {
      height: 1,
      x: 1,
      y: 1,
      visible: true,
    };

    const wrapper = shallow(<Cursor {...props} />);
    expect(wrapper.find(".Cursor")).toHaveLength(1);
  });

  it("adds `.show` class when `props.visible` is true", () => {
    const props = {
      height: 1,
      x: 1,
      y: 1,
      visible: true,
    };

    const wrapper = shallow(<Cursor {...props} />);
    expect(wrapper.find(".Cursor .hidden")).toHaveLength(0);
    expect(wrapper.find(".Cursor .show")).toHaveLength(1);
  });

  it("adds `.hidden` class when `props.visible` is false", () => {
    const props = {
      height: 1,
      x: 1,
      y: 1,
      visible: false,
    };

    const wrapper = shallow(<Cursor {...props} />);
    expect(wrapper.find(".Cursor .hidden")).toHaveLength(1);
    expect(wrapper.find(".Cursor .show")).toHaveLength(0);
  });

  it("renders in correct position based on `props.x`, `props.y` & `props.height`", () => {
    const props = {
      height: 5,
      x: 10,
      y: 15,
      visible: true,
    };

    const wrapper = shallow(<Cursor {...props} />);
    expect(wrapper.find("line").props().x1).toEqual(props.x);
    expect(wrapper.find("line").props().x2).toEqual(props.x);
    expect(wrapper.find("line").props().y1).toEqual(0);
    expect(wrapper.find("line").props().y2).toEqual(props.height);
    expect(wrapper.find("circle").props().cx).toEqual(props.x);
    expect(wrapper.find("circle").props().cy).toEqual(props.y);
  });
});
