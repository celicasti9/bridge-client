import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function ExpenseCard({ title, description, id, date, category, amount, handleDeleteClick }) {


  const handleDelete = () => {
    handleDeleteClick()
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {/*<Link to={`/expenses/${id}`} className="block">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
  </Link>*/}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">Category: {category}</p>
        <p className="text-sm text-gray-600 mb-2">Amount: {amount}</p>
        <p className="text-sm text-gray-600 mb-2">Date: {date}</p>
        <p className="text-sm text-gray-700 mb-4">Description: {description}</p>
        <div className="flex justify-between">
          <button type="submit" onClick={handleDelete} className="text-red-500 hover:text-red-700">
            Delete
          </button>
          <Link to={`/update/${id}`}>
            <button className="text-blue-500 hover:text-blue-700">
              Update
            </button>
          </Link>          
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
