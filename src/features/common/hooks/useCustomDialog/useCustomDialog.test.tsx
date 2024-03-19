import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCustomDialog, { CustomDialogProvider } from "./useCustomDialog";

describe("useCustomDialog", () => {
  it("should show dialog when button is clicked", async () => {
    const onConfirmMock = jest.fn();

    const MockComponent = () => {
      const { openDialog } = useCustomDialog();

      const handleOpenDialog = () =>
        openDialog({
          title: "mock dialog title",
          confirmButtonProps: {
            displayText: "Confirm",
            onConfirm: onConfirmMock,
          },
          description: "mock description",
        });

      return (
        <div>
          <button onClick={handleOpenDialog}>Open confirmation dialog</button>
        </div>
      );
    };

    const user = userEvent.setup();

    render(<MockComponent />, { wrapper: CustomDialogProvider });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open confirmation dialog/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName(/mock dialog title/i);
    expect(dialog).toHaveAccessibleDescription(/mock description/i);

    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    await user.click(confirmButton);

    expect(onConfirmMock).toBeCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /cancel/i }));
    await waitForElementToBeRemoved(screen.queryByRole("dialog"));
  });
});
