import React from "react";
import { render } from "react-testing-library";

import Table from "../";

const TEST_PROPS = {
  cryptocurrencyLabel: "testCryptocurrencyLabel",
  durationLabel: "testDurationLabel",
  currency: "USD",
  isLoading: false,
  percentDifference: 0,
  priceDifference: 0,
  spotPrice: 0,
};

describe("<Table />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Table {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders 3 Table Cells when `props.durationLabel` is defined", () => {
    const { container } = render(<Table {...TEST_PROPS} />);
    expect(container.firstChild.children).toHaveLength(3);
  });

  it("renders only 1 Table Cell when `props.durationLabel` is undefined", () => {
    const { container } = render(<Table {...TEST_PROPS} durationLabel="" />);
    expect(container.firstChild.children).toHaveLength(1);
  });

  it("does not rerender when `props.isLoading` is true", () => {
    const { container } = render(<Table {...TEST_PROPS} />);
    const { textContent } = container.firstChild;

    // Component should not rerender
    render(<Table {...TEST_PROPS} percentDifference={1000} isLoading />, { container });
    expect(container.firstChild.textContent).toEqual(textContent);

    // Component should rerender
    render(<Table {...TEST_PROPS} percentDifference={1000} />, { container });
    expect(container.firstChild.textContent).not.toEqual(textContent);
  });
});
