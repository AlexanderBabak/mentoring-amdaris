import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "features/common/hooks/useGetUser";

export const AuthProvider = () => {
  const token = localStorage.getItem("token");
  const { user } = useGetUser();

  if (token || user) {
    return <Navigate to="home" replace />;
  }
  return <Outlet />;
};

export const PrivateRoutesProvider = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
