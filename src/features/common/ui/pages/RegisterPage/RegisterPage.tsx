import { Box, Typography } from "@mui/material";
import AuthNavigation from "../../molecules/AuthNavigation";
import AuthWrapper from "../../organisms/AuthWrapper";
import RegisterForm from "../../organisms/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthWrapper>
      <Box marginBottom={4}>
        <Typography variant="h1" fontSize="2rem">
          Sign Up
        </Typography>
        <Typography variant="h2" sx={{ color: (theme) => theme.palette.grey[400] }}>
          Please register to use Amdaris Marketplace
        </Typography>
      </Box>

      <RegisterForm />
      <AuthNavigation title="Do you have an account?" linkText="Sign In" linkTo="/login" />
    </AuthWrapper>
  );
};
export default RegisterPage;
