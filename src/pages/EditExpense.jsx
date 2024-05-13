import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SERVER_URL } from '../services/SERVER_URL'

function EditExpense() {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [date, setDate] = useState("");
  // const [category, setCategory] = useState("");
  const [expense, setExpense] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");  // Add state to handle the expense amount

  const { expenseId } = useParams();
  const navigate = useNavigate();

  
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  const fetchExpense = async () => { 
    try {
      const response = await axios.get(`${SERVER_URL}/expenses/details/${expenseId}`);
      setExpense(response.data);
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };
  
  useEffect(() => {
    fetchExpense();
    fetchCategories();
}, [expenseId]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${SERVER_URL}/expenses/update/${expenseId}`, expense);
      console.log(response.data);
      navigate("/dashboard");
    } catch ( error ) {
      console.log(error);
    }
  };


  const deleteExpense = () => {
    axios
      .delete(`${SERVER_URL}/expenses/${expenseId}`)
      .then(() => {
        navigate("/expenses");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
    <Sidebar />
    <div className="flex-1 ml-64 p-10">
      <h3 className="text-xl font-semibold mb-4">Edit the Expense</h3>

    {
      expense && 

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={expense.title}
            onChange={(e) => setExpense((prev) => ({...prev, [e.target.name]: e.target.value}))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={expense.description}
            onChange={(e) => setExpense((prev) => ({...prev, [e.target.name]: e.target.value}))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={(e) => setExpense((prev) => ({...prev, [e.target.name]: e.target.value}))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={expense.date}
            onChange={(e) => setExpense((prev) => ({...prev, [e.target.name]: e.target.value}))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update 
        </button>
      </form>

    }

      <button onClick={deleteExpense} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Delete 
      </button>
    </div>
    </>
  );
}

export default EditExpense;
