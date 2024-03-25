import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import HomePage from "../ui/pages/HomePage";
import LoginPage from "../ui/pages/LoginPage";
import OldCollectionPage from "../ui/pages/OldCollectionPage";
import RegisterPage from "../ui/pages/RegisterPage";
import SalesPage from "../ui/pages/SalesPage";
import SettingsPage from "../ui/pages/SettingsPage";
import StartPage from "../ui/pages/StartPage";
import Root from "../ui/templates/Root";
import { AuthProvider, PrivateRoutesProvider } from "./routeProviders";

const showOldCollection = JSON.parse(localStorage.getItem("featureToggle") || "").showOldCollection;
const showSales = JSON.parse(localStorage.getItem("featureToggle") || "").showSales;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route element={<PrivateRoutesProvider />}>
        <Route path="home" element={<HomePage />} />
        <Route path="settings" element={<SettingsPage />} />
        {showOldCollection && <Route path="old-collection" element={<OldCollectionPage />} />}
        {showSales && <Route path="sales" element={<SalesPage />} />}
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
