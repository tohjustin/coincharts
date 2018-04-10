import React from "react";
import { render, Simulate } from "react-testing-library";

import Tabs from "../";

describe("<Tabs />", () => {
  it("renders without crashing", () => {
    const props = {
      options: {
        a: { listKey: "listKey_a", element: <div>a</div> },
        b: { listKey: "listKey_b", element: <div>b</div> },
      },
      onChange: () => {},
      selectedKey: "a",
    };

    const { container } = render(<Tabs {...props} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders selected tab correctly", () => {
    const selectedKey = "a";
    const props = {
      options: {
        a: { listKey: "listKey_a", element: <div>a</div> },
        b: { listKey: "listKey_b", element: <div>b</div> },
      },
      onChange: () => {},
      selectedKey,
    };

    const { container } = render(<Tabs {...props} />);
    expect(container.querySelector("div[aria-selected='true']")).not.toBeNull();
    expect(container.querySelector("div[aria-selected='true']").textContent).toEqual(selectedKey);
  });

  it("triggers `props.onChange` callback when tab is clicked", async () => {
    const initialSelectedKey = "a";
    const selectedKey = "b";
    const props = {
      options: {
        a: { listKey: "listKey_a", element: <div>a</div> },
        b: { listKey: "listKey_b", element: <div>b</div> },
      },
      onChange: jest.fn(),
      selectedKey: initialSelectedKey,
    };

    const { container } = render(<Tabs {...props} />);

    props.onChange.mockClear();
    Simulate.click(container.querySelectorAll("div[role='tab']")[1]);

    // Check if the 1st argument (of the 1st invocation) matches what we clicked on
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange.mock.calls[0][0]).toEqual(selectedKey);
    expect(props.onChange.mock.calls[0][0]).not.toEqual(initialSelectedKey);
  });
});
