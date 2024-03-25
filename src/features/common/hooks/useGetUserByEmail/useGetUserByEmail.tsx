import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Button, Stack, Typography } from "@mui/material";
import { GET_USER_BY_EMAIL } from "../../libs/apollo/user";
import useSnackbar from "../useSnackbar";

const useGetUserByEmail = (searchTerm: string, setRole: Dispatch<SetStateAction<string>>) => {
  const { openSnackbar, closeSnackbar } = useSnackbar();

  return useQuery(GET_USER_BY_EMAIL, {
    variables: { email: searchTerm },
    fetchPolicy: searchTerm ? "cache-and-network" : "standby",
    onCompleted({ getUserByEmail }) {
      if (getUserByEmail?.role) {
        setRole(getUserByEmail?.role);
      }
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors.length > 0) {
        openSnackbar({
          alertSeverity: "error",
          alertTitle: "Unable to find user",
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

export default useGetUserByEmail;
