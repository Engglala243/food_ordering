import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import emailjs from "emailjs-com";

const UserRegister = () => {
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required!")
        .min(3, "Too short.")
        .max(25, "Too long!"),
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
      if (!isOtpVerified) {
        alert("Please verify your email before registering.");
        return;
      }

      axios
        .post("http://localhost:5000/auth/register", values)
        .then((response) => {
          alert("Registration  successful.");
          console.log(response.data);
        });

      resetForm();
    },
  });

  const handleSendOtp = () => {
    if (!formik.values.email) {
      alert("Please enter your email to send the OTP.");
      return;
    }

    const generatedOtp = Math.random().toString(36).substring(2, 8);
    setOtp(generatedOtp);

    const templateParams = {
      to_email: formik.values.email,
      message: `${generatedOtp}`,
    };

    emailjs.send('service_shh1qjq', 'template_caahy5j', templateParams, 'DmbJWFOqMCWQR0Fkr')
      .then(() => {
        alert("OTP sent to your email.");
        setIsOtpSent(true);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === otp) {
      alert("Email verified successfully!");
      setIsOtpVerified(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 mt-12">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          User Registration
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
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
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            {!isOtpVerified && (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  disabled={isOtpSent}
                >
                  {isOtpSent ? "OTP Sent" : "Send OTP"}
                </button>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  disabled={!isOtpSent}
                >
                  Verify
                </button>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {formik.errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.confirm_password}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full ${
              !isOtpVerified ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isOtpVerified}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
