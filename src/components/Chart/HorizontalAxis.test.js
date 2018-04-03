import React from "react";
import { shallow } from "enzyme";

import HorizontalAxis from "./HorizontalAxis";

describe("<HorizontalAxis />", () => {
  it("renders without crashing", () => {
    const props = {
      data: [],
      duration: "month",
      tickCount: 10,
    };

    const wrapper = shallow(<HorizontalAxis {...props} />);
    expect(wrapper.find(".HorizontalAxis")).toHaveLength(1);
  });

  it("does not render ticks when `props.data` is []", () => {
    const props = {
      data: [],
      duration: "month",
      tickCount: 10,
    };

    const wrapper = shallow(<HorizontalAxis {...props} />);
    expect(wrapper.find(".HorizontalAxis .tick")).toHaveLength(0);
  });

  it("renders ticks correctly", () => {
    const props = {
      data: [{ price: 1, time: new Date(1000) }, { price: 2, time: new Date(2000) }],
      duration: "month",
      tickCount: 10,
    };

    const wrapper = shallow(<HorizontalAxis {...props} />);
    expect(wrapper.find(".HorizontalAxis .tick")).toHaveLength(props.tickCount);
  });

  describe("formatTime()", () => {
    const timestamp0 = Date.parse("Sun, 31 Dec 2017 12:00:00");
    const timestamp1 = Date.parse("Mon, 01 Jan 2018 00:00:00");
    it("formats timestamp to `Mmm YYYY` when `duration` = ALL", () => {
      expect(HorizontalAxis.formatTime(timestamp0, "all")).toEqual("Dec 2017");
      expect(HorizontalAxis.formatTime(timestamp1, "all")).toEqual("Jan 2018");
    });

    it("formats timestamp to `Mmm YYYY` when `duration` = YEAR", () => {
      expect(HorizontalAxis.formatTime(timestamp0, "year")).toEqual("Dec 31");
      expect(HorizontalAxis.formatTime(timestamp1, "year")).toEqual("Jan  1");
    });

    it("formats timestamp to `Mmm YYYY` when `duration` = MONTH", () => {
      expect(HorizontalAxis.formatTime(timestamp0, "month")).toEqual("Dec 31");
      expect(HorizontalAxis.formatTime(timestamp1, "month")).toEqual("Jan  1");
    });

    it("formats timestamp to `Mmm YYYY` when `duration` = WEEK", () => {
      expect(HorizontalAxis.formatTime(timestamp0, "week")).toEqual("Dec 31");
      expect(HorizontalAxis.formatTime(timestamp1, "week")).toEqual("Jan  1");
    });

    it("formats timestamp to `Mmm YYYY` when `duration` = DAY", () => {
      expect(HorizontalAxis.formatTime(timestamp0, "day")).toEqual("12:00 PM");
      expect(HorizontalAxis.formatTime(timestamp1, "day")).toEqual("12:00 AM");
    });

    it("formats timestamp to `Mmm YYYY` when `duration` = HOUR", () => {
      expect(HorizontalAxis.formatTime(timestamp0, "hour")).toEqual("12:00 PM");
      expect(HorizontalAxis.formatTime(timestamp1, "hour")).toEqual("12:00 AM");
    });
  });

  describe("generateTicks()", () => {
    const data = [
      { price: 1, time: new Date(1000) },
      { price: 2, time: new Date(2000) },
      { price: 2, time: new Date(3000) },
      { price: 2, time: new Date(5000) },
      { price: 2, time: new Date(6000) },
      { price: 2, time: new Date(9000) },
      { price: 2, time: new Date(10000) },
    ];

    it("generates a sequence of ticks based on `tickCounts`", () => {
      expect(HorizontalAxis.generateTicks(data, 2)).toEqual([1000, 10000]);
      expect(HorizontalAxis.generateTicks(data, 3)).toEqual([1000, 5500, 10000]);
      expect(HorizontalAxis.generateTicks(data, 4)).toEqual([1000, 4000, 7000, 10000]);
      expect(HorizontalAxis.generateTicks(data, 5)).toEqual([1000, 3250, 5500, 7750, 10000]);
    });

    it("returns [] when `tickCount` is invalid (1, 0, negative number)", () => {
      expect(HorizontalAxis.generateTicks(data, 1)).toEqual([]);
      expect(HorizontalAxis.generateTicks(data, 0)).toEqual([]);
      expect(HorizontalAxis.generateTicks(data, -1)).toEqual([]);
    });
  });
});
