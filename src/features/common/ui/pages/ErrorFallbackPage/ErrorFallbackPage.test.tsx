import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorFallbackPage from "./ErrorFallbackPage";

describe("ErrorFallbackPage", () => {
  const windowUrl = window.location;

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", { configurable: true, value: windowUrl });
  });

  it("should render correctly", async () => {
    const { baseElement } = render(<ErrorFallbackPage />);
    expect(baseElement).toMatchSnapshot();
  });

  it("reload button click should reload the current screen", async () => {
    const user = userEvent.setup();
    render(<ErrorFallbackPage />);
    const reloadButton = screen.getByRole("button", { name: /reload/i });
    await user.click(reloadButton);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
