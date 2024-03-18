import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import useSnackbar from "../../../hooks/useSnackbar";
import { RegisterParams } from "../../../types/auth";
import InputStyled from "../../atoms/InputStyled";

const RegisterForm = () => {
  const { openSnackbar, closeSnackbar } = useSnackbar();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterParams>();

  const password = useRef({});
  password.current = watch("password", "");

  const handleLoginSubmit = () => {};

  const isLoading = false; // TODO: fix
  const isSuccess = false; // TODO: fix
  const isError = false; // TODO: fix

  useEffect(() => {
    if (isError) {
      openSnackbar({
        alertSeverity: "error",
        alertTitle: "Unable to register",
        alertContent: (
          <Stack rowGap={0.25}>
            <Typography>Registration error. Please try again.</Typography>
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
        alertTitle: "Successfully Sign Up",
        alertContent: "Now you can start working",
        alertAction: false,
      });
    }

    return () => closeSnackbar();
  }, [closeSnackbar, openSnackbar, isError, isSuccess]);

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)} marginBottom={4}>
      <InputStyled
        label="Name"
        error={!!errors?.username}
        helperText={errors?.username ? errors?.username.message : " "}
        validation={{
          ...register("username", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters",
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

      <InputStyled
        label="Confirm Password"
        type="password"
        error={!!errors?.confirmPassword}
        helperText={errors?.confirmPassword ? errors?.confirmPassword.message : " "}
        validation={{
          ...register("confirmPassword", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
            validate: (value) => value === password.current || "The passwords do not match",
          }),
        }}
      />

      <Stack>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{ padding: 1.5 }}
          data-testid="register-button"
        >
          {isLoading ? <CircularProgress color="inherit" size={20} /> : "Create an account"}
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
