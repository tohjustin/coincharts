import React from "react";
import { render } from "@testing-library/react";

import Flex from "..";

describe("<Flex />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Flex />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});
