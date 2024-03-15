import React from "react";
import { TextField, styled, CSSObject } from "@mui/material";

const Input = styled(TextField)(({ theme }): CSSObject => {
  return {
    ".MuiInputBase-root": { borderRadius: "8px" },
    ".MuiInputBase-input, .MuiFormLabel-root": {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.primary,
      lineHeight: "18px",
    },
    ".Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.text.primary,
    },
    ".MuiFormHelperText-root": {
      marginBottom: "10px",
    },
  };
});

type InputProps = {
  type?: string;
  size?: "small" | "medium" | undefined;
  helperText?: string | undefined;
  fullWidth?: boolean;
  color?: "error" | "info" | "primary" | "secondary" | "success" | "warning" | undefined;
  validation?: any;
  label: string;
  error?: boolean | undefined;
};

const InputStyled = ({
  type = "text",
  size = "medium",
  helperText = " ",
  fullWidth = true,
  color = "primary",
  validation,
  ...restProps
}: InputProps) => {
  return (
    <Input
      type={type}
      size={size}
      color={color}
      fullWidth={fullWidth}
      helperText={helperText}
      {...restProps}
      {...validation}
    />
  );
};

export default InputStyled;
