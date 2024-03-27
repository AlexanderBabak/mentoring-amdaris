import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import HomePage from "features/common/ui/pages/HomePage";
import LoginPage from "features/common/ui/pages/LoginPage";
import OldCollectionPage from "features/common/ui/pages/OldCollectionPage";
import RegisterPage from "features/common/ui/pages/RegisterPage";
import SalesPage from "features/common/ui/pages/SalesPage";
import SettingsPage from "features/common/ui/pages/SettingsPage";
import StartPage from "features/common/ui/pages/StartPage";
import Root from "features/common/ui/templates/Root";
import { AuthProvider, PrivateRoutesProvider } from "./routeProviders";

const featureToggle = JSON.parse(localStorage.getItem("featureToggle") || "{}");
const showOldCollection = featureToggle.showOldCollection || false;
const showSales = featureToggle.showSales || false;

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
