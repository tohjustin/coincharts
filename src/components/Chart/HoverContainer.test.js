import React from "react";
import { shallow } from "enzyme";

import HoverContainer from "./HoverContainer";

describe("<HoverContainer />", () => {
  it("renders without crashing", () => {
    const props = {
      position: "top",
      visible: true,
      x: 0,
      value: "PropTypes.string",
    };

    const wrapper = shallow(<HoverContainer {...props} />);
    expect(wrapper.find(".HoverContainer")).toHaveLength(1);
  });

  it("renders `prop.label` correctly inside <HoverContainer/>", () => {
    const props = {
      position: "top",
      visible: true,
      x: 0,
      label: "testLabel",
    };

    const wrapper = shallow(<HoverContainer {...props} />);
    expect(wrapper.find(".HoverContainer").text()).toEqual(props.label);
  });

  it("has `style.top` defined `prop.position` is `top`", () => {
    const props = {
      position: "top",
      visible: true,
      x: 0,
    };

    const wrapper = shallow(<HoverContainer {...props} />);
    expect(wrapper.find(".HoverContainer").prop("style")).toHaveProperty("top");
    expect(wrapper.find(".HoverContainer").prop("style")).not.toHaveProperty("bottom");
  });

  it("has `style.bottom` defined `prop.position` is `bottom`", () => {
    const props = {
      position: "bottom",
      visible: true,
      x: 0,
    };

    const wrapper = shallow(<HoverContainer {...props} />);
    expect(wrapper.find(".HoverContainer").prop("style")).not.toHaveProperty("top");
    expect(wrapper.find(".HoverContainer").prop("style")).toHaveProperty("bottom");
  });
});
