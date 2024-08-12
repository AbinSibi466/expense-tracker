// src/context/ExpenseContext.js
import React, { createContext, useReducer } from 'react';

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload),
            };
        // Add more cases as needed
        default:
            return state;
    }
};

export const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, {
        expenses: [],
        categories: [],
        tags: []
    });

    return (
        <ExpenseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseContext;
