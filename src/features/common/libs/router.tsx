import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../ui/pages/HomePage";
import LoginPage from "../ui/pages/LoginPage";
import RegisterPage from "../ui/pages/RegisterPage";
import SettingsPage from "../ui/pages/SettingsPage";
import StartPage from "../ui/pages/StartPage";
import Root from "../ui/templates/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/settings", element: <SettingsPage /> },
      { path: "/start", element: <StartPage /> },

      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },

      { path: "*", element: <Navigate to="/" replace /> },
      { index: true, element: <HomePage /> },
    ],
  },
]);

export default router;
