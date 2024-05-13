import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { post } from '../services/authService';

function SignupPage() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [passwordStrength, setPasswordStrength] = useState('');
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    
    // Setting strength based on the combined conditions
    if (length >= 8 && hasUpperCase && hasNumbers && hasSpecialChar) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    post("/auth/signup", newUser)
      .then((response) => {
        console.log("This is the new user ===>", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
        setNewUser({
          email: "",
          password: "",
          name: "",
          confirmPassword: ""
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignupSubmit} className="w-full max-w-md space-y-6">
        <div className="flex flex-col">
          <label className="font-semibold">Name:</label>
          <input type="text" name="name" value={newUser.name} onChange={handleTextChange} className="p-2 border rounded-md" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Email:</label>
          <input type="email" name="email" value={newUser.email} onChange={handleTextChange} className="p-2 border rounded-md" />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Password:</label>
          <input type="password" name="password" value={newUser.password} onChange={handleTextChange} className="p-2 border rounded-md" />
          <div className="text-sm text-gray-600">Strength: {passwordStrength}</div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Confirm Password:</label>
          <input type="password" name="confirmPassword" value={newUser.confirmPassword} onChange={handleTextChange} className="p-2 border rounded-md" />
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

      <p className="mt-4">
        Already have an account? <Link to={"/login"} className="text-blue-500 hover:text-blue-700">Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
