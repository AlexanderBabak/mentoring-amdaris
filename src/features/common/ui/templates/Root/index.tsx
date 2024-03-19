import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "@fontsource/source-sans-pro";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { CustomDialogProvider } from "../../../hooks/useCustomDialog";
import { UserProvider } from "../../../hooks/useGetUser";
import { SnackbarProvider } from "../../../hooks/useSnackbar";
import client from "../../../libs/apollo/apolloClient";
import { useTheme } from "../../../libs/theme";
import Loading from "../../atoms/Loading/Loading";
import NavBar from "../../organisms/Navbar";
import ErrorFallbackPage from "../../pages/ErrorFallbackPage";

const Root = () => {
  const { theme } = useTheme();

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
            <SnackbarProvider>
              <CustomDialogProvider>
                <Suspense fallback={<Loading />}>
                  <Stack sx={{ height: "100vh" }}>
                    <NavBar />
                    <Outlet />
                  </Stack>
                </Suspense>
              </CustomDialogProvider>
            </SnackbarProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </UserProvider>
    </ApolloProvider>
  );
};

export default Root;
