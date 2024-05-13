// src/pages/LoginPage.jsx

import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";

function LoginPage() {
  const [thisUser, setThisUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setThisUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", thisUser)
      .then((response) => {
        console.log("Login response ===>", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("this is the error", error)
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <h1 className="text-xl font-bold mb-2">Login</h1>

      <form onSubmit={handleLoginSubmit} className="w-full max-w-md space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={thisUser.email}
            onChange={handleTextChange}
            className="p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            value={thisUser.password}
            onChange={handleTextChange}
            className="p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md transition duration-200">
            Login
          </button>
          <Link to="/forgot-password" className="text-sm text-blue-700 hover:text-blue-950">
            Forgot Password?
          </Link>
        </div>
      </form>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      <p className="mt-4">
        Don't have an account yet? <Link to={"/signup"} className="text-blue-500 hover:text-blue-700">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
