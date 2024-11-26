<<<<<<< HEAD
<<<<<<< HEAD
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
import Menu from "../Pages/Menu";

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
=======
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
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
<<<<<<< HEAD
import Login from "../Pages/Login";
import { ToastContainer } from "react-toastify";
import Register from "../Pages/Register";
import Restaurant from "../Pages/Restaurant";
import Menu from "../Pages/Menu";
import Test from "../Pages/Test";

=======
import { ToastContainer } from "react-toastify";
import Restaurant from "../Pages/Restaurant";
import Menu from "../Pages/Menu";
import RestaurantRegister from "../Pages/RestaurantRegister";
import RestaurantLogin from "../Pages/RestaurantLogin";
import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
<<<<<<< HEAD
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/restaurant", element: <Restaurant /> },
      { path: "/menu", element: <Menu /> },
      { path: "/test", element: <Test /> },
=======
      { path: "/dashboard", element: <Home /> },
      { path: "/restaurant/login", element: <RestaurantLogin /> },
      { path: "/restaurant/register", element: <RestaurantRegister /> },
      { path: "/user/login", element: <UserLogin /> },
      { path: "/user/register", element: <UserRegister /> },
      { path: "/restaurant", element: <Restaurant/>},
      { path: "/menu", element: <Menu /> },
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
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
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> afc081a49aea813fc597ed46cce39843d9982fee
