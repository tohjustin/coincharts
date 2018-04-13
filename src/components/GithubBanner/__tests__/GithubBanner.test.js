import React from "react";
import { render } from "react-testing-library";

import GithubBanner from "../";

const REPOSITORY_URL = process.env.REACT_APP_REPOSITORY_URL;

describe("<GithubBanner />", () => {
  it("renders without crashing", () => {
    const { container } = render(<GithubBanner />);
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("contains anchor tag to project's Github project page", () => {
    const { container } = render(<GithubBanner />);
    expect(container.querySelector("a").href).toEqual(REPOSITORY_URL);
  });
});
