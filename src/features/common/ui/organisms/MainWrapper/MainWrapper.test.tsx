import { render } from "@testing-library/react";
import MainWrapper from "./MainWrapper";

describe("MainWrapper", () => {
  it("should work as expected", async () => {
    const { baseElement } = render(
      <MainWrapper>
        <div data-testid="mock-Component" />
      </MainWrapper>,
    );

    expect(baseElement).toMatchSnapshot();
  });
  it("reflect background color by bgcolor props", async () => {
    const { baseElement } = render(
      <MainWrapper bgcolor={(theme) => theme.palette.primary.main}>
        <div data-testid="mock-Component" />
      </MainWrapper>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
