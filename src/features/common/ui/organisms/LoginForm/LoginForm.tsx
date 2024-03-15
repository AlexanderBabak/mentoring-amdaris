import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import useSnackbar from "../../../hooks/useSnackbar";
import { LoginParams } from "../../../types/auth";
import InputStyled from "../../atoms/InputStyled";

const LoginForm = () => {
  const { openSnackbar, closeSnackbar } = useSnackbar();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginParams>();

  const handleLoginSubmit = () => {};

  const isLoading = false; // TODO: fix
  const isSuccess = false; // TODO: fix
  const isError = false; // TODO: fix

  useEffect(() => {
    if (isError) {
      openSnackbar({
        alertSeverity: "error",
        alertTitle: "Unable to Log In",
        alertContent: (
          <Stack rowGap={0.25}>
            <Typography>Authorization error. Please try again.</Typography>
          </Stack>
        ),
        alertAction: (
          <Button sx={{ color: (theme) => theme.palette.common.white }} onClick={closeSnackbar}>
            Okay
          </Button>
        ),
        ClickAwayListenerProps: {
          onClickAway: (event) => event.preventDefault(),
        },
        autoHideDuration: null,
      });
    }

    if (isSuccess) {
      openSnackbar({
        alertSeverity: "success",
        alertTitle: "Successfully Log In",
        alertContent: "Now you can continue working",
        alertAction: false,
      });
    }

    return () => closeSnackbar();
  }, [closeSnackbar, openSnackbar, isError, isSuccess]);

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)} marginBottom={4}>
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
        <Button type="submit" variant="contained" disabled={isLoading} sx={{ padding: 1.5 }} data-testid="login-button">
          {isLoading ? <CircularProgress color="inherit" size={20} /> : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
