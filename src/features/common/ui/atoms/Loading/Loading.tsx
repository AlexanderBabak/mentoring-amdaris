import { FC } from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

interface LoadingProps {
  size?: number;
  sx?: SxProps<Theme>;
}

const Loading: FC<LoadingProps> = ({ size, sx }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      ...sx,
    }}
  >
    <CircularProgress size={size} />
  </Box>
);

export default Loading;
