import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/user");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="shadow-lg rounded-md px-4 py-8 sm:px-16 sm:py-10 text-lg"
        >
          <h1 className="text-4xl text-center font-semibold mb-4">Sign Up</h1>
          <p className="text-center mb-6">Get started with your free account</p>
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
              required
              className="w-full border-2 rounded px-4 py-2 mt-2 mb-4  hover:border-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="form-control">
            <label htmlFor="cpassword">Confirm password:</label>
            <input
              type="password"
              ref={confirmPasswordRef}
              id="cpassword"
              required
              className="w-full border-2 rounded px-4 py-2 mt-2 mb-4  hover:border-blue-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-full text-center"
          >
            Sign up
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
