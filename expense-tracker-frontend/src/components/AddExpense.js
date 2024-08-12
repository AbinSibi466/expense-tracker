import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import axios from '../axiosConfig';

const AddExpense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expandedExpenseId, setExpandedExpenseId] = useState(null); // Track which expense is expanded

  useEffect(() => {
    

    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/api/expenses', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });  
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const handleOpenModal = () => {
    setExpenseToEdit(null); // To create a new expense
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    // Refresh expenses or perform any other action
    handleCloseModal();
    fetchExpenses(); // Reload expenses after saving
  };

  const handleOpenDetails = (id) => {
    // Toggle the details visibility
    setExpandedExpenseId(expandedExpenseId === id ? null : id);
  };

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
    setShowModal(true);
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Expense</h2>
      <button style={styles.addButton} onClick={handleOpenModal}>Add New Expense</button>
      
      <div style={styles.expenseList}>
        {expenses.map(expense => (
          <div key={expense._id} style={styles.card}>
            <div style={styles.cardHeader} onClick={() => handleOpenDetails(expense._id)}>
              <h3 style={styles.cardTitle}>{expense.summary}</h3>
              <button style={styles.toggleButton}>{expandedExpenseId === expense._id ? 'Hide Details' : 'Show Details'}</button>
            </div>
            {expandedExpenseId === expense._id && (
              <div style={styles.cardDetails}>
                <p><strong>Description:</strong> {expense.description}</p>
                <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                <p><strong>Category:</strong> {expense.category}</p>
                <p><strong>Tags:</strong> {expense.tags.join(', ')}</p>
                <button style={styles.editButton} onClick={() => handleEditExpense(expense)}>Edit</button>
                <button style={styles.deleteButton} onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.modalClose} onClick={handleCloseModal}>X</button>
            <ExpenseForm expenseToEdit={expenseToEdit} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  addButton: {
    display: 'block',
    margin: '0 auto',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  expenseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: '0.3s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    margin: 0,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  cardDetails: {
    marginTop: '10px',
  },
  editButton: {
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
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
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    paddingRight:'100px',
    borderRadius: '8px',
    position: 'relative',
    width: '80%',
    maxWidth: '500px',
  },
  modalClose: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};

export default AddExpense;
