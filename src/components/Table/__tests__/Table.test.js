import React from "react";
import { render } from "react-testing-library";

import Table from "../";

describe("<Table />", () => {
  it("renders without crashing", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "testDurationLabel",
      currency: "USD",
      percentDifference: 0,
      priceDifference: 0,
      spotPrice: 0,
    };

    const { container } = render(<Table {...props} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders 3 Table Cells when `props.durationLabel` is defined", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "testDurationLabel",
      currency: "USD",
      percentDifference: 0,
      priceDifference: 0,
      spotPrice: 0,
    };

    const { container } = render(<Table {...props} />);
    expect(container.firstChild.children).toHaveLength(3);
  });

  it("renders only 1 Table Cell when `props.durationLabel` is undefined", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "",
      currency: "USD",
      percentDifference: 0,
      priceDifference: 0,
      spotPrice: 0,
    };

    const { container } = render(<Table {...props} />);
    expect(container.firstChild.children).toHaveLength(1);
  });
});
