import { useMemo } from "react";
import { createTheme } from "@mui/material";
import customTheme from "./theme";

const useTheme = () => {
  const theme = useMemo(() => createTheme(customTheme), []);

  return {
    theme,
  };
};

export default useTheme;
