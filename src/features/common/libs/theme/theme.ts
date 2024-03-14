import { ThemeOptions } from "@mui/material";
import controlButtonStyles from "./components/MuiButton/controlButtonStyleOverrides";
import * as THEME_CONSTANTS from "./constants";

const customTheme: ThemeOptions = {
  palette: {
    background: {
      blue: THEME_CONSTANTS.BACKGROUND_BLUE,
      limeGreen: THEME_CONSTANTS.BACKGROUND_LIME_GREEN,
      blueWashed: THEME_CONSTANTS.BACKGROUND_BLUE_WASHED,
      error: THEME_CONSTANTS.BACKGROUND_ERROR,
      yellow: THEME_CONSTANTS.BACKGROUND_YELLOW,
      lightYellow: THEME_CONSTANTS.BACKGROUND_LIGHT_YELLOW,
      cyanMist: THEME_CONSTANTS.BACKGROUND_BLUE_CYAN_MIST,
      coolMint: THEME_CONSTANTS.BACKGROUND_BLUE_COOL_MINT,
      beige: THEME_CONSTANTS.BACKGROUND_BEIGE,
    },
    text: {
      primary: THEME_CONSTANTS.PRIMARY_NAVY_BLUE,
      secondary: THEME_CONSTANTS.INFO_CERULEAN,
      disabled: THEME_CONSTANTS.GREY_04,
    },
    primary: {
      main: THEME_CONSTANTS.PRIMARY_NAVY_BLUE,
      contrastText: THEME_CONSTANTS.WHITE,
    },
    secondary: {
      main: THEME_CONSTANTS.INFO_CERULEAN,
      contrastText: THEME_CONSTANTS.WHITE,
    },
    error: {
      light: THEME_CONSTANTS.ERROR_PINK,
      main: THEME_CONSTANTS.ERROR_FUCHIA,
    },
    info: {
      light: THEME_CONSTANTS.BLUE_ARCTIC,
      main: THEME_CONSTANTS.INFO_CERULEAN,
      dark: THEME_CONSTANTS.BLUE_OCEAN,
    },
    success: {
      main: THEME_CONSTANTS.SUCCESS_PARAKEET,
    },
    warning: {
      dark: THEME_CONSTANTS.ORANGE_PRINCETON,
      main: THEME_CONSTANTS.WARNING_PEEL,
    },
    grey: {
      100: THEME_CONSTANTS.GREY_01,
      200: THEME_CONSTANTS.GREY_02,
      300: THEME_CONSTANTS.GREY_03,
      400: THEME_CONSTANTS.GREY_04,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          fontSize: THEME_CONSTANTS.BASE_FONT_SIZE,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontSize: "0.875rem",
          letterSpacing: 1.25,
          ...(ownerState.variant === "control" && controlButtonStyles(theme)),
        }),
        sizeSmall: {
          fontSize: "1rem",
          letterSpacing: "initial",
        },
        outlinedPrimary: ({ theme }) => ({
          padding: `${theme.spacing(1.25)} ${theme.spacing(2.5)}`,
          lineHeight: 1,
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.25rem",
          ".MuiTouchRipple-root .MuiTouchRipple-child": {
            borderRadius: "inherit",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Source Sans Pro, Arial",
    h1: { fontSize: "1.2857rem", fontWeight: 700, lineHeight: 1.389 },
    h2: { fontSize: "1.1429rem", fontWeight: 300, lineHeight: 1.5625 },
    h3: { fontSize: "1rem", lineHeight: 1.7857 },
    body1: { lineHeight: 1.4286 },
    button: { fontSize: "1rem", fontWeight: 700, lineHeight: 1.3333 },
    caption: { fontSize: "0.7143rem", lineHeight: 1.6 },
    overline: { fontSize: "0.7143rem", lineHeight: 1.6 },
  },
};

export default customTheme;
