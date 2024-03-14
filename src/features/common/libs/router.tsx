import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../ui/pages/HomePage";
import Root from "../ui/templates/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "test", element: <div>Test</div> },
      { path: "*", element: <Navigate to="/" replace /> },
      { index: true, element: <HomePage /> },
    ],
  },
]);

export default router;
