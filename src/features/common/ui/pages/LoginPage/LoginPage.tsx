import { Box, Typography } from "@mui/material";
import AuthNavigation from "features/common/ui/molecules/AuthNavigation";
import AuthWrapper from "features/common/ui/organisms/AuthWrapper";
import LoginForm from "features/common/ui/organisms/LoginForm";

const LoginPage = () => {
  return (
    <AuthWrapper>
      <Box marginBottom={4}>
        <Typography variant="h1" fontSize="2rem">
          Sign In
        </Typography>
        <Typography variant="h2" sx={{ color: (theme) => theme.palette.grey[400] }}>
          Thanks to come back on Amdaris Marketplace
        </Typography>
      </Box>

      <LoginForm />
      <AuthNavigation title="Don’t you have an account?" linkText="Sign Up" linkTo="/register" />
    </AuthWrapper>
  );
};
export default LoginPage;
