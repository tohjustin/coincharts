import React from "react";
import { mount } from "enzyme";
import { render } from "react-testing-library";

import TableCompact from "../";

const TEST_PROPS = {
  onCryptocurrencyChange: jest.fn(),
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

  // TODO: Switch to "react-testing-library" once https://github.com/kentcdodds/react-testing-library/pull/48 is merged
  it("triggers `props.onChange` callback when option is selected", () => {
    const initialSelectedOption = "BTC";
    const selectedOption = "LTC";
    const props = {
      ...TEST_PROPS,
      selectedCryptocurrency: initialSelectedOption,
    };

    const wrapper = mount(<TableCompact {...props} />);
    wrapper.find("select").simulate("change", { target: { value: selectedOption } });
    expect(props.onCryptocurrencyChange.mock.calls[0][0]).toEqual(selectedOption);
  });
});
