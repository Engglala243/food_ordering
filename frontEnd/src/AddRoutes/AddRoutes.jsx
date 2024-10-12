import {
  createBrowserRouter,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Landing from "../Pages/Landing";
import NotFound from "../Pages/NotFound";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <Landing /> }],
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

