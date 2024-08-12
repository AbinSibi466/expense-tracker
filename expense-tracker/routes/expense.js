const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getExpenses, createExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');

// @route   GET /api/expenses
// @desc    Get all expenses for the logged-in user
// @access  Private
router.get('/', auth, getExpenses);

// @route   POST /api/expenses
// @desc    Create a new expense
// @access  Private
router.post('/', auth, createExpense);

// @route   PUT /api/expenses/:id
// @desc    Update an expense
// @access  Private
router.put('/:id', auth, updateExpense);

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
// @access  Private
router.delete('/:id', auth, deleteExpense);

module.exports = router;
