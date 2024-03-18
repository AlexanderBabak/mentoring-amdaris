import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import useSnackbar from "../../../hooks/useSnackbar";
import { REGISTER_USER } from "../../../libs/apollo/user";
import { AuthContext } from "../../../libs/context/authContext";
import { RegisterParams } from "../../../types/auth";
import InputStyled from "../../atoms/InputStyled";

const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterParams>();
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch("password", "");

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      openSnackbar({
        alertSeverity: "success",
        alertTitle: "Successfully Sign Up",
        alertContent: "Now you can start working",
        alertAction: false,
      });

      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors.length > 0) {
        openSnackbar({
          alertSeverity: "error",
          alertTitle: "Unable to register",
          alertContent: (
            <Stack rowGap={0.25}>
              <Typography>{graphQLErrors[0].message}</Typography>
              <Typography>Please try again</Typography>
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
    },
  });

  const handleLoginSubmit = (values: RegisterParams) => {
    registerUser({ variables: { registerInput: values } });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)} marginBottom={4} maxWidth={400}>
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
          disabled={loading}
          sx={{ padding: 1.5 }}
          data-testid="register-button"
        >
          {loading ? <CircularProgress color="inherit" size={20} /> : "Create an account"}
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
