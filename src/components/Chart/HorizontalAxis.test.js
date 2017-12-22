import React from "react";
import { shallow } from "enzyme";

import HorizontalAxis from "./HorizontalAxis";

describe("<HorizontalAxis />", () => {
  it("renders without crashing", () => {
    const props = {
      data: [],
      duration: "month",
      tickCount: 1
    };

    const wrapper = shallow(<HorizontalAxis {...props} />);
    expect(wrapper.find(".HorizontalAxis")).toHaveLength(1);
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

  // TODO
  describe("generateTimeAxisTicks()", () => {
  });

  // TODO
  describe("renderTimeAxisTick()", () => {
  });
});
