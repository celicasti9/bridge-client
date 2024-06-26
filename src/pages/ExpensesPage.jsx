import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { fileChange } from '../services/fileChange';
import { useContext } from 'react';
import {SERVER_URL} from "../services/SERVER_URL"

function ExpensesPage() {
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [description, setDescription] = useState("");
    const [receipt, setReceipt] = useState(null); 
    const [categories, setCategories] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();
    const { user, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { amount, date, title, category: selectedCategory, description, receipt };
        axios.post(`${SERVER_URL}/expenses`, requestBody)
          .then((response) => {
            navigate("/dashboard");
          })
          .catch((error) => console.log(error));
    };

    const handleFileChange = (e) => {
        setDisabled(true)

        fileChange(e)
          .then((response) => {
            setReceipt(response.data.image)
            setDisabled(false)
          })
          .catch((err) => {
            console.log("Errror uploading photo", err)
            setDisabled(false)
          })
         // Update the state with the selected file
    };

    return (
        <>
            <Sidebar />
            <div className="flex-1 ml-64 p-10">
                <h1 className="ml-4 text-2xl font-bold text-gray-800 mt-6 mb-4">Add Expense</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium mb-1">Category:</label>
                        <select
                            name="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border rounded p-2"
                            id="category"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount:</label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            required
                            className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium mb-1">Date:</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            required
                            className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            required
                            className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="receipt" className="block text-sm font-medium mb-1">Receipt:</label>
                        <input
                            type="file"
                            id="receipt"
                            name="receipt"
                            accept="image/*,.pdf" // Accept images and PDF files
                            onChange={handleFileChange}
                            className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <button disabled={disabled} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit Expense</button>
                </form>
                    <Link to="/list">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            View Expenses
                        </button>
                    </Link>
            </div>
        </>
    );
}

export default ExpensesPage;
