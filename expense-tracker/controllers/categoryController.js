const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add a new category
// @route   POST /api/categories
// @access  Private
exports.addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        // Check if category already exists
        let category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        // Create a new category
        category = new Category({ name });
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.updateCategory = async (req, res) => {
    const { name } = req.body;
  
    try {
      // Find the category by ID
      let category = await Category.findById(req.params.id);
  
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }
  
      // Check if category name already exists and isn't the current category
      const existingCategory = await Category.findOne({ name });
      if (existingCategory && existingCategory._id.toString() !== req.params.id) {
        return res.status(400).json({ msg: 'Category name already exists' });
      }
  
      // Update category name
      category.name = name;
      await category.save();
  
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Delete a category
  exports.deleteCategory = async (req, res) => {
    try {
        console.log('Deleting category with ID:', req.params.id);
      
        // Find the category by ID and delete it
        const category = await Category.findByIdAndDelete(req.params.id);
  
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
  
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
