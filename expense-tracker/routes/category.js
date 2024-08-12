const express = require('express');
const router = express.Router();
const { getCategories, addCategory,updateCategory,deleteCategory } = require('../controllers/categoryController');
const auth = require('../middlewares/authMiddleware'); // Assuming you have an authentication middleware

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getCategories);

// @route   POST /api/categories
// @desc    Add a new category
// @access  Private
router.post('/', auth, addCategory);

router.put('/:id', auth, updateCategory);

// Delete a category
router.delete('/:id', auth,deleteCategory);

module.exports = router;
