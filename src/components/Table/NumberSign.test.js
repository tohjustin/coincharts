import React from "react";
import { shallow } from "enzyme";

import NumberSign, { PLUS_CHAR, MINUS_CHAR } from "./NumberSign";

describe("<NumberSign />", () => {
  it("renders without crashing", () => {
    const props = {
      value: 1000
    };

    const wrapper = shallow(<NumberSign {...props} />);
    expect(wrapper.find("span")).toHaveLength(1);
  });

  it("renders '+' when `props.value` is 1", () => {
    const props = {
      value: 1
    };

    const wrapper = shallow(<NumberSign {...props} />);
    expect(wrapper.text()).toEqual(PLUS_CHAR);
  });

  it("renders '-' when `props.value` is -1", () => {
    const props = {
      value: -1
    };

    const wrapper = shallow(<NumberSign {...props} />);
    expect(wrapper.text()).toEqual(MINUS_CHAR);
  });

  it("renders nothing when `props.value` is 0", () => {
    const props = {
      value: 0
    };

    const wrapper = shallow(<NumberSign {...props} />);
    expect(wrapper.text()).toEqual("");
  });
});
