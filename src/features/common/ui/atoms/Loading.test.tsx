import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  it("should work as expected", async () => {
    const { baseElement } = render(<Loading />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should work as expected with size passed", async () => {
    const { baseElement } = render(<Loading size={50} />);

    expect(baseElement).toMatchSnapshot();
  });
});
