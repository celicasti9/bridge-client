import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';


const SERVER_URL = "http://localhost:4000";

function DashboardPage() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/expenses`);
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    // Prepare data for Expenses by Category
    const categoryData = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const categoryChartData = {
        labels: Object.keys(categoryData),
        datasets: [{
            label: 'Expenses by Category',
            data: Object.values(categoryData),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#E7E9ED',
                '#4BC0C0'
            ]
        }]
    };

    // Prepare data for Expenses by Month
    const currentDate = new Date();
    const monthsData = Array.from({ length: 12 }, (_, i) => {
        const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        return expenses.reduce((sum, expense) => {
            const expenseDate = new Date(expense.date);
            if (expenseDate.getMonth() === month.getMonth() && expenseDate.getFullYear() === month.getFullYear()) {
                return sum + expense.amount;
            }
            return sum;
        }, 0);
    }).reverse();

    const monthsChartData = {
        labels: monthsData.map((_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth() - 11 + i, 1).toLocaleString('default', { month: 'short' })),
        datasets: [{
            label: 'Expenses by Month',
            data: monthsData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <>
            <Sidebar />
            <div className="flex-1 ml-64 p-10">
                <h1 className="text-3xl font-bold underline">
                    Welcome to Your Dashboard
                </h1>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/2 px-4 mb-4">
                        <h2 className="text-xl font-bold">Expenses by Category</h2>
                        <Doughnut data={categoryChartData} />
                    </div>
                    <div className="w-full lg:w-1/2 px-4 mb-4">
                        <h2 className="text-xl font-bold">Expenses by Month</h2>
                        <Line data={monthsChartData} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;
