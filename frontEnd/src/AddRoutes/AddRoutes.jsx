import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Public/Home";
import Landing from "../Pages/Public/Landing";
import NotFound from "../Pages/Public/NotFound";
import { ToastContainer } from "react-toastify";
import Menu from "../Pages/Public/Menu";
import RestaurantRegister from "../Pages/Restaurant/RestaurantRegister";
import RestaurantLogin from "../Pages/Restaurant/RestaurantLogin";
import RestaurantDashboard from "../Pages/Restaurant/RestaurantDashboard";
import UserLogin from "../Pages/User/UserLogin";
import UserRegister from "../Pages/User/UserRegister";
import Cart from "../Pages/Public/Cart";
import Order from "../Pages/User/Order";
import UserAccount from "../Pages/User/UserAccount";
import UserProfile from "../Pages/User/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "/restaurant/login", element: <RestaurantLogin /> },
      { path: "/restaurant/register", element: <RestaurantRegister /> },
      { path: "/restaurant/dashboard", element: <RestaurantDashboard/> },
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
