import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";

type LinkStyledProps = {
  linkText: string;
  linkTo: string;
};

const LinkStyled = ({ linkText, linkTo, ...restProps }: LinkStyledProps) => {
  const { palette, typography } = useTheme();

  const styles = {
    link: {
      textDecoration: "none",
      color: palette.text.secondary,
      ...typography.h2,
    },
  };
  return (
    <Link to={linkTo} style={styles.link} {...restProps}>
      {linkText}
    </Link>
  );
};

export default LinkStyled;
