import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Settings } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import useCustomDialog from "../../../hooks/useCustomDialog";
import useGetUser from "../../../hooks/useGetUser/useGetUser";
import { useTheme } from "../../../libs/theme";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useGetUser();
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
            <RouterLink to="/" style={{ textDecoration: "none", color: "white" }}>
              <Stack flexDirection="row" gap={1} alignItems="center">
                <ShoppingBag />
                AMDARIS MARKETPLACE
              </Stack>
            </RouterLink>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <>
                {isAdmin && (
                  <IconButton
                    onClick={() => {
                      navigate("/settings");
                    }}
                    sx={{ marginRight: 1 }}
                  >
                    <Settings sx={{ color: theme.palette.primary.contrastText }} fontSize="large" />
                  </IconButton>
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
