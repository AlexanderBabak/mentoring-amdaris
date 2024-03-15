import { FC, PropsWithChildren } from "react";
import { Box, Stack } from "@mui/material";

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Stack
    sx={{
      bgcolor: (theme) => theme.palette.primary.main,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      placeItems: "center",
    }}
  >
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.primary.contrastText,
        borderRadius: 2,
        p: 6,
      }}
    >
      {children}
    </Box>
  </Stack>
);

export default AuthWrapper;
