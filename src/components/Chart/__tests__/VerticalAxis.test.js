import React from "react";
import { render } from "react-testing-library";

import VerticalAxis from "../VerticalAxis";

const MAX_PRICE = 999;
const MIN_PRICE = 1;
const TEST_PROPS = {
  currency: "USD",
  data: [
    { price: 10, time: new Date(1000000) },
    { price: 20, time: new Date(2000000) },
    { price: 30, time: new Date(3000000) },
    { price: 40, time: new Date(4000000) },
    { price: 50, time: new Date(5000000) },
    { price: 60, time: new Date(6000000) },
    { price: MAX_PRICE, time: new Date(7000000) },
    { price: MIN_PRICE, time: new Date(8000000) },
  ],
  align: "left",
};

describe("<VerticalAxis />", () => {
  it("renders without crashing", () => {
    const { container } = render(<VerticalAxis {...TEST_PROPS} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders ticks correctly", () => {
    const { container } = render(<VerticalAxis {...TEST_PROPS} />);
    expect(container.firstChild.children).toHaveLength(2);
    expect(container.firstChild.children[0].textContent).toEqual(`$${MAX_PRICE}`);
    expect(container.firstChild.children[1].textContent).toEqual(`$${MIN_PRICE}`);
  });

  it("does not render ticks when `props.data` is []", () => {
    const { container } = render(<VerticalAxis {...TEST_PROPS} data={[]} />);
    expect(container.firstChild.children).toHaveLength(0);
    expect(container.firstChild).toMatchSnapshot();
  });
});
