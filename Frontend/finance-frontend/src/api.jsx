import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}expenses/`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}categories/`);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(`${API_URL}expenses/`, expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}expenses/${id}/`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}expenses/${id}/`);
};


export const addCategory = async (category) => {
    const response = await axios.post(`${API_URL}categories/`, category);
    return response.data;
  };
  
  export const updateCategory = async (id, category) => {
    const response = await axios.put(`${API_URL}categories/${id}/`, category);
    return response.data;
  };
  
  export const deleteCategory = async (id) => {
    await axios.delete(`${API_URL}categories/${id}/`);
  };
  