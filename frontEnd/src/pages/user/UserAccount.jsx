import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      <div className="container mx-auto pt-40 pb-20 px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Your Account</h1>
            <p className="text-gray-600">
              Welcome back! Manage your account and settings below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <button
              className="p-4 bg-blue-100 rounded-lg shadow hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={() => navigate("/order")}
            >
              <h2 className="text-lg font-semibold text-blue-600">
                Your Orders
              </h2>
              <p className="text-sm text-gray-600">
                Track, return, or buy things again.
              </p>
            </button>

            <button className="p-4 bg-yellow-100 rounded-lg shadow hover:bg-yellow-200 focus:outline-none focus:ring focus:ring-yellow-300">
              <h2 className="text-lg font-semibold text-yellow-600">
                Your Lists
              </h2>
              <p className="text-sm text-gray-600">View and edit your lists.</p>
            </button>

            <button
              className="p-4 bg-green-100 rounded-lg shadow hover:bg-green-200 focus:outline-none focus:ring focus:ring-green-300"
              onClick={() => navigate("/user/profile")}
            >
              <h2 className="text-lg font-semibold text-green-600">
                Your Profile
              </h2>
              <p className="text-sm text-gray-600">
                Manage your profile settings and preferences.
              </p>
            </button>

            <button
              className="p-4 bg-purple-100 rounded-lg shadow hover:bg-purple-200 focus:outline-none focus:ring focus:ring-purple-300"
              onClick={() => navigate("/menu/6")}
            >
              <h2 className="text-lg font-semibold text-green-600">
                Buy Again
              </h2>
              <p className="text-sm text-gray-600">
                Repurchase items you’ve previously bought.
              </p>
            </button>
          </div>

          <div className="flex justify-center mt-6 px-6 pb-6">
            <button
              onClick={handleLogout}
              className="w-full md:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
