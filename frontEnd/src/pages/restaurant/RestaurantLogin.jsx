import { FaKey, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/AuthSlice.jsx";
import { useNavigate } from "react-router-dom";
import { fetchMenu } from "@/features/MenuSlice.jsx";

const RestaurantLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
      password: Yup.string()
        .min(8, "Should be at least 8 characters!")
        .max(100, "Too Long!")
        .required("Required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      const loginData = {
        email: values.email,
        password: values.password,
      };
      axios
        .post("http://localhost:5000/auth/restaurant/login", loginData, {
          withCredentials: false,
        })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          dispatch(loginUser);
          dispatch(fetchMenu(response.data.access_token));
          navigate("/restaurant/dashboard");
          toast.success("Login Successful!");
          console.log(response.data);
        })
        .catch((err) => {
          alert("Please enter correct email & password");
          console.log(err);
        });
      setTimeout(() => {
        resetForm();
      }, 1000);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Restaurant Login
        </h2>
        <hr className="mb-6" />
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-2.5 text-gray-400" />
              <input
                id="email"
                type="text"
                className="w-full pl-10 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <FaKey className="absolute left-3 top-2.5 text-gray-400" />
              <input
                id="password"
                type="password"
                className="w-full pl-10 py-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/restaurant/register"
            className="text-green-500 hover:underline"
          >
            Register Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;
