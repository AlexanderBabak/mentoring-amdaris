import { FC, PropsWithChildren } from "react";
import { Stack, StackProps } from "@mui/material";

const MainWrapper: FC<PropsWithChildren<{ bgcolor?: StackProps["bgcolor"] }>> = ({ bgcolor, children }) => (
  <Stack
    component="main"
    flex={1}
    overflow="auto"
    bgcolor={bgcolor ? bgcolor : (theme) => theme.palette.background.blue}
  >
    {children}
  </Stack>
);

export default MainWrapper;
