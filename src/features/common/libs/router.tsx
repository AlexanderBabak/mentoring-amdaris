import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../ui/pages/HomePage";
import LoginPage from "../ui/pages/LoginPage";
import Root from "../ui/templates/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "test", element: <div>Test</div> },
      { path: "/login", element: <LoginPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
      { index: true, element: <HomePage /> },
    ],
  },
]);

export default router;
