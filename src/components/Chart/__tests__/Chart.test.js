import React from "react";
import { render, Simulate } from "react-testing-library";

import Chart from "../";

const TEST_PROPS = {
  currency: "USD",
  data: [
    { price: 19.99, time: new Date(1000000) },
    { price: 29.99, time: new Date(2000000) },
    { price: 39.99, time: new Date(3000000) },
    { price: 49.99, time: new Date(4000000) },
  ],
  color: {
    fill: "#333",
    stroke: "#666",
  },
  durationType: "day",
  isLoading: false,
};

describe("<Chart/>", () => {
  it("renders without crashing", () => {
    const { container } = render(<Chart {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("does not rerender when `props.isLoading` is true", () => {
    const { container } = render(<Chart {...TEST_PROPS} />);
    const { textContent } = container.firstChild;

    // Component should not rerender
    render(<Chart {...TEST_PROPS} durationType="month" isLoading />, { container });
    expect(container.firstChild.textContent).toEqual(textContent);

    // Component should rerender
    render(<Chart {...TEST_PROPS} durationType="month" />, { container });
    expect(container.firstChild.textContent).not.toEqual(textContent);
  });

  it("renders child components correctly", () => {
    const { queryByTestId } = render(<Chart {...TEST_PROPS} />);
    expect(queryByTestId("Graph")).not.toBeNull();
    expect(queryByTestId("HorizontalAxis")).not.toBeNull();
    expect(queryByTestId("VerticalAxis")).not.toBeNull();
    expect(queryByTestId("Cursor")).not.toBeNull();
    expect(queryByTestId("HoverContainer")).not.toBeNull();
  });

  it("renders child components correctly when `props.disableCursor` is true", () => {
    const { queryByTestId } = render(<Chart {...TEST_PROPS} disableCursor />);
    expect(queryByTestId("Graph")).not.toBeNull();
    expect(queryByTestId("HorizontalAxis")).not.toBeNull();
    expect(queryByTestId("VerticalAxis")).not.toBeNull();
    expect(queryByTestId("Cursor")).toBeNull();
    expect(queryByTestId("HoverContainer")).toBeNull();
  });

  it("[DESKTOP] displays <HoverContainers/> when mouse is hovered over SVG chart", () => {
    const { getByTestId } = render(<Chart {...TEST_PROPS} />);

    // Simulate hovering (mouse entering chart)
    Simulate.mouseEnter(getByTestId("HoverRegion"));
    expect(getByTestId("HoverContainer").style.opacity).toEqual("1");

    // Simulate hovering (mouse leaving chart)
    Simulate.mouseLeave(getByTestId("HoverRegion"));
    expect(getByTestId("HoverContainer").style.opacity).toEqual("0");
  });
});
