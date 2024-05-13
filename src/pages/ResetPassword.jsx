import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [message, setMessage] = useState('');

    const SERVER_URL = "http://localhost:4000"; // Update with your actual server URL

    const calculatePasswordStrength = (password) => {
        const length = password.length;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
        if (length >= 8 && hasUpperCase && hasNumbers && hasSpecialChar) {
            setPasswordStrength('Strong');
        } else {
            setPasswordStrength('Weak');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        calculatePasswordStrength(newPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        if (passwordStrength === 'Weak') {
            setMessage('Please set a stronger password.');
            return;
        }
        axios.post(`${SERVER_URL}/auth/reset-password`, { password })
            .then(response => {
                setMessage('Password updated successfully!');
            })
            .catch(error => {
                setMessage('Failed to update password.');
                console.error('Error updating password:', error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
            <h1 className="text-xl font-bold mb-4">Reset Your Password</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <div className="flex flex-col">
                    <label className="font-semibold">New Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} className="p-2 border rounded-md" />
                    <div className="text-sm text-gray-600">Strength: {passwordStrength}</div>
                </div>
                <div className="flex flex-col">
                    <label className="font-semibold">Confirm New Password:</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-2 border rounded-md" />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                    Reset Password
                </button>
                {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
