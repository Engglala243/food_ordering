import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/Counter";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Test = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);

  const formik = useFormik({
    initialValues: {
      menu_name:
      
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
        .post("http://localhost:5000/auth/login", loginData)
        .then((response) => {
          console.log(response.data.access_token);

          window.location.href = "/";
        })
        .catch((err) => console.log(err));
      setTimeout(() => {
        resetForm();
      }, 1000);
    },
  });
  return (
    <>
      <div className="flex flex-col items-center p-4 ">
        <div className="font-bold text-4xl">Test Page!</div>
        <div>Testing redux values</div>
        <div>This is Count: {count}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div className="m-4 p-4 rounded-md bg-gray-300">
        <form className="my-2 grid gap-2" onSubmit={formik.handleSubmit}>
          <div className="col-start-1 col-end-3">
            <label>Menu Name</label>
          </div>
          <div className="col-start-3 col-end-12">
            <input
              id="menu_name"
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
    </>
  );
};

export default Test;
