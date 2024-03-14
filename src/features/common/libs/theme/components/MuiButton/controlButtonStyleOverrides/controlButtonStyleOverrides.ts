import { CSSObject, Theme } from "@mui/material";
import * as THEME_CONSTANTS from "../../../constants";

const controlButtonStyles = (theme: Theme): CSSObject => ({
  color: THEME_CONSTANTS.BLUE_OCEAN,
  textTransform: "initial",
  fontWeight: 400,
  letterSpacing: "initial",
  fontSize: "1rem",
  "&[disabled] .MuiButton-startIcon svg path": {
    fill: theme.palette.text.disabled,
  },
  "&[disabled] .MuiButton-endIcon svg path[stroke]": {
    stroke: theme.palette.text.disabled,
  },
});

export default controlButtonStyles;
