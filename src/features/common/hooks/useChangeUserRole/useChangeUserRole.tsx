import React from "react";
import { SetURLSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Button, Stack, Typography } from "@mui/material";
import { CHANGE_USER_ROLE } from "features/common/libs/apollo/user";
import useSnackbar from "../useSnackbar";

const useChangeUserRole = (setSearchParams: SetURLSearchParams) => {
  const { openSnackbar, closeSnackbar } = useSnackbar();

  return useMutation(CHANGE_USER_ROLE, {
    update() {
      setSearchParams("");
      openSnackbar({
        alertSeverity: "success",
        alertTitle: "Role successfully changed",
        alertContent: "Now you can proceed working",
        alertAction: false,
      });
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors.length > 0) {
        openSnackbar({
          alertSeverity: "error",
          alertTitle: "Unable to change user role",
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

export default useChangeUserRole;
