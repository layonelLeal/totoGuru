import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import HomeLayout from "../layouts/HomeLayout";
import ProtectedRouts from "../layouts/ProtectedRouts";
import App from "../pages/app/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/app",
        element: <ProtectedRouts />,
        children: [{ index: true, element: <App /> }],
      },
    ],
  },
]);

export default function Routs() {
  return <RouterProvider router={router} />;
}
