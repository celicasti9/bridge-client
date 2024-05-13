import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';


function IncomePage() {
    const [incomes, setIncomes] = useState([]);
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found, redirecting...');
            // Optionally redirect to login
        } else {
            setIsLoggedIn(true);
            fetchIncomes(token);
        }
    }, []);

    const fetchIncomes = async (token) => {
        try {
            const response = await axios.get('/api/incomes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIncomes(response.data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
        }
    };

    const handleIncomeChange = (event) => {
        const { name, value } = event.target;
        setIncome(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIncomeSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token, operation not allowed');
            return; // Early exit if no token
        }

        try {
            const response = await axios.post('/api/incomes', income, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIncomes([...incomes, response.data]);
            setIncome({ source: '', amount: '', date: '' }); // Reset form
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    if (!isLoggedIn) {
        return <p>Please log in to view this page.</p>;
    }

    return (
        <>
        <Sidebar />
        <div className="flex-1 ml-64 p-10">
            <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Incomes</h1>
            {/* Income form */}
            <form onSubmit={handleIncomeSubmit} className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Add Income</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Source:</label>
                    <input type="text" name="source" value={income.source} onChange={handleIncomeChange} className="w-full border rounded p-2"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Amount:</label>
                    <input type="number" name="amount" value={income.amount} onChange={handleIncomeChange} className="w-full border rounded p-2"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Date:</label>
                    <input type="date" name="date" value={income.date} onChange={handleIncomeChange} className="w-full border rounded p-2"/>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit Income</button>
            </form>
        </div>
        </>
    );
}

export default IncomePage;