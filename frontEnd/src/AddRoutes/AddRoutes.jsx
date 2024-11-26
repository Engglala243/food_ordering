import {
  createBrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Landing from "../Pages/Landing";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import { ToastContainer } from "react-toastify";
import Register from "../Pages/Register";
import Restaurant from "../Pages/Restaurant";
import Menu from "../Pages/Menu";
import Test from "../Pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/restaurant", element: <Restaurant /> },
      { path: "/menu", element: <Menu /> },
      { path: "/test", element: <Test /> },
    ],
  },
]);
const AddRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  );
};

export default AddRoutes;
