import { useState, useEffect } from 'react';
import axios from 'axios';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDate, setNewDate] = useState('');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch categories to populate the category select field
    axios
      .get('http://127.0.0.1:8000/api/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    // Fetch expenses from the API
    axios
      .get('http://127.0.0.1:8000/api/expenses/')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  const handleEditExpense = (expense) => {
    // Set the expense to edit
    setEditingExpense(expense);
    setNewAmount(expense.amount);
    setNewCategory(expense.category.id);
    setNewDate(expense.date);
  };

  const handleSaveEditExpense = () => {
    // Send the updated data to the backend
    axios
      .put(`http://127.0.0.1:8000/api/expenses/${editingExpense.id}/`, {
        amount: parseFloat(newAmount),
        category: newCategory,
        date: newDate,
      })
      .then((response) => {
        // Update the expenses in the state
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === editingExpense.id ? response.data : expense
          )
        );
        // Reset the edit mode
        setEditingExpense(null);
        setNewAmount('');
        setNewCategory('');
        setNewDate('');
      })
      .catch((error) => {
        console.error('Error updating expense:', error);
      });
  };

  const handleCancelEdit = () => {
    // Reset the edit form without saving
    setEditingExpense(null);
    setNewAmount('');
    setNewCategory('');
    setNewDate('');
  };

  return (
    <div>
      <h2>Expenses</h2>
      {editingExpense ? (
        <div>
          <h3>Edit Expense</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEditExpense();
            }}
          >
            <input
              type="number"
              step="0.01"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Amount"
              required
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
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
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.amount} - {expense.category} - {expense.date}
              <button onClick={() => handleEditExpense(expense)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpensesList;
