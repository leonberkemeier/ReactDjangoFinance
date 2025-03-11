// AddExpense.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const AddExpense = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    axios
      .get('http://127.0.0.1:8000/api/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {
      amount: parseFloat(amount),
      category: category,  
      date: date,
    };
    axios
      .post('http://127.0.0.1:8000/api/expenses/', expenseData)
      .then((response) => {  
        onExpenseAdded(response.data);
        setAmount('');
        setCategory('');
        setDate('');
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;
