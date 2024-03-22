import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import HomePage from "../ui/pages/HomePage";
import LoginPage from "../ui/pages/LoginPage";
import RegisterPage from "../ui/pages/RegisterPage";
import SettingsPage from "../ui/pages/SettingsPage";
import StartPage from "../ui/pages/StartPage";
import Root from "../ui/templates/Root";
import { AuthProvider, PrivateRoutesProvider } from "./routeProviders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route element={<PrivateRoutesProvider />}>
        <Route path="home" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route element={<AuthProvider />}>
        <Route index={true} element={<StartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Route>,
  ),
);

export default router;
