// src/pages/ForgotPasswordPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from '../services/authService'

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to the backend to handle the email sending
        setMessage("If an account with that email exists, we have sent an email to reset your password.");
        setTimeout(() => navigate('/login'), 8000);  // Redirects the user back to login after 8 seconds
        post('/users/lost-password', { email })
            .then((response) => {
                console.log("this is the lost password response", response.data)
            })
            .catch((err) => {
                console.log("this is the lost password error", err)
            })
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
            <h1 className="text-xl font-bold mb-4">Reset Password</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="p-2 border rounded-md"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                    Send Reset Email
                </button>

                {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
            </form>

            <p className="mt-4">
                Remembered your password? <Link to={"/login"} className="text-blue-500 hover:text-blue-700">Login</Link>
            </p>
        </div>
    );
}

export default ForgotPasswordPage;
