import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Stack, Typography } from "@mui/material";
import useGetUser from "features/common/hooks/useGetUser";
import { LOGIN_USER } from "features/common/libs/apollo/user";
import useSnackbar from "../useSnackbar";

const useLoginUser = () => {
  const { openSnackbar, closeSnackbar } = useSnackbar();
  const { login } = useGetUser();
  const navigate = useNavigate();

  return useMutation(LOGIN_USER, {
    update(_, { data }) {
      openSnackbar({
        alertSeverity: "success",
        alertTitle: "Successfully Sign In",
        alertContent: "Now you can start working",
        alertAction: false,
      });

      login(data?.loginUser);
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
