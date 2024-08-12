const express = require('express');
const router = express.Router();
const { getCategories, addCategory } = require('../controllers/categoryController');
const auth = require('../middlewares/authMiddleware'); // Assuming you have an authentication middleware

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories);

// @route   POST /api/categories
// @desc    Add a new category
// @access  Private
router.post('/', auth, addCategory);

module.exports = router;
