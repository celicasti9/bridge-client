import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";

function Sidebar() {
  const { logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser();
    // Optionally, redirect the user to another page after logout
    // history.push("/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-full shadow-md bg-gray-800 text-white fixed">
        <div className="p-5">Menu</div>
        <ul className="relative">
          <li className="relative">
            <Link to="/categories" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out">
              Expense categories
            </Link>
          </li>
          <li className="relative">
            <Link to="/expenses" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out">
              Expenses
            </Link>
          </li>    
          <li className="relative">
            <Link to="/profile" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out">
              My Profile
            </Link>
          </li> 
          <li className="relative">
            <Link to="/settings" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-gray-700 transition duration-300 ease-in-out">
              Settings
            </Link>
          </li>     
          <li>
            <button
              onClick={logOutUser}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md ml-4"
            >
              Logout
            </button>            
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
