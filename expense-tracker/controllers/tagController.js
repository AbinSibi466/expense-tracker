// controllers/tagController.js

const Tag = require('../models/Tag');

// Get all tags
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new tag
exports.createTag = async (req, res) => {
  const { name } = req.body;

  try {
    let tag = new Tag({ name });
    await tag.save();
    res.json(tag);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a tag by ID
exports.deleteTag = async (req, res) => {
  try {
    console.log("gggg")
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tag removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
