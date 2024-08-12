import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const ExpenseForm = ({ expenseToEdit, onSave }) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (expenseToEdit) {
      setSummary(expenseToEdit.summary);
      setDescription(expenseToEdit.description);
      setDate(expenseToEdit.date.split('T')[0]);
      setCategory(expenseToEdit.category);
      setTags(expenseToEdit.tags.join(', '));
    }
  }, [expenseToEdit]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        summary,
        description,
        date,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
      };

      if (expenseToEdit) {
        await axios.put(`/api/expenses/${expenseToEdit._id}`, expenseData, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
      } else {
        await axios.post('/api/expenses', expenseData, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
      }

      onSave(); 
    } catch (err) {
      console.error('Error saving expense:', err);
    }
  };

  const handleOpenCategoryModal = () => setShowCategoryModal(true);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const handleAddCategory = async () => {
    try {
      await axios.post('/api/categories', { name: newCategory }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setCategories(prevCategories => [...prevCategories, { name: newCategory }]);
      setNewCategory('');
      handleCloseCategoryModal();
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Summary</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <div style={styles.categoryContainer}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <button type="button" onClick={handleOpenCategoryModal} style={styles.addButton}>+</button>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitButton}>{expenseToEdit ? 'Update' : 'Save'}</button>
      </form>

      {showCategoryModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.categoryModalContent}>
            <h3>Add New Category</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleAddCategory} style={styles.submitButton}>Add</button>
            <button onClick={handleCloseCategoryModal} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    paddingRight: '40px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    margin:'10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px',
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  addButton: {
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryModalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  },
};

export default ExpenseForm;
