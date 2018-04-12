import React from "react";
import { render, Simulate } from "react-testing-library";

import Chart from "../";
import { MOBILE_WIDTH } from "../../../constants";

const DESKTOP_TEST_WIDTH = MOBILE_WIDTH + 1;
const MOBILE_TEST_WIDTH = MOBILE_WIDTH - 1;
const TEST_PROPS = {
  currency: "USD",
  data: [
    { price: 19.99, time: new Date("Wed Apr 11 2018 01:00:00 GMT-0800 (PST)") },
    { price: 29.99, time: new Date("Wed Apr 11 2018 01:01:00 GMT-0800 (PST)") },
    { price: 39.99, time: new Date("Wed Apr 11 2018 01:02:00 GMT-0800 (PST)") },
    { price: 49.99, time: new Date("Wed Apr 11 2018 01:03:00 GMT-0800 (PST)") },
  ],
  color: {
    fill: "#333",
    stroke: "#666",
  },
  durationType: "day",
};

describe("<Chart/>", () => {
  it("[MOBILE] renders without crashing", () => {
    global.innerWidth = MOBILE_TEST_WIDTH;
    const { container } = render(<Chart {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("[MOBILE] renders child components correctly", () => {
    global.innerWidth = MOBILE_TEST_WIDTH;
    const { queryByTestId } = render(<Chart {...TEST_PROPS} />);
    expect(queryByTestId("Graph")).not.toBeNull();
    expect(queryByTestId("HorizontalAxis")).not.toBeNull();
    expect(queryByTestId("VerticalAxis")).not.toBeNull();
    expect(queryByTestId("Cursor")).toBeNull();
    expect(queryByTestId("HoverContainer")).toBeNull();
  });

  it("[DESKTOP] renders without crashing", () => {
    global.innerWidth = DESKTOP_TEST_WIDTH;
    const { container } = render(<Chart {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("[DESKTOP] renders child components correctly", () => {
    global.innerWidth = DESKTOP_TEST_WIDTH;
    const { queryByTestId } = render(<Chart {...TEST_PROPS} />);
    expect(queryByTestId("Graph")).not.toBeNull();
    expect(queryByTestId("HorizontalAxis")).not.toBeNull();
    expect(queryByTestId("VerticalAxis")).not.toBeNull();
    expect(queryByTestId("Cursor")).not.toBeNull();
    expect(queryByTestId("HoverContainer")).not.toBeNull();
  });

  it("[DESKTOP] displays <HoverContainers/> when mouse is hovered over SVG chart", () => {
    global.innerWidth = DESKTOP_TEST_WIDTH;
    const { getByTestId } = render(<Chart {...TEST_PROPS} />);

    // Simulate hovering (mouse entering chart)
    Simulate.mouseEnter(getByTestId("HoverRegion"));
    expect(getByTestId("HoverContainer").style.opacity).toEqual("1");

    // Simulate hovering (mouse leaving chart)
    Simulate.mouseLeave(getByTestId("HoverRegion"));
    expect(getByTestId("HoverContainer").style.opacity).toEqual("0");
  });
});
