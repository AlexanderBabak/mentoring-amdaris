import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Snackbar, { SnackbarProps } from "./Snackbar";

const onCloseMock = jest.fn();
const baseProps: SnackbarProps = {
  open: true,
  onClose: onCloseMock,
  alertSeverity: "success",
  alertTitle: "some alert title",
  alertContent: "some alert content",
};

describe("Snackbar", () => {
  it("should close as expected", async () => {
    const closeProps = {
      ...baseProps,
      open: false,
    };

    render(<Snackbar {...closeProps} />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should call close callback as expected", async () => {
    const user = userEvent.setup();

    render(<Snackbar {...baseProps} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });

    await user.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should be rendered as expected", async () => {
    const { baseElement } = render(<Snackbar {...baseProps} />);

    expect(baseElement).toMatchSnapshot();
  });
});
