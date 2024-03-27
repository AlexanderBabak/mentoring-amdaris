import { Box, Button } from "@mui/material";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useSnackbar, { SnackbarProvider } from "./useSnackbar";

describe("useSnackbar", () => {
  it("should be opened and closed after the user clicks", async () => {
    const MockComponent = () => {
      const { openSnackbar, closeSnackbar } = useSnackbar();

      const handleOpenSnackbar = () =>
        openSnackbar({
          alertSeverity: "success",
          alertTitle: "mock snackbar title",
          alertContent: "mock snackbar content",
        });

      return (
        <Box>
          <Button onClick={handleOpenSnackbar}>Open snackbar</Button>
          <Button onClick={closeSnackbar}>Close snackbar</Button>
        </Box>
      );
    };

    const user = userEvent.setup();

    render(<MockComponent />, { wrapper: SnackbarProvider });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open snackbar/i }));

    const snackbar = screen.getByRole("alert");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveTextContent(/mock snackbar title/i);
    expect(snackbar).toHaveTextContent(/mock snackbar content/i);

    await user.click(screen.getByRole("button", { name: /close snackbar/i }));
    await waitForElementToBeRemoved(() => screen.queryByRole("alert"));
  });
});
