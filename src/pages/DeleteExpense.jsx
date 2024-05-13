import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {SERVER_URL} from "../services/SERVER_URL"

function DeleteExpense(props) {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shows from the server when the component mounts
    axios.get(`${SERVER_URL}/expenses`).then((response) => {
      setExpenses(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { amount, title, date, category };
    axios
      .post(`${SERVER_URL}/expenses`, requestBody)
      .then((response) => {
        navigate("/expenses");
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${SERVER_URL}/expenses/${id}`)
      .then((response) => {
        // Remove the deleted show from the shows state
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex-1 ml-64 p-10">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-blueGray-800">Delete Show</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Your form inputs here */}
            </form>
            <div className="mt-8 space-y-6">
              {shows.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center">
                  <div>
                    <h3>{expense.title}</h3>
                    <p>{expense.description}</p>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(expense.id)} className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteExpense;
