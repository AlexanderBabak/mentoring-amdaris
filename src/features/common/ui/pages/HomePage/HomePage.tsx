import { Container, Stack, Typography } from "@mui/material";
import useGetUser from "features/common/hooks/useGetUser";

const HomePage = () => {
  const { user, isAdmin } = useGetUser();

  return (
    <Stack height="100vh" justifyContent="center" textAlign="center">
      <Container>
        <Typography variant="h2">YOU LOGGED AS</Typography>
        <Typography variant="h1">{user?.username}</Typography>
        <Typography variant="h1">{user?.email}</Typography>
        <Typography variant="h1">{`isAdmin - ${isAdmin}`}</Typography>
      </Container>
    </Stack>
  );
};

export default HomePage;
