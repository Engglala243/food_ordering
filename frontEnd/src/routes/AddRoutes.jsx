import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/public/Home";
import Landing from "../pages/public/Landing";
import NotFound from "../pages/public/NotFound";
import { ToastContainer } from "react-toastify";
import Menu from "../pages/public/Menu";
import RestaurantRegister from "../pages/restaurant/RestaurantRegister";
import RestaurantLogin from "../pages/restaurant/RestaurantLogin";
import RestaurantDashboard from "../pages/restaurant/RestaurantDashboard";
import UserLogin from "../pages/user/UserLogin";
import UserRegister from "../pages/user/UserRegister";
import Cart from "../pages/public/Cart";
import Order from "../pages/user/Order";
import UserAccount from "../pages/user/UserAccount";
import UserProfile from "../pages/user/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/restaurant/login", element: <RestaurantLogin /> },
      { path: "/restaurant/register", element: <RestaurantRegister /> },
      { path: "/restaurant/dashboard", element: <RestaurantDashboard /> },
      { path: "/user/login", element: <UserLogin /> },
      { path: "/user/register", element: <UserRegister /> },
      { path: "/cart", element: <Cart /> },
      { path: "/menu/:id", element: <Menu /> },
      { path: "/order", element: <Order /> },
      { path: "/user/account", element: <UserAccount /> },
      { path: "/user/profile", element: <UserProfile /> },
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
