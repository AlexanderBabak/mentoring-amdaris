import { Container } from "@mui/material";
import useGetUser from "../../../hooks/useGetUser";

const HomePage = () => {
  const { user, isAdmin } = useGetUser();
  return (
    <Container>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
      <div>{user?.role}</div>
      <div>{`${isAdmin}`}</div>
    </Container>
  );
};

export default HomePage;
