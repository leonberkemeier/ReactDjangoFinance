// src/components/AddCategory.jsx
import { useState } from 'react';
import axios from 'axios';

const AddCategory = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      axios
        .post('http://127.0.0.1:8000/api/categories/', { name: categoryName })
        .then((response) => {
          onCategoryAdded(response.data); 
          setCategoryName('');
        })
        .catch((error) => {
          console.error('Error adding category:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="New Category"
        required
      />
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;