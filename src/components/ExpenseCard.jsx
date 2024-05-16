import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Modal from './Modal';  // Import the Modal component

import { returnTimeShort } from '../services/time'

function ExpenseCard({ title, description, id, date, category, amount, handleDeleteClick, receipt }) {


  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    handleDeleteClick()
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {/*<Link to={`/expenses/${id}`} className="block">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
  </Link>*/}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">Category: {category}</p>
        <p className="text-sm text-gray-600 mb-2">Amount: {amount}</p>
        <p className="text-sm text-gray-600 mb-2">Date: {returnTimeShort(date)}</p>
        <p className="text-sm text-gray-700 mb-4">Description: {description}</p>
        {receipt && (
          <button onClick={toggleModal} className="text-blue-500 hover:text-blue-700">
            View Receipt
          </button>
        )}

        <Modal isOpen={showModal} onClose={toggleModal}>
          {receipt && receipt.endsWith('.pdf') ? (
            <iframe src={receipt} frameBorder="0" style={{ width: '100%', height: '500px' }}></iframe>
          ) : (
            <img src={receipt} alt="Receipt" style={{ maxWidth: '100%' }}/>
          )}
        </Modal>
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
