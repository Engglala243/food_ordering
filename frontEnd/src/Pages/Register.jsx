<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { FaKey, FaUser, FaPen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Country, State, City } from "country-state-city";

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const formik = useFormik({
    initialValues: {
      restaurant_name: "",
      phone: "",
      password: "",
      confirm_password: "",
      country: "",
      state: "",
      city: "",
      street: "",
      email: "",
      pincode: "",
    },
    validationSchema: Yup.object({
      restaurant_name: Yup.string()
        .required("Restaurant name is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
      street: Yup.string()
        .required("Street is required!")
        .min(3, "Too short.")
        .max(100, "Too long!"),
      country: Yup.string().required("Country is required!"),
      state: Yup.string().required("State is required!"),
      pincode: Yup.string()
        .required("PIN code is required")
        .matches(/^[0-9]{6}$/, "PIN code must be 6 digits"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(
          /^\+?[1-9]\d{1,14}$/,
          "Phone number must be valid and include country code (e.g., +123456789)"
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
        state: values.state,
        street: values.street,
        city: cityName,
        pincode: values.pincode,
      };

      console.log(registerData, "<===Register Data")

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

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    formik.setFieldValue("country", selectedCountry);
    formik.setFieldValue("state", "");
    setCityName("");

    const countryStates = State.getStatesOfCountry(selectedCountry);
    setStates(countryStates);
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    formik.setFieldValue("pincode", pincode);

    if (pincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        if (response.data[0].Status === "Success") {
          const cityData = response.data[0].PostOffice[0];
          setCityName(cityData.District);
        }
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Restaurant Registration
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-blue-800 mb-4 pb-2">
              Basic Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="restaurant_name"
                  value={formik.values.restaurant_name}
                  onChange={formik.handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {formik.errors.restaurant_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.restaurant_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input w-full px-3 py-2 border rounded-md"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="form-error">{formik.errors.phone}</div>
                )}
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full px-3 py-2 border rounded-md"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="form-error">{formik.errors.password}</div>
                )}
              </div>

              <div>
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  className="form-input w-full px-3 py-2 border rounded-md"
                  {...formik.getFieldProps("confirm_password")}
                />
                {formik.touched.confirm_password &&
                  formik.errors.confirm_password && (
                    <div className="form-error">
                      {formik.errors.confirm_password}
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-green-800 mb-4 pb-2">
              Address Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">
                <label htmlFor="street" className="form-label">
                  Street
                </label>
                <input
                  id="street"
                  type="text"
                  className="form-input w-full px-3 py-2 border rounded-md"
                  {...formik.getFieldProps("street")}
                />
                {formik.touched.street && formik.errors.street && (
                  <div className="form-error">{formik.errors.street}</div>
                )}
              </div>

              <div>
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  id="country"
                  className="form-input w-full px-3 py-2 border rounded-md"
                  onChange={handleCountryChange}
                  value={formik.values.country}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {formik.touched.country && formik.errors.country && (
                  <div className="form-error">{formik.errors.country}</div>
                )}
              </div>

              <div>
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select
                  id="state"
                  className="form-input w-full px-3 py-2 border rounded-md"
                  {...formik.getFieldProps("state")}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {formik.touched.state && formik.errors.state && (
                  <div className="form-error">{formik.errors.state}</div>
                )}
              </div>

              <div>
                <label htmlFor="pincode" className="form-label">
                  PIN Code
                </label>
                <input
                  id="pincode"
                  type="text"
                  className="form-input w-full px-3 py-2 border rounded-md"
                  onChange={handlePincodeChange}
                  value={formik.values.pincode}
                  maxLength={6}
                />
                {formik.touched.pincode && formik.errors.pincode && (
                  <div className="form-error">{formik.errors.pincode}</div>
                )}
              </div>

              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input bg-gray-100 cursor-not-allowed w-full px-3 py-2 border rounded-md"
                  value={cityName}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full"
            >
              Register Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

<style jsx global>{`
  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }

  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300;
  }

  .form-error {
    @apply text-red-500 text-xs mt-1 animate-bounce;
  }
`}</style>;
>>>>>>> master
