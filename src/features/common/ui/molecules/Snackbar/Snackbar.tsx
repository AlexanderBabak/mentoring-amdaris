import React, { FC, ReactNode } from "react";
import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material";

export interface SnackbarProps extends Omit<MuiSnackbarProps, "onClose"> {
  onClose: (event: Event | React.SyntheticEvent<any, Event>) => void;
  alertSeverity?: AlertColor;
  alertVariant?: "filled" | "standard" | "outlined";
  alertTitle?: string;
  alertContent: ReactNode;
  alertAction?: ReactNode;
}

const Snackbar: FC<SnackbarProps> = ({
  open,
  onClose,
  alertSeverity,
  autoHideDuration = 10000,
  anchorOrigin = {
    horizontal: "right",
    vertical: "bottom",
  },
  alertVariant = "filled",
  alertTitle,
  alertContent,
  alertAction,
  ClickAwayListenerProps,
  ...props
}) => {
  return (
    <MuiSnackbar
      data-testid="snackbar"
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      ClickAwayListenerProps={ClickAwayListenerProps}
      {...props}
    >
      <Alert
        data-testid={alertSeverity}
        onClose={onClose}
        severity={alertSeverity}
        sx={{ color: (theme) => theme.palette.common.white, alignItems: "center" }}
        variant={alertVariant}
        action={alertAction}
      >
        {!!alertTitle && <AlertTitle sx={{ fontWeight: 700, mb: 0 }}>{alertTitle}</AlertTitle>}

        {alertContent}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
