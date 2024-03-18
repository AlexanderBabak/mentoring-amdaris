import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "@fontsource/source-sans-pro";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "../../../hooks/useSnackbar";
import client from "../../../libs/apollo/apolloClient";
import { AuthProvider } from "../../../libs/context/authContext";
import { useTheme } from "../../../libs/theme";
import Loading from "../../atoms/Loading/Loading";
import ErrorFallbackPage from "../../pages/ErrorFallbackPage";

const Root = () => {
  const { theme } = useTheme();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
            <SnackbarProvider>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </SnackbarProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default Root;
