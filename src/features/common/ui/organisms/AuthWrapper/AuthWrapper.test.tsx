import { render } from "@testing-library/react";
import AuthWrapper from "./AuthWrapper";

describe("MainWrapper", () => {
  it("should work as expected", async () => {
    const { baseElement } = render(
      <AuthWrapper>
        <div data-testid="mock-Component" />
      </AuthWrapper>,
    );

    expect(baseElement).toMatchSnapshot();
  });
  it("reflect background color by bgcolor props", async () => {
    const { baseElement } = render(
      <AuthWrapper>
        <div data-testid="mock-Component" />
      </AuthWrapper>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
