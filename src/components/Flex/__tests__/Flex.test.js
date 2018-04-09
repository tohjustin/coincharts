import React from "react";
import { render } from "react-testing-library";

import Flex from "../";

describe("<Flex />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Flex />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});
