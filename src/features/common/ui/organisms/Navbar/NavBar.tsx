import { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { AuthContext } from "../../../libs/context/authContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    // TODO: dialog here
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h1" component="div">
            <RouterLink to="/" style={{ textDecoration: "none", color: "white" }}>
              AmdarisBabak
            </RouterLink>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
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
