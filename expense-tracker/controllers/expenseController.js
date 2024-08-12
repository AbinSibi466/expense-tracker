const Expense = require('../models/Expense');

// @desc    Get all expenses for the logged-in user
// @access  Private
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a new expense
// @access  Private
exports.createExpense = async (req, res) => {
    try {
        const { summary, description, date, category, tags,amount } = req.body;

        const newExpense = new Expense({
            summary,
            description,
            date,
            category,
            tags,
            user: req.user.id,
            amount
        });

        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update an expense
// @access  Private
exports.updateExpense = async (req, res) => {
    try {
        const { summary, description, date, category, tags,amount } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { summary, description, date, category, tags,amount },
            { new: true }
        );
        res.json(updatedExpense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete an expense
// @access  Private
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
