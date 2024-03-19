import { FC, PropsWithChildren } from "react";
import { Box, Stack } from "@mui/material";

const AuthWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Stack
    sx={{
      bgcolor: (theme) => theme.palette.primary.contrastText,
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
