// src/components/AddExpense.js
import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import axios from '../axiosConfig';

const AddExpense = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expandedExpenseId, setExpandedExpenseId] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [search, category, tag, startDate, endDate, expenses]);

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

  const filterExpenses = () => {
    let filtered = expenses;

    if (search) {
      filtered = filtered.filter(expense =>
        expense.summary.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase()) ||
        expense.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (category) {
      filtered = filtered.filter(expense => expense.category === category);
    }

    if (tag) {
      filtered = filtered.filter(expense => expense.tags.includes(tag));
    }

    if (startDate && endDate) {
      filtered = filtered.filter(expense =>
        new Date(expense.date) >= new Date(startDate) &&
        new Date(expense.date) <= new Date(endDate)
      );
    }

    setExpenses(filtered);
  };

  const handleOpenModal = () => {
    setExpenseToEdit(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    handleCloseModal();
    fetchExpenses();
  };

  const handleOpenDetails = (id) => {
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
      <h2 style={styles.heading}>Manage Expenses</h2>
      <div style={styles.searchAndFilter}>
        <input
          type="text"
          placeholder="Search by Summary, Category, or Tags"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={styles.filterInput}
        />
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={e => setTag(e.target.value)}
          style={styles.filterInput}
        />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          style={styles.dateInput}
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          style={styles.dateInput}
        />
      </div>
      <button style={styles.addButton} onClick={handleOpenModal}>Add New Expense</button>
      
      <div style={styles.expenseList}>
        {expenses.length > 0 ? (
          expenses.map(expense => (
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
                  <p><strong>Amount:</strong> ${expense.amount.toFixed(2)}</p>
                  <div style={styles.cardActions}>
                    <button style={styles.editButton} onClick={() => handleEditExpense(expense)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No expenses found</p>
        )}
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
    fontSize: '24px',
    fontWeight: 'bold',
  },
  searchAndFilter: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  searchInput: {
    flex: '1',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    minWidth: '200px',
  },
  filterInput: {
    flex: '1',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
  },
  dateInput: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    minWidth: '150px',
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
    background: 'linear-gradient(to right, #2c3e50, #4ca1af)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: '0.3s',
    overflow: 'hidden',
    color:'white'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cardDetails: {
    marginTop: '10px',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
  },
  cardActions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
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
    paddingRight: '40px',
    borderRadius: '8px',
    position: 'relative',
    width: '80%',
    maxWidth: '500px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  modalClose: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#DC3545',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
  },
  noResults: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  },
};

export default AddExpense;
