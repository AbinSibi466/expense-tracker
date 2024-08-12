const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String, // Change to String if it's not an ObjectId
    required: true,
  },
  tags: {
    type: [String], // Change to [String] if it's an array of strings
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
