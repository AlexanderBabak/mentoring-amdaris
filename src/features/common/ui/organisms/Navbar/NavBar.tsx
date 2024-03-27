import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Settings, MonetizationOn, Archive } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import useCustomDialog from "features/common/hooks/useCustomDialog";
import useGetUser from "features/common/hooks/useGetUser/useGetUser";
import { useTheme } from "features/common/libs/theme";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout, featureToggle } = useGetUser();
  const { openDialog, closeDialog } = useCustomDialog();
  const { theme } = useTheme();

  const handleLogout = () => {
    openDialog({
      title: "Are you sure to logout?",
      description: (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
          <Typography>Only authorized users can have access to the list of products on our marketplace.</Typography>
        </Box>
      ),
      confirmButtonProps: {
        "data-testid": "logout-confirm-button",
        displayText: "Logout",
        onConfirm: () => {
          logout();
          closeDialog();
          navigate("/");
        },
      },
    });
  };

  return (
    <AppBar position="static">
      <Container fixed maxWidth="xl">
        <Toolbar>
          <Typography variant="h1" component="div">
            <RouterLink to={user ? "home" : "/"} style={{ textDecoration: "none", color: "white" }}>
              <Stack flexDirection="row" gap={1} alignItems="center">
                <ShoppingBag />
                AMDARIS MARKETPLACE
              </Stack>
            </RouterLink>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <>
                {featureToggle?.showSales && (
                  <Tooltip title="Sales">
                    <IconButton onClick={() => navigate("/sales")}>
                      <MonetizationOn sx={{ color: theme.palette.primary.contrastText }} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                )}

                {featureToggle?.showOldCollection && (
                  <Tooltip title="Old Collection">
                    <IconButton onClick={() => navigate("/old-collection")}>
                      <Archive sx={{ color: theme.palette.primary.contrastText }} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                )}

                {isAdmin && (
                  <Tooltip title="Settings">
                    <IconButton
                      onClick={() => {
                        navigate("/settings");
                      }}
                      sx={{ marginRight: 1 }}
                    >
                      <Settings sx={{ color: theme.palette.primary.contrastText }} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                )}

                <Button
                  data-testid="logout"
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: (theme) => theme.palette.common.white,
                    "&:hover": (theme) => ({
                      backgroundColor: theme.palette.common.white,
                    }),
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  data-testid="sign-in"
                  variant="outlined"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    backgroundColor: (theme) => theme.palette.common.white,
                    "&:hover": (theme) => ({
                      backgroundColor: theme.palette.common.white,
                    }),
                    marginRight: 1,
                  }}
                >
                  Sign IN
                </Button>
                <Button
                  data-testid="sign-up"
                  variant="outlined"
                  component={RouterLink}
                  to="/register"
                  sx={{
                    backgroundColor: (theme) => theme.palette.common.white,
                    "&:hover": (theme) => ({
                      backgroundColor: theme.palette.common.white,
                    }),
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
