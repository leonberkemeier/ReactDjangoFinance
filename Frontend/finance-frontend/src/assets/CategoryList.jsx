// src/components/CategoryList.jsx
import { useState } from 'react';
import axios from 'axios';

const CategoryList = ({ categories }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://127.0.0.1:8000/api/categories/${editingCategory.id}/`, {
        name: newCategoryName,
      })
      .then((response) => {
        setEditingCategory(null);
        setNewCategoryName('');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error editing category:', error);
      });
  };

  return (
    <div>
      <h3>Categories</h3>
      {editingCategory ? (
        <div>
          <h4>Edit Category</h4>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingCategory(null)}>Cancel</button>
        </div>
      ) : (
        <ul>
          {categories.length === 0 ? (
            <li>No categories available</li>
          ) : (
            categories.map((category) => (
              <li key={category.id}>
                {category.name}
                <button onClick={() => handleEditCategory(category)}>Edit</button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
