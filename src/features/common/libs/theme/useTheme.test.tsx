import { ThemeProvider } from "@mui/material";
import { renderHook } from "@testing-library/react";
import theme from "./theme";
import useTheme from "./useTheme";

describe("useTheme", () => {
  it("returns theme object", () => {
    const {
      result: { current },
    } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    });

    expect(current.theme).toMatchObject(theme);
  });
});
