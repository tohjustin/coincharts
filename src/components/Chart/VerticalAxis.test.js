import React from "react";
import { shallow } from "enzyme";

import VerticalAxis from "./VerticalAxis";

describe("<VerticalAxis />", () => {
  it("renders without crashing", () => {
    const props = {
      data: [
        { price: 1, time: new Date(1000) },
        { price: 2, time: new Date(2000) },
        { price: 3, time: new Date(3000) },
        { price: 5, time: new Date(5000) },
        { price: 6, time: new Date(6000) },
        { price: 9, time: new Date(9000) },
        { price: 10, time: new Date(10000) }
      ],
      textAlign: "left"
    };

    const wrapper = shallow(<VerticalAxis {...props} />);
    expect(wrapper.find(".VerticalAxis")).toHaveLength(1);
  });

  it("does not render ticks when `props.data` is []", () => {
    const props = {
      data: [],
      textAlign: "left"
    };

    const wrapper = shallow(<VerticalAxis {...props} />);
    expect(wrapper.find(".VerticalAxis .tick")).toHaveLength(0);
  });

  it("renders ticks correctly", () => {
    const props = {
      data: [
        { price: 1, time: new Date(1000) },
        { price: 2, time: new Date(2000) },
        { price: 3, time: new Date(3000) },
        { price: 5, time: new Date(5000) },
        { price: 6, time: new Date(6000) },
        { price: 9, time: new Date(9000) },
        { price: 10, time: new Date(10000) }
      ],
      textAlign: "left"
    };

    const wrapper = shallow(<VerticalAxis {...props} />);
    expect(wrapper.find(".VerticalAxis .tick")).toHaveLength(2);
    expect(wrapper.find(".VerticalAxis.left .tick")).toHaveLength(2);
    expect(wrapper.find(".VerticalAxis.right .tick")).toHaveLength(0);
  });
});
