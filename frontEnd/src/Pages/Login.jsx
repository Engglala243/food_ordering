import { FaKey, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/AuthSlice.jsx";

const Login = () => {
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
        .post("http://localhost:5000/auth/restaurant/login", loginData)
        .then((response) => {
          console.log(response.data.access_token);
          localStorage.setItem("user_id", response.data);
          localStorage.setItem("user_info", response.data);
          localStorage.setItem("access_token", response.data);
          dispatch(loginUser());
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        resetForm();
      }, 1000);
    },
  });

  return (
    <>
      <div className="container h-screen">
        <div className="bg-gray-200 p-4 rounded-md m-4 shadow-md">
          <div className="font-bold text-xl">Login</div>
          <hr className="w-[100%]" />
          <form className="my-2 grid gap-2" onSubmit={formik.handleSubmit}>
            <div className="col-start-1 col-end-3">
              <label>Email:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="email"
                type="text"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-div">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="col-start-1 col-end-3">
              <label>Password:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="password"
                type="password"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-div">{formik.errors.password}</div>
              ) : null}
            </div>
            <button className="bg-green-400 p-1 rounded-md">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
