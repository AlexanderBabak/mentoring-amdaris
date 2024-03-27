import { FC, PropsWithChildren } from "react";
import { Box, Stack } from "@mui/material";
import { BACKGROUND_GRADIENT } from "features/common/libs/theme";

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Stack
    sx={{
      backgroundImage: BACKGROUND_GRADIENT,
      flexGrow: 1,
      justifyContent: "center",
      placeItems: "center",
    }}
  >
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.background.blue,
        borderRadius: 2,
        border: "1px solid",
        borderColor: (theme) => theme.palette.primary.main,
        p: 6,
      }}
    >
      {children}
    </Box>
  </Stack>
);

export default AuthWrapper;
