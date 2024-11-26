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
import { ToastContainer } from "react-toastify";
import Restaurant from "../Pages/Restaurant";
import Menu from "../Pages/Menu";
import RestaurantRegister from "../Pages/RestaurantRegister";
import RestaurantLogin from "../Pages/RestaurantLogin";
import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/dashboard", element: <Home /> },
      { path: "/restaurant/login", element: <RestaurantLogin /> },
      { path: "/restaurant/register", element: <RestaurantRegister /> },
      { path: "/user/login", element: <UserLogin /> },
      { path: "/user/register", element: <UserRegister /> },
      { path: "/restaurant", element: <Restaurant/>},
      { path: "/menu", element: <Menu /> },
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
