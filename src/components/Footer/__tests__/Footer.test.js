import React from "react";
import { render } from "react-testing-library";

import Footer from "../";

describe("<Footer />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders logo w/ correct alt-text", () => {
    const { getByAltText } = render(<Footer />);
    const footerLogo = getByAltText("coinbase-logo");
    expect(footerLogo).not.toBeNull();
  });
});
