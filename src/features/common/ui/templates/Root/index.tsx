import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import "@fontsource/source-sans-pro";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useTheme } from "../../../libs/theme";
import Loading from "../../atoms/Loading";
import ErrorFallbackPage from "../../pages/ErrorFallbackPage";

const Root = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default Root;
