import React from "react";
import { render, Simulate } from "react-testing-library";

import TableCompact from "../";

const TEST_PROPS = {
  onCryptocurrencyChange: () => {},
  selectedCryptocurrency: "BTC",
  cryptocurrencies: [{ key: "BTC" }, { key: "BCH" }, { key: "ETH" }, { key: "LTC" }],
  currency: "USD",
  isLoading: false,
  percentDifference: 9.99,
  priceDifference: 99.99,
  spotPrice: 1999.99,
};

describe("<TableCompact />", () => {
  it("renders without crashing", () => {
    const { container } = render(<TableCompact {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders negative differences correctly", () => {
    const props = {
      ...TEST_PROPS,
      percentDifference: -9.99,
      priceDifference: -99.99,
    };
    const expected = `$${Math.abs(props.priceDifference)} (${Math.abs(props.percentDifference)}%)`;

    const { getByTestId } = render(<TableCompact {...props} />);
    expect(getByTestId("price-details").textContent).toEqual(expected);
  });

  it("renders positive differences correctly", () => {
    const expected = `$${Math.abs(TEST_PROPS.priceDifference)} (${Math.abs(TEST_PROPS.percentDifference)}%)`;

    const { getByTestId } = render(<TableCompact {...TEST_PROPS} />);
    expect(getByTestId("price-details").textContent).toEqual(expected);
  });

  it("does not rerender when `props.isLoading` is true", () => {
    const { container } = render(<TableCompact {...TEST_PROPS} />);
    const { textContent } = container.firstChild;

    // Component should not rerender
    render(<TableCompact {...TEST_PROPS} percentDifference={1000} isLoading />, { container });
    expect(container.firstChild.textContent).toEqual(textContent);

    // Component should rerender
    render(<TableCompact {...TEST_PROPS} percentDifference={1000} />, { container });
    expect(container.firstChild.textContent).not.toEqual(textContent);
  });

  it("triggers `props.onChange` callback when option is selected", () => {
    const initialSelectedOption = "BTC";
    const selectedOption = "LTC";
    const props = {
      ...TEST_PROPS,
      onCryptocurrencyChange: jest.fn(),
      selectedCryptocurrency: initialSelectedOption,
    };

    const { container } = render(<TableCompact {...props} />);
    expect(props.onCryptocurrencyChange).toHaveBeenCalledTimes(0);

    Simulate.change(container.querySelector("select"), { target: { value: selectedOption } });
    expect(props.onCryptocurrencyChange).toHaveBeenCalledTimes(1);
    expect(props.onCryptocurrencyChange).lastCalledWith(selectedOption);
  });
});
