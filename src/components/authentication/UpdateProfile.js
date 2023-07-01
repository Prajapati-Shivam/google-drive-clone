import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="shadow-lg rounded-md px-4 py-8 sm:px-16 sm:py-10 text-lg"
        >
          <h1 className="text-4xl text-center font-semibold mb-4">
            Update Profile
          </h1>
          <p className="text-center mb-6">
            Enter the details you want to update
          </p>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-2"
              role="alert"
            >
              {error}
            </div>
          )}
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              defaultValue={currentUser.email}
              ref={emailRef}
              id="email"
              className="w-full border-2 rounded px-4 py-2 mt-2 mb-4 hover:border-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              placeholder="Leave blank to keep the same"
              className="w-full border-2 rounded px-4 py-2 mt-2 mb-4  hover:border-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-control">
            <label htmlFor="cpassword">Confirm password:</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              id="cpassword"
              placeholder="Leave blank to keep the same"
              className="w-full border-2 rounded px-4 py-2 mt-2 mb-4  hover:border-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-full text-center"
          >
            Update
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link to="/user" className="text-blue-500 hover:text-blue-600">
            Cancel
          </Link>
        </p>
      </div>
    </>
  );
}
