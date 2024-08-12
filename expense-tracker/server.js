const express = require('express');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const expenseRouter = require('./routes/expense');
const categoryRouter = require('./routes/category');
const tagRouter = require('./routes/tag');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRouter);  // Use authRouter as middleware

app.use('/api/expenses', expenseRouter);
app.use('/api/categories', categoryRouter);
// app.use('/api/tags', tagRouter);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
