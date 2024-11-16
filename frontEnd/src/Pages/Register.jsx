import React from "react";
import { FaKey, FaUser, FaPen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      restaurant_name: "",
      phone: "",
      password: "",
      confirm_password: "",
      country: "",
      city: "",
      street: "",
      email: "",
    },
    validationSchema: Yup.object({
      restaurant_name: Yup.string()
        .required("restaurant_name is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      street: Yup.string()
        .required("street is required!")
        .min(3, "Too short.")
        .max(100, "Too long!"),
      country: Yup.string()
        .required("country name is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      city: Yup.string()
        .required("city name is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(
          /^\+?[1-9]\d{1,14}$/,
          "Phone number must be valid and include country code (e.g., +123456789)",
        ),
      email: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
      password: Yup.string()
        .min(8, "Should be at least 8 characters!")
        .max(100, "Too Long!")
        .required("Required!"),
      confirm_password: Yup.string()
        .min(8, "Should be at least 8 characters!")
        .max(100, "Too Long!")
        .oneOf([Yup.ref("password"), null], "Password should match!")
        .required("Required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      const registerData = {
        restaurant_name: values.restaurant_name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirm_password: values.confirm_password,
        country: values.country,
        street: values.street,
        city: values.city,
      };
      console.log(registerData);
      axios
        .post("http://localhost:5000/auth/restaurant/register", registerData)
        .then((response) => {
          console.log(response.data);
        });
      setTimeout(() => {
        resetForm();
      }, 1000);
    },
  });

  return (
    <>
      <div className="container h-screen">
        <div className="bg-gray-200 p-4 rounded-md m-4 shadow-md">
          <div className="font-bold text-xl">Register your Restaurant</div>
          <hr className="w-[100%]" />
          <form className="my-2 grid gap-2" onSubmit={formik.handleSubmit}>
            <div className="font-bold">Basic Details...</div>
            <div className="col-start-1 col-end-3">
              <label>Restaurant Name:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="restaurant_name"
                type="text"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("restaurant_name")}
              />
              {formik.touched.restaurant_name &&
              formik.errors.restaurant_name ? (
                <div className="error-div">{formik.errors.restaurant_name}</div>
              ) : null}
            </div>
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
              {formik.touched.email && formik.errors.email ? (
                <div className="error-div">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="col-start-1 col-end-3">
              <label>Phone Number:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="phone"
                type="text"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error-div">{formik.errors.phone}</div>
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
            <div className="col-start-1 col-end-3">
              <label>Confirm Password:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="confirm_password"
                type="password"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("confirm_password")}
              />
              {formik.touched.confirm_password &&
              formik.errors.confirm_password ? (
                <div className="error-div">
                  {formik.errors.confirm_password}
                </div>
              ) : null}
            </div>
            <div className="font-bold">Address Details...</div>
            <div className="col-start-1 col-end-3">
              <label>Street:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="street"
                type="text"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("street")}
              />
              {formik.touched.street && formik.errors.street ? (
                <div className="error-div">{formik.errors.street}</div>
              ) : null}
            </div>
            <div className="col-start-1 col-end-3">
              <label>Country:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="country"
                type="text"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("country")}
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="error-div">{formik.errors.country}</div>
              ) : null}
            </div>
            <div className="col-start-1 col-end-3">
              <label>City:</label>
            </div>
            <div className="col-start-3 col-end-12">
              <input
                id="city"
                type="text"
                className="rounded-md p-1 text-gray-600 mx-2 w-[100%]"
                {...formik.getFieldProps("city")}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="error-div">{formik.errors.city}</div>
              ) : null}
            </div>
            <button type="submit" className="bg-green-400 rounded-md p-1">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
