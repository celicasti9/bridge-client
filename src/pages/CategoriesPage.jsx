import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function CategoriesPage() {
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [deleteCategory, setDeleteCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const SERVER_URL = "http://localhost:4000";

    const getCategories = () => {
        axios.get(`${SERVER_URL}/categories`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.error(error));
        
    }

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleDeleteChange = (e) => {
        setDeleteCategory(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${SERVER_URL}/categories`, { name: newCategory.name })
        .then((response) => {
            console.log("Category added successfully", response.data);
            getCategories();
            setNewCategory({ name: '' });;
        })
        .catch((error) => console.log(error));
    };
    
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        axios.delete(`${SERVER_URL}/categories/delete/${deleteCategory}`)
        .then((response) => {
            // Handle successful deletion, maybe show a message or update state
            getCategories()
            console.log("Category deleted successfully", response.data);
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {

        getCategories()
        // Fetch categories from the server
    }, []);
    
    return (
        <>
            <Sidebar />
            <div className="flex-1 ml-64 p-10">
                <h1 className="ml-4 text-2xl font-bold text-gray-800 mt-6 mb-4">Add/Delete Category</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="newCategory" className="block text-sm font-medium mb-1">New Category:</label>
                        <input
                            id="newCategory"
                            name="name"
                            type="text"
                            required
                            className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
                            value={newCategory.name}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit Category</button>
                </form>
                <form onSubmit={handleDeleteSubmit} className="bg-white p-6 shadow rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="deleteCategory" className="block text-sm font-medium mb-1">Delete Category:</label>
                        <select
                            id="deleteCategory"
                            name="deleteCategory"
                            className="mt-1 focus:ring-light-blue-500 focus:border-light-blue-500 block w-full shadow-sm sm:text-sm border-blueGray-300 rounded-md"
                            value={deleteCategory}
                            onChange={handleDeleteChange}
                        >
                            <option value="">Select a category to delete</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete Category</button>
                </form>
                {/* Categories Table */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Categories List</h2>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {category.name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default CategoriesPage;
