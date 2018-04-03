import React from "react";
import { shallow } from "enzyme";

import Table from "./Table";

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

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(".Table")).toHaveLength(1);
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

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(".TableCell")).toHaveLength(3);
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

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(".TableCell")).toHaveLength(1);
  });
});
