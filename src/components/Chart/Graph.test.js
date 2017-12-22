import React from "react";
import { mount } from "enzyme";

import Graph from "./Graph";

describe("<Graph />", () => {
  it("renders without crashing", () => {
    const props = {
      color: {
        fill: "#333",
        stroke: "#666"
      },
      data: [],
      height: 1,
      width: 1
    };

    const wrapper = mount(<Graph {...props} />);
    expect(wrapper.find(".Graph")).toHaveLength(1);
  });

  it("does not render SVG <path/>'s when `props.data` is []", () => {
    const props = {
      color: {
        fill: "#333",
        stroke: "#666"
      },
      data: [],
      height: 1,
      width: 1
    };

    const wrapper = mount(<Graph {...props} />);
    expect(wrapper.find(".Graph")).toHaveLength(1);
    expect(wrapper.render().find(".Graph path")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-line")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-area")).toHaveLength(0);
  });

  it("renders SVG <path/>'s when `props.data` changes from [] to a non-empty value", () => {
    const props0 = {
      color: {
        fill: "#333",
        stroke: "#666"
      },
      data: [],
      height: 1,
      width: 1
    };
    const props1 = {
      color: {
        fill: "#333",
        stroke: "#666"
      },
      data: [
        { price: 1, time: new Date(1000) },
        { price: 2, time: new Date(2000) },
        { price: 3, time: new Date(3000) },
        { price: 4, time: new Date(4000) },
      ],
      height: 1,
      width: 1
    };

    const wrapper = mount(<Graph {...props0} />);
    expect(wrapper.find(".Graph")).toHaveLength(1);
    expect(wrapper.render().find(".Graph path")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-line")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-area")).toHaveLength(0);

    wrapper.setProps(props1);
    expect(wrapper.find(".Graph")).toHaveLength(1);
    expect(wrapper.render().find(".Graph path")).toHaveLength(2);
    expect(wrapper.render().find(".Graph .Graph-line")).toHaveLength(1);
    expect(wrapper.render().find(".Graph .Graph-area")).toHaveLength(1);
  });

  it("renders SVG <path/>'s when `props.data` doesn't change", () => {
    const props0 = {
      color: {
        fill: "#333",
        stroke: "#666"
      },
      data: [],
      height: 1,
      width: 1
    };
    const props1 = {
      color: {
        fill: "#666",
        stroke: "#333"
      },
      data: [],
      height: 2,
      width: 2
    };

    const wrapper = mount(<Graph {...props0} />);
    expect(wrapper.find(".Graph")).toHaveLength(1);
    expect(wrapper.render().find(".Graph path")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-line")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-area")).toHaveLength(0);

    wrapper.setProps(props1);
    expect(wrapper.find(".Graph")).toHaveLength(1);
    expect(wrapper.render().find(".Graph path")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-line")).toHaveLength(0);
    expect(wrapper.render().find(".Graph .Graph-area")).toHaveLength(0);
  });
});
