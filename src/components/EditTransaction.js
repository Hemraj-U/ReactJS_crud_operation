import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./trans/CreateTransaction.css";
import { toast } from "react-toastify";

const EditTransaction = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    description: "",
    amount: "",
    transactionType: "",
    completed: false,
  });

  const onChange = (e) =>
    setTransaction({ ...transaction, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://34.224.7.42:3000/trans/update/${id}`,
        transaction,
        {
          headers: {
            "x-auth-token": user.token,
          },
        }
      );
      toast.success("Transaction updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      navigate("/myapp/src/components/trans/Transactions");
    } catch (error) {
      toast.error("Failed to update transaction. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="create-task-page-container">
      <h2>Edit Transaction</h2>
      <form className="create-task-form" onSubmit={onSubmit}>
        <label>Task Description:</label>
        <textarea
          rows="4"
          value={transaction.description}
          name="description"
          onChange={onChange}
          placeholder="Enter transaction description"
          required
        />

        <label>Amount:</label>
        <input
          type="text"
          name="amount"
          value={transaction.amount}
          onChange={onChange}
          required
          placeholder="Enter Amount"
        />

        <label>Status:</label>
        <select
          value={transaction.completed}
          name="completed"
          onChange={onChange}
          required
        >
          <option value={false}>Not Completed</option>
          <option value={true}>Completed</option>
        </select>

        <label>Transaction Type:</label>
        <select
          value={transaction.transactionType}
          onChange={onChange}
          name="transactionType"
          required
        >
          <option value="credited">Credited</option>
          <option value="debited">Debited</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTransaction;
