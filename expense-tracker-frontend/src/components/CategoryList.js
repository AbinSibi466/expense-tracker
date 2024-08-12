import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the import based on your project structure

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  // Handle edit category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditedName(category.name);
  };

  // Handle save edited category
  const handleSave = async () => {
    try {
      await axios.put(`/api/categories/${editingCategory._id}`, { name: editedName }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setCategories(categories.map(cat => cat._id === editingCategory._id ? { ...cat, name: editedName } : cat));
      setEditingCategory(null);
      setEditedName('');
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditingCategory(null);
    setEditedName('');
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    try {
      const response = await axios.post('/api/categories', { name: newCategory }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setCategories([...categories, response.data]);
      setIsModalOpen(false);
      setNewCategory('');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Category List</h2>
      <div style={styles.cardContainer}>
        {categories.map(category => (
          <div key={category._id} style={styles.card}>
            {editingCategory && editingCategory._id === category._id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  style={styles.input}
                />
                <div style={styles.buttonGroup}>
                  <button onClick={handleSave} style={styles.saveButton}>Save</button>
                  <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3 style={styles.categoryName}>{category.name}</h3>
                <div style={styles.buttonGroup}>
                  <button onClick={() => handleEdit(category)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(category._id)} style={styles.deleteButton}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Plus button to open the modal */}
      <button style={styles.plusButton} onClick={() => setIsModalOpen(true)}>+</button>

      {/* Modal for adding a new category */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Add Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={styles.input}
              placeholder="Category name"
            />
            <div style={styles.buttonGroup}>
              <button onClick={handleAddCategory} style={styles.saveButton}>Add</button>
              <button onClick={() => setIsModalOpen(false)} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    width: '250px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    position: 'relative',
  },
  categoryName: {
    marginBottom: '20px',
    color: '#555',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  plusButton: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  },
  modalOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  modalTitle: {
    marginBottom: '20px',
    color: '#333',
  },
};

export default CategoryList;
