import React from "react";
import { shallow } from "enzyme";

import NumberSign from "./NumberSign";
import Table from "./Table";
import Default from "./index";

describe("<Table />", () => {
  it("exports <Table/> by default", () => {
    expect(Default).toEqual(Table);
  });

  it("renders without crashing", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "testDurationLabel",
      priceHistory: [],
      spotPrice: 0
    };

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(".Table")).toHaveLength(1);
  });

  it("renders 3 Table Cells when `props.durationLabel` is defined", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "testDurationLabel",
      priceHistory: [],
      spotPrice: 0
    };

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(".TableCell")).toHaveLength(3);
  });

  it("renders only 2 <NumberSign/> when `props.durationLabel` is defined", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "testDurationLabel",
      priceHistory: [],
      spotPrice: 0
    };

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(NumberSign)).toHaveLength(2);
  });

  it("renders only 1 Table Cell when `props.durationLabel` is undefined", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "",
      priceHistory: [],
      spotPrice: 0
    };

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(".TableCell")).toHaveLength(1);
  });

  it("renders no <NumberSign/> when `props.durationLabel` is undefined", () => {
    const props = {
      cryptocurrencyLabel: "testCryptocurrencyLabel",
      durationLabel: "",
      priceHistory: [],
      spotPrice: 0
    };

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find(NumberSign)).toHaveLength(0);
  });
});
