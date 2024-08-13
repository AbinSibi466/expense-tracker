// routes/tagRoutes.js

const express = require('express');
const router = express.Router();
const { getTags, createTag, deleteTag } = require('../controllers/tagController');

// Get all tags
router.get('/', getTags);

// Create a new tag
router.post('/', createTag);

// Delete a tag by ID
router.delete('/:id', deleteTag);

module.exports = router;
