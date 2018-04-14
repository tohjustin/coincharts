import React from "react";
import { render } from "react-testing-library";

import HorizontalAxis from "../HorizontalAxis";

const MAX_DATE = 8000000;
const MIN_DATE = 1000000;
const TEST_PROPS = {
  data: [
    { price: 10, time: new Date(MIN_DATE) },
    { price: 20, time: new Date(2000000) },
    { price: 30, time: new Date(3000000) },
    { price: 40, time: new Date(4000000) },
    { price: 50, time: new Date(5000000) },
    { price: 60, time: new Date(6000000) },
    { price: 70, time: new Date(7000000) },
    { price: 80, time: new Date(MAX_DATE) },
  ],
  duration: "day",
  tickCount: 3,
  hideRightMargin: false,
};

describe("<HorizontalAxis />", () => {
  it("renders without crashing", () => {
    const { container } = render(<HorizontalAxis {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders ticks correctly", () => {
    const { container } = render(<HorizontalAxis {...TEST_PROPS} />);
    expect(container.firstChild.children).toHaveLength(TEST_PROPS.tickCount);
  });

  it("does not render ticks when `TEST_PROPS.data` is []", () => {
    const { container } = render(<HorizontalAxis {...TEST_PROPS} data={[]} />);
    expect(container.firstChild.children).toHaveLength(0);
    expect(container.firstChild).toMatchSnapshot();
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
      { price: 1, time: new Date(1000000) },
      { price: 2, time: new Date(2000000) },
      { price: 2, time: new Date(3000000) },
      { price: 2, time: new Date(5000000) },
      { price: 2, time: new Date(6000000) },
      { price: 2, time: new Date(9000000) },
      { price: 2, time: new Date(10000000) },
    ];

    it("generates a sequence of ticks based on `tickCounts`", () => {
      expect(HorizontalAxis.generateTicks(data, 2)).toEqual([1000000, 10000000]);
      expect(HorizontalAxis.generateTicks(data, 3)).toEqual([1000000, 5500000, 10000000]);
      expect(HorizontalAxis.generateTicks(data, 4)).toEqual([1000000, 4000000, 7000000, 10000000]);
      expect(HorizontalAxis.generateTicks(data, 5)).toEqual([1000000, 3250000, 5500000, 7750000, 10000000]);
    });

    it("returns [] when `tickCount` is invalid (1, 0, negative number)", () => {
      expect(HorizontalAxis.generateTicks(data, 1)).toEqual([]);
      expect(HorizontalAxis.generateTicks(data, 0)).toEqual([]);
      expect(HorizontalAxis.generateTicks(data, -1)).toEqual([]);
    });
  });
});
