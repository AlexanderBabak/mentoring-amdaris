import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "@fontsource/source-sans-pro";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { CustomDialogProvider } from "features/common/hooks/useCustomDialog";
import { UserProvider } from "features/common/hooks/useGetUser";
import { SnackbarProvider } from "features/common/hooks/useSnackbar";
import client from "features/common/libs/apollo/apolloClient";
import { useTheme } from "features/common/libs/theme";
import Loading from "features/common/ui/atoms/Loading/Loading";
import NavBar from "features/common/ui/organisms/Navbar";
import ErrorFallbackPage from "features/common/ui/pages/ErrorFallbackPage";

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
