import React from "react";
import { shallow } from "enzyme";

import NumberSign, { PLUS_CHAR, MINUS_CHAR } from "./NumberSign";

describe("<NumberSign />", () => {
  it("renders without crashing", () => {
    const props = {
      isPositive: true
    };

    const wrapper = shallow(<NumberSign {...props} />);
    expect(wrapper.find("span")).toHaveLength(1);
  });

  it("renders '+' when `props.isPositive` is true", () => {
    const props = {
      isPositive: true
    };

    const wrapper = shallow(<NumberSign {...props} />);
    expect(wrapper.text()).toEqual(PLUS_CHAR);
  });

  it("renders '-' when `props.isPositive` is false", () => {
    const props = {
      isPositive: false
    };

    const wrapper = shallow(<NumberSign {...props} />);
    expect(wrapper.text()).toEqual(MINUS_CHAR);
  });
});
