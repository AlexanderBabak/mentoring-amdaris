import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Stack, Typography } from "@mui/material";
import { LOGIN_USER } from "../../libs/apollo/user";
import { AuthContext } from "../../libs/context/authContext";
import useSnackbar from "../useSnackbar";

const useLoginUser = () => {
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      openSnackbar({
        alertSeverity: "success",
        alertTitle: "Successfully Sign In",
        alertContent: "Now you can start working",
        alertAction: false,
      });

      login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors.length > 0) {
        openSnackbar({
          alertSeverity: "error",
          alertTitle: "Unable to Sign In",
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
};

export default useLoginUser;
