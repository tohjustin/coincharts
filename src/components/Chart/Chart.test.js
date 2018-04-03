import React from "react";
import { mount } from "enzyme";

import Chart from "./Chart";

describe("<Chart/>", () => {
  it("renders without crashing", () => {
    const props = {
      currency: "USD",
      data: [],
      color: {
        fill: "#333",
        stroke: "#666",
      },
      durationType: "day",
    };

    const wrapper = mount(<Chart {...props} />);
    expect(wrapper.find(".Chart")).toHaveLength(1);
  });

  it("renders sub-components correctly", () => {
    const props = {
      currency: "USD",
      data: [],
      color: {
        fill: "#333",
        stroke: "#666",
      },
      durationType: "day",
    };

    const wrapper = mount(<Chart {...props} />);
    expect(wrapper.find("HoverContainer")).toHaveLength(2);
    expect(wrapper.find("Graph")).toHaveLength(1);
    expect(wrapper.find("Cursor")).toHaveLength(1);
    expect(wrapper.find("VerticalAxis")).toHaveLength(2);
    expect(wrapper.find("HorizontalAxis")).toHaveLength(1);
  });

  it("updates `state.hovered` when moused is hovered over SVG chart", () => {
    const props = {
      currency: "USD",
      data: [],
      color: {
        fill: "#333",
        stroke: "#666",
      },
      durationType: "day",
    };

    const wrapper = mount(<Chart {...props} />);

    // Simulate hovering (mouse entering chart)
    wrapper.find("svg").simulate("mouseenter");
    expect(wrapper.state().hovered).toEqual(true);

    // Simulate hovering (mouse leaving chart)
    wrapper.find("svg").simulate("mouseleave");
    expect(wrapper.state().hovered).toEqual(false);
  });

  it("updates `state.height` & `state.width` during `window.resize` events", () => {
    const initialBoundingClientRect = { width: 200, height: 250, top: 0, left: 0, bottom: 0, right: 0 };
    const finalBoundingClientRect = { width: 500, height: 300, top: 0, left: 0, bottom: 0, right: 0 };
    const props = {
      currency: "USD",
      data: [],
      color: {
        fill: "#333",
        stroke: "#666",
      },
      durationType: "day",
    };

    // Set initial parameters from `boundingClientRect()`
    Element.prototype.getBoundingClientRect = jest.fn(() => initialBoundingClientRect);

    const wrapper = mount(<Chart {...props} />);
    expect(wrapper.state().dimensions).toEqual({ width: 200, height: 250 });

    // Simulate window resizing
    Element.prototype.getBoundingClientRect = jest.fn(() => finalBoundingClientRect);
    global.dispatchEvent(new Event("resize"));
    expect(wrapper.state().dimensions).toEqual({ width: 500, height: 300 });
  });
});
