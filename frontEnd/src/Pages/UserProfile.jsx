import React from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/AuthSlice";

function UserProfile() {
  const dispatch = useDispatch();
//   const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    // navigate("/user/login");
  };

  return (
    <div className="font-mono mt-80 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p className="mb-6">Welcome to your profile!</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
