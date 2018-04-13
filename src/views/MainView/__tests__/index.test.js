import React from "react";

import { renderWithReduxStore } from "../../../utils/tests";
import { MOBILE_WIDTH } from "../../../constants";
import { UnconnectedMainView } from "../";

const DESKTOP_TEST_WIDTH = MOBILE_WIDTH + 1;
const MOBILE_TEST_WIDTH = MOBILE_WIDTH - 1;
const TEST_PROPS = {
  requestPriceData: () => {},
};

describe("<MainView/>", () => {
  it("[MOBILE] renders without crashing", () => {
    global.innerWidth = MOBILE_TEST_WIDTH;
    const { container } = renderWithReduxStore(<UnconnectedMainView {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("[DESKTOP] renders without crashing", () => {
    global.innerWidth = DESKTOP_TEST_WIDTH;
    const { container } = renderWithReduxStore(<UnconnectedMainView {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("Price data polling", () => {
    // Use fake timers to tests `setInterval()` behavior
    jest.useFakeTimers();

    it("starts polling for price data when rendered", () => {
      const props = {
        requestPriceData: jest.fn(),
      };

      renderWithReduxStore(<UnconnectedMainView {...props} />);
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(2);

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(3);
    });

    it("stops polling for price data when component is unmounted", () => {
      const props = {
        requestPriceData: jest.fn(),
      };

      const { unmount } = renderWithReduxStore(<UnconnectedMainView {...props} />);
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);
      unmount();

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);

      jest.runOnlyPendingTimers();
      expect(props.requestPriceData).toHaveBeenCalledTimes(1);
    });
  });
});
