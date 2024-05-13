// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  return (
    <nav className="flex items-center justify-between bg-blue-950 text-white px-4 py-3 shadow-md">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="bridge-logo.png" alt="Logo" className="mr-3 h-6 sm:h-9" />
          <span className="font-bold text-xl">Bridge Security Expenses</span>
        </Link>
      </div>

      <div className="flex items-center">
        {getToken() ? (
          <>
          <Link to="/dashboard">
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md ml-4"
            >
              Dashboard
            </button>
          </Link>
            {user && (
              <span className="ml-4 text-sm font-medium">
                Welcome, {user.name}
              </span>
            )}
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md ml-4">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md ml-4">
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
