import React from "react";
import { mount } from "enzyme";
import { render } from "react-testing-library";

import TableCompact from "../";

describe("<TableCompact />", () => {
  it("renders without crashing", () => {
    const props = {
      onCryptocurrencyChange: jest.fn,
      selectedCryptocurrency: "btc",
      cryptocurrencies: [{ key: "btc" }, { key: "bch" }, { key: "eth" }, { key: "ltc" }],
      currency: "USD",
      percentDifference: 9.99,
      priceDifference: 99.99,
      spotPrice: 1999.99,
    };

    const { container } = render(<TableCompact {...props} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders negative differences correctly", () => {
    const props = {
      onCryptocurrencyChange: jest.fn,
      selectedCryptocurrency: "btc",
      cryptocurrencies: [{ key: "btc" }, { key: "bch" }, { key: "eth" }, { key: "ltc" }],
      currency: "USD",
      percentDifference: -9.99,
      priceDifference: -99.99,
      spotPrice: 1999.99,
    };
    const expected = `$${Math.abs(props.priceDifference)} (${Math.abs(props.percentDifference)}%)`;

    const { getByTestId } = render(<TableCompact {...props} />);
    expect(getByTestId("price-details").textContent).toEqual(expected);
  });

  it("renders positive differences correctly", () => {
    const props = {
      onCryptocurrencyChange: jest.fn,
      selectedCryptocurrency: "btc",
      cryptocurrencies: [{ key: "btc" }, { key: "bch" }, { key: "eth" }, { key: "ltc" }],
      currency: "USD",
      percentDifference: 9.99,
      priceDifference: 99.99,
      spotPrice: 1999.99,
    };
    const expected = `$${Math.abs(props.priceDifference)} (${Math.abs(props.percentDifference)}%)`;

    const { getByTestId } = render(<TableCompact {...props} />);
    expect(getByTestId("price-details").textContent).toEqual(expected);
  });

  // TODO: Switch to "react-testing-library" once https://github.com/kentcdodds/react-testing-library/pull/48 is merged
  it("triggers `props.onChange` callback when option is selected", () => {
    const initialSelectedOption = "btc";
    const selectedOption = "ltc";
    const props = {
      onCryptocurrencyChange: jest.fn(),
      selectedCryptocurrency: initialSelectedOption,
      cryptocurrencies: [{ key: "btc" }, { key: "bch" }, { key: "eth" }, { key: "ltc" }],
      currency: "USD",
      percentDifference: 9.99,
      priceDifference: 99.99,
      spotPrice: 1999.99,
    };

    const wrapper = mount(<TableCompact {...props} />);
    wrapper.find("select").simulate("change", { target: { value: selectedOption } });
    expect(props.onCryptocurrencyChange.mock.calls[0][0]).toEqual(selectedOption);
  });
});
