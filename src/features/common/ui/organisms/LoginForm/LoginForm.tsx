import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { LoginInput } from "../../../../../__generated__/graphql";
import useLoginUser from "../../../hooks/useLoginUser";
import InputStyled from "../../atoms/InputStyled";

const LoginForm = () => {
  const [loginUser, { loading }] = useLoginUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>();

  const handleLoginSubmit = (values: LoginInput) => {
    loginUser({ variables: { loginInput: values } });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)} marginBottom={4} maxWidth={400}>
      <InputStyled
        label="Email"
        error={!!errors?.email}
        helperText={errors?.email ? errors?.email.message : " "}
        validation={{
          ...register("email", {
            required: "Email is required",
            pattern: {
              value:
                // eslint-disable-next-line no-useless-escape
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              message: "Invalid email",
            },
          }),
        }}
      />

      <InputStyled
        label="Password"
        type="password"
        error={!!errors?.password}
        helperText={errors?.password ? errors?.password.message : " "}
        validation={{
          ...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          }),
        }}
      />

      <Stack>
        <Button type="submit" variant="contained" disabled={loading} sx={{ padding: 1.5 }} data-testid="login-button">
          {loading ? <CircularProgress color="inherit" size={20} /> : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
