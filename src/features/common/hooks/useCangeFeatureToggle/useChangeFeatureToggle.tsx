import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Stack, Typography } from "@mui/material";
import { CHANGE_FEATURE_TOGGLE, GET_FEATURE_TOGGLE } from "features/common/libs/apollo/featureToggle";
import useSnackbar from "../useSnackbar";

const useChangeFeatureToggle = () => {
  const { openSnackbar, closeSnackbar } = useSnackbar();

  return useMutation(CHANGE_FEATURE_TOGGLE, {
    update() {
      openSnackbar({
        alertSeverity: "success",
        alertTitle: "Feature toggle successfully changed",
        alertContent: "Now you can proceed working",
        alertAction: false,
      });
    },
    refetchQueries: [{ query: GET_FEATURE_TOGGLE }],
    onError({ graphQLErrors }) {
      if (graphQLErrors.length > 0) {
        openSnackbar({
          alertSeverity: "error",
          alertTitle: "Unable to change feature toggle",
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

export default useChangeFeatureToggle;
