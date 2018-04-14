import React from "react";
import { render } from "react-testing-library";

import ErrorBoundary from "../";

describe("<ErrorBoundary />", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ErrorBoundary>
        <div>Hello World</div>
      </ErrorBoundary>,
    );

    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("throws console.error if there's no `props.children`", () => {
    console.error = jest.fn(); // eslint-disable-line no-console

    try {
      render(<ErrorBoundary />);
      throw new Error("should have thrown error");
    } catch (err) {
      expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
    }
  });
});
