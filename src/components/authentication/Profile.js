import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <div className="flex flex-col w-[400px] mx-auto px-4">
        <h2 className="text-4xl text-center font-semibold mb-4">Profile</h2>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-2"
            role="alert"
          >
            {error}
          </div>
        )}
        <strong>Email:</strong> {currentUser.email}
        <Link
          to="/update-profile"
          className="text-blue-500 hover:text-blue-600"
        >
          Update profile
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-1 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 text-center"
        >
          Log out
        </button>
      </div>
    </>
  );
}
