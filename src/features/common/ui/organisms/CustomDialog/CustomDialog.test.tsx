import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomDialog, { CustomDialogProps } from "./CustomDialog";

const onConfirmMock = jest.fn().mockImplementation(async () => new Promise((resolve) => setTimeout(resolve, 200)));

const onCloseMock = jest.fn();
const baseProps: CustomDialogProps = {
  open: true,
  title: "mock-title",
  onClose: onCloseMock,
  description: "mock-description",
};

describe("CustomDialog", () => {
  const user = userEvent.setup();
  it("should close as expected", async () => {
    const closeProps = { ...baseProps, open: false };

    render(<CustomDialog {...closeProps} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should call close callback as expected", async () => {
    render(<CustomDialog {...baseProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /confirm/i })).not.toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /cancel/i });

    await user.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should open and show title, description as expected", async () => {
    render(<CustomDialog {...baseProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName(/mock-title/i);
    expect(dialog).toHaveAccessibleDescription(/mock-description/i);

    await screen.findByRole("button", { name: /cancel/i });
  });

  it("change close button text", async () => {
    const props = { ...baseProps, closeButtonText: "Okay" };
    render(<CustomDialog {...props} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName(/mock-title/i);
    expect(dialog).toHaveAccessibleDescription(/mock-description/i);

    await screen.findByRole("button", { name: /okay/i });
  });

  describe("confirm button should work as expect", () => {
    it("should call confirm callback, show loading and auto close when props are passed", async () => {
      const props: CustomDialogProps = {
        ...baseProps,
        confirmButtonProps: {
          displayText: "Confirm",
          onConfirm: onConfirmMock,
          autoClose: true,
        },
      };

      render(<CustomDialog {...props} />);

      const confirmButton = screen.getByRole("button", { name: /confirm/i });
      expect(confirmButton).toBeEnabled();
      await user.click(confirmButton);

      await screen.findByRole("progressbar");
      expect(confirmButton).toBeDisabled();
      await waitForElementToBeRemoved(await screen.findByRole("progressbar"));

      expect(onConfirmMock).toHaveBeenCalledTimes(1);
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("should call confirm callback, show loading and disappear without auto close", async () => {
      const props: CustomDialogProps = {
        ...baseProps,
        confirmButtonProps: {
          displayText: "Confirm",
          onConfirm: onConfirmMock,
        },
      };

      render(<CustomDialog {...props} />);

      const confirmButton = screen.getByRole("button", { name: /confirm/i });
      expect(within(confirmButton).queryByRole("progressbar")).not.toBeInTheDocument();
      expect(confirmButton).toBeEnabled();

      await user.click(confirmButton);

      expect(confirmButton).toBeDisabled();
      await waitForElementToBeRemoved(await within(confirmButton).findByRole("progressbar"));

      expect(onConfirmMock).toHaveBeenCalledTimes(1);
      expect(onCloseMock).toHaveBeenCalledTimes(0);
    });
  });
});
