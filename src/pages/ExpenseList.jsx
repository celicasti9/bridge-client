import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import ExpenseCard from '../components/ExpenseCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {SERVER_URL} from "../services/SERVER_URL"

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/expenses`);
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/categories`); // Adjust this endpoint as necessary
            setCategories(response.data); // Assume the data is an array of category objects
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`${SERVER_URL}/expenses/${id}`);
            const newExpenses = expenses.filter(expense => expense._id !== id);
            setExpenses(newExpenses);
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };


    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const expenseTitle = expense.title || ""; // Default to empty string if undefined
        const expenseCategory = expense.category || ""; // Default to empty string if undefined
    
        const matchesSearchTerm = searchTerm.trim() === "" || // Check if search term is empty to show all if no search term
            expenseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expenseCategory.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !selectedCategory || expenseCategory === selectedCategory;
        
        const matchesStartDate = !startDate || expenseDate >= startDate;
        const matchesEndDate = !endDate || expenseDate <= endDate;
    
        return matchesSearchTerm && matchesCategory && matchesStartDate && matchesEndDate;
    });
    

    return (
        <>
            <Sidebar />
            <div className="flex-1 ml-64 p-10">
                <h1 className="text-3xl font-bold underline">
                    Expense List
                </h1>
                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mb-4 mt-2 p-2 border rounded"
                />
                <select
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full border rounded p-2"
                            id="category"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="mb-4 p-2 border rounded"
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="mb-4 p-2 border rounded"
                />
                <div className="flex flex-wrap -mx-4">
                    {filteredExpenses.map((expense) => (
                        <div key={expense._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4">
                            <ExpenseCard
                                title={expense.title}
                                description={expense.description}
                                id={expense._id}
                                date={expense.date}
                                amount={expense.amount}
                                category={expense.category}
                                handleDeleteClick={() => handleDeleteClick(expense._id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ExpenseList;
