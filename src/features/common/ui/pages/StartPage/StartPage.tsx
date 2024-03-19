import { Box, Stack, Typography } from "@mui/material";
import { BACKGROUND_GRADIENT, MAIN_TEXT_GRADIENT, TEXT_GRADIENT, useTheme } from "../../../libs/theme";

const gradientMainStyle = {
  backgroundImage: MAIN_TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const gradientStyle = {
  backgroundImage: TEXT_GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const StartPage = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        backgroundImage: BACKGROUND_GRADIENT,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        placeItems: "center",
      }}
    >
      <Stack color={theme.palette.grey[300]} alignItems="center" marginTop={-10}>
        <Typography variant="h1" fontSize={40} fontWeight={700}>
          WELCOME TO
          <Typography
            component="span"
            variant="h1"
            fontSize={40}
            fontWeight={700}
            marginLeft={2}
            sx={gradientMainStyle}
          >
            AMDARIS MARKETPLACE
          </Typography>
        </Typography>
        <Typography variant="h1" sx={gradientStyle}>
          This is the place where you can buy everything you need
        </Typography>
      </Stack>
    </Box>
  );
};

export default StartPage;
