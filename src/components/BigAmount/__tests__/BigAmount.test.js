import React from "react";
import { render } from "react-testing-library";

import BigAmount from "../";
import { MINUS_SYMBOL, PLUS_SYMBOL } from "../BigAmount";

describe("<BigAmount />", () => {
  it("renders without crashing", () => {
    const props = {
      value: 99.99,
    };

    const { container } = render(<BigAmount {...props} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders without crashing (type: currency)", () => {
    const props = {
      value: 99.99,
      type: "currency",
    };

    const { container } = render(<BigAmount {...props} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
    expect(container.textContent).toEqual("$99.99");
  });

  it("renders without crashing (type: percentage)", () => {
    const props = {
      value: 99.99,
      type: "percentage",
    };

    const { container } = render(<BigAmount {...props} />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
    expect(container.textContent).toEqual("99.99%");
  });

  it("renders PLUS_SYMBOL/MINUS_SYMBOL when `props.showPlusMinusSymbol` is true", () => {
    const props = {
      value: 99.99,
      type: "percentage",
      showPlusMinusSymbol: true,
    };

    const { container } = render(<BigAmount {...props} />);
    expect(container.textContent).toEqual(`${PLUS_SYMBOL}99.99%`);

    props.type = "currency";
    props.value = -99.99;
    render(<BigAmount {...props} />, { container });
    expect(container.textContent).toEqual(`${MINUS_SYMBOL}$99.99`);
  });

  it("not render PLUS_SYMBOL/MINUS_SYMBOL when `props.showPlusMinusSymbol` is false", () => {
    const props = {
      value: 99.99,
      type: "percentage",
      showPlusMinusSymbol: false,
    };

    const { container } = render(<BigAmount {...props} />);
    expect(container.textContent).toEqual("99.99%");

    props.type = "currency";
    props.value = -99.99;
    render(<BigAmount {...props} />, { container });
    expect(container.textContent).toEqual("$99.99");
  });
});
