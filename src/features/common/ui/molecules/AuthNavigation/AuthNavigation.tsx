import { Box, Typography } from "@mui/material";
import LinkStyled from "features/common/ui/atoms/LinkStyled";

type AuthNavigationProps = {
  title: string;
  linkText: string;
  linkTo: string;
};

const AuthNavigation = ({ title, linkText, linkTo }: AuthNavigationProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h2" marginRight={1}>
        {title}
      </Typography>
      <LinkStyled linkText={linkText} linkTo={linkTo} />
    </Box>
  );
};

export default AuthNavigation;
