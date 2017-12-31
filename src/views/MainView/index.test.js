import React from "react";
import { shallow } from "enzyme";

import { UnconnectedMainView } from "./index";

describe("<MainView/>", () => {
  it("renders without crashing", () => {
    const props = {
      requestPriceData: () => {}
    };

    const wrapper = shallow(<UnconnectedMainView {...props} />);
    expect(wrapper.find(".App")).toHaveLength(1);
  });

  it("renders sub-components correctly", () => {
    const props = {
      requestPriceData: () => {}
    };

    const wrapper = shallow(<UnconnectedMainView {...props} />);
    expect(wrapper.find("Connect(CryptocurrencyTabs)")).toHaveLength(1);
    expect(wrapper.find("Connect(DurationTabs)")).toHaveLength(1);
    expect(wrapper.find("Connect(PriceTable)")).toHaveLength(1);
    expect(wrapper.find("Connect(PriceChart)")).toHaveLength(1);
  });

  describe("Price data polling", () => {
    // Use fake timers to tests `setInterval()` behavior
    jest.useFakeTimers();

    it("starts polling for price data when rendered", () => {
      const props = {
        requestPriceData: jest.fn()
      };

      shallow(<UnconnectedMainView {...props} />);
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(2);

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(3);
    });

    it("stops polling for price data when `clearPriceDataPolling()` is called", () => {
      const props = {
        requestPriceData: jest.fn()
      };

      const wrapper = shallow(<UnconnectedMainView {...props} />);
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);

      // Stop polling price data by calling `clearPriceDataPolling()`
      wrapper.instance().clearPriceDataPolling();

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);
    });

    it("resumes polling for price data when `startPriceDataPolling()` is called", () => {
      const props = {
        requestPriceData: jest.fn()
      };

      const wrapper = shallow(<UnconnectedMainView {...props} />);
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);

      // Stop polling price data by calling `clearPriceDataPolling()`
      wrapper.instance().clearPriceDataPolling();

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);

      // Resume polling price data by calling `startPriceDataPolling()`
      wrapper.instance().startPriceDataPolling();

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(2);
    });

    it("calls `clearPriceDataPolling()` when unmounted", () => {
      const props = {
        requestPriceData: () => {}
      };
      const mockedClearPriceDataPolling = jest.fn();

      const wrapper = shallow(<UnconnectedMainView {...props} />);
      wrapper.instance().clearPriceDataPolling = mockedClearPriceDataPolling;
      expect(mockedClearPriceDataPolling).toHaveBeenCalledTimes(0);

      wrapper.unmount();
      expect(mockedClearPriceDataPolling).toHaveBeenCalledTimes(1);
    });
  });
});
