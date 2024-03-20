import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

export const AuthProvider = () => {
  const { user } = useGetUser();

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export const PrivateRoutesProvider = () => {
  const { user } = useGetUser();

  if (!user) {
    return <Navigate to="start" replace />;
  }
  return <Outlet />;
};
