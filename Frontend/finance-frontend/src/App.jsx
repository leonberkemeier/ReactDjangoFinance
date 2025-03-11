// src/App.jsx
import React, { useState } from 'react';
import AddCategory from './assets/AddCategory';
import CategoryList from './assets/CategoryList';
import AddExpense from './assets/AddExpense';
import ExpenseList from './assets/ExpenseList';

import axios from 'axios';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchCategories = () => {
    axios
      .get('http://127.0.0.1:8000/api/categories/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchExpenses = () => {
    axios
      .get('http://127.0.0.1:8000/api/expenses/')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  };
 
  const handleCategoryAdded = (newCategory) => {
    fetchCategories();
  };

  const handleExpenseAdded = (newExpense) => {
    fetchExpenses();
  };
  
  
  

  


  React.useEffect(() => {
    fetchExpenses();
  }, []);


  React.useEffect(() => {
    fetchCategories();    
  }, []);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <AddCategory onCategoryAdded={handleCategoryAdded} />
      <CategoryList categories={categories} />

      <br />
      <AddExpense onExpenseAdded={handleExpenseAdded}/>
      <ExpenseList expenses={expenses}/>
    </div>
  );
};

export default App;
