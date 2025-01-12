import React from "react";

function UserAccount() {
  const user = {
    image:
      "https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png",
    name: "User Name",
    email: "useremail@gamil.com",
    phone: "+19-1212121213",
    memberSince: "January 2025",
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-gray-300 mr-4"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
          <p className="text-gray-600">Member since: {user.memberSince}</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default UserAccount;
