import React from "react";
import { render } from "react-testing-library";

import Graph from "../Graph";

const TEST_PROPS = {
  color: {
    fill: "#333",
    stroke: "#666",
  },
  data: [
    { price: 10, time: new Date(1000) },
    { price: 20, time: new Date(2000) },
    { price: 30, time: new Date(3000) },
    { price: 40, time: new Date(4000) },
  ],
  height: 1,
  width: 1,
};

describe("<Graph />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Graph {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders SVG SVG <path/>'s when `props.data` is not empty", () => {
    // Set <Graph/> to be initially empty & update props after initial render
    const { container } = render(<Graph {...TEST_PROPS} data={[]} />);
    render(<Graph {...TEST_PROPS} />, { container });

    expect(container.firstChild.querySelectorAll("path")).not.toHaveLength(0);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("does not render SVG <path/>'s when `props.data` is []", () => {
    const { container } = render(<Graph {...TEST_PROPS} data={[]} />);
    expect(container.firstChild.querySelectorAll("path")).toHaveLength(0);
    expect(container.firstChild).toMatchSnapshot();
  });
});
