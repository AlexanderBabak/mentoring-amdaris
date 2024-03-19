import { FC, ReactNode, useCallback, useState } from "react";
import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonProps,
  CircularProgress,
  Breakpoint,
} from "@mui/material";

interface ConfirmButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  [key: `data-${string}`]: unknown;
  onConfirm: () => void | Promise<void>;
  autoClose: boolean;
  displayText: string;
}

type DialogType = "confirm" | "form";

export interface CustomDialogProps {
  type?: DialogType;
  maxWidth?: Breakpoint;
  open: boolean;
  title: string;
  description?: ReactNode;
  closeButtonText?: string;
  confirmButtonProps?: Partial<ConfirmButtonProps>;
  onClose: () => void;
}

const confirmActionProps: Partial<ButtonProps> = {
  variant: "text",
  color: "secondary",
  sx: { letterSpacing: 1.25 },
};

const cancelFormActionProps: Partial<ButtonProps> = {
  variant: "outlined",
  color: "primary",
  sx: {
    width: "240px",
    paddingY: 1,
  },
};

const submitFormActionProps: Partial<ButtonProps> = {
  variant: "contained",
  color: "primary",
  sx: {
    width: "240px",
    paddingY: 1,
  },
};

const CustomDialog: FC<CustomDialogProps> = ({
  type = "confirm",
  maxWidth,
  open,
  title,
  description,
  closeButtonText,
  confirmButtonProps,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);

    try {
      if (confirmButtonProps?.onConfirm) {
        await confirmButtonProps?.onConfirm();
      }
      if (confirmButtonProps?.autoClose) {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  }, [confirmButtonProps, onClose]);

  return (
    <MuiDialog
      disableRestoreFocus
      fullWidth
      maxWidth={maxWidth ?? "sm"}
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title" variant="h1" sx={{ color: (theme) => theme.palette.common.black }}>
        {title}
      </DialogTitle>

      {description ? (
        <DialogContent
          id="confirm-dialog-description"
          sx={{
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {description}
        </DialogContent>
      ) : null}

      <DialogActions
        sx={
          type === "form"
            ? {
                display: "flex",
                justifyContent: "center",
                padding: 3,
              }
            : null
        }
      >
        <Button {...confirmActionProps} {...(type === "form" && { ...cancelFormActionProps })} onClick={onClose}>
          {closeButtonText ?? "Cancel"}
        </Button>

        {confirmButtonProps ? (
          <Button
            {...confirmActionProps}
            {...(type === "form" && { ...submitFormActionProps })}
            data-testid={confirmButtonProps?.["data-testid"]}
            onClick={handleConfirm}
            startIcon={isLoading ? <CircularProgress size="0.8rem" /> : null}
            disabled={isLoading}
          >
            {confirmButtonProps.displayText || "Confirm"}
          </Button>
        ) : null}
      </DialogActions>
    </MuiDialog>
  );
};

export default CustomDialog;
