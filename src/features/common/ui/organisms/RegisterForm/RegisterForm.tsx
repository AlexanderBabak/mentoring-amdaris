import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import useSnackbar from "../../../hooks/useSnackbar";
import { RegisterCompleteParams } from "../../../types/auth";
import InputStyled from "../../atoms/InputStyled";

const RegisterForm = () => {
  const { openSnackbar, closeSnackbar } = useSnackbar();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterCompleteParams>();

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
      <Box display="flex" gap={3}>
        <InputStyled
          label="Name"
          error={!!errors?.name}
          helperText={errors?.name ? errors?.name.message : " "}
          validation={{
            ...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            }),
          }}
        />
        <InputStyled
          label="Lastname"
          error={!!errors?.lastName}
          helperText={errors?.lastName ? errors?.lastName.message : " "}
          validation={{
            ...register("lastName", {
              required: "Surname is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            }),
          }}
        />
      </Box>

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
        label="Repeat Password"
        type="password"
        error={!!errors?.repeatPassword}
        helperText={errors?.repeatPassword ? errors?.repeatPassword.message : " "}
        validation={{
          ...register("repeatPassword", {
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
