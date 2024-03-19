import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import useGetUser from "../../../hooks/useGetUser";

const HomePage = () => {
  const { user, isAdmin } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/start", { replace: true });
    }
  }, [navigate, user]);

  return (
    <Container>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
      <div>{user?.role}</div>
      <div>{user?.role && `${isAdmin}`}</div>
    </Container>
  );
};

export default HomePage;
