// src/components/ExpenseList.js
import React, { useState, useEffect } from 'react';
import ExpenseContext from '../context/ExpenseContext';

const ExpenseList = ({ expenses, onEdit }) => {
  const { state, dispatch } = React.useContext(ExpenseContext);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const filterExpenses = () => {
      let results = expenses;

      if (search) {
        results = results.filter(expense =>
          expense.summary.toLowerCase().includes(search.toLowerCase()) ||
          expense.category.toLowerCase().includes(search.toLowerCase()) ||
          expense.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
        );
      }

      if (category) {
        results = results.filter(expense => expense.category === category);
      }

      if (tag) {
        results = results.filter(expense => expense.tags.includes(tag));
      }

      if (startDate && endDate) {
        results = results.filter(expense =>
          new Date(expense.date) >= new Date(startDate) &&
          new Date(expense.date) <= new Date(endDate)
        );
      }

      setFilteredExpenses(results);
    };

    filterExpenses();
  }, [search, category, tag, startDate, endDate, expenses]);

  const deleteExpense = id => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  return (
    <div style={styles.container}>
      <div style={styles.filters}>
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

      <div style={styles.listContainer}>
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map(expense => (
            <div key={expense.id} style={styles.listItem}>
              <div style={styles.expenseDetails}>
                <h3 style={styles.summary}>{expense.summary}</h3>
                <p style={styles.category}>Category: {expense.category}</p>
                <p style={styles.tags}>Tags: {expense.tags.join(', ')}</p>
                <p style={styles.date}>Date: {new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <div style={styles.buttons}>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No expenses found</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: 'auto',
  },
  filters: {
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
  },
  filterInput: {
    flex: '1',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  dateInput: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  expenseDetails: {
    flex: '1',
  },
  summary: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  category: {
    margin: '5px 0',
    fontSize: '14px',
  },
  tags: {
    margin: '5px 0',
    fontSize: '14px',
  },
  date: {
    margin: '5px 0',
    fontSize: '14px',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
  noResults: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#888',
  },
};

export default ExpenseList;
