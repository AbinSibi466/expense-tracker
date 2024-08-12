// src/components/ExpenseList.js
import React, { useContext, useState } from 'react';
import ExpenseContext from '../context/ExpenseContext';

const ExpenseList = (expenses,onEdit) => {
    const { state, dispatch } = useContext(ExpenseContext);
    const [list,setList] = useState();

    console.log(expenses.expenses,'jjjjjj')

    // const expenses

    const deleteExpense = (id) => {
        dispatch({ type: 'DELETE_EXPENSE', payload: id });
    };

    return (<>
    <h1>helloo</h1><ul>
        {expenses}
            {/* {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.summary}
                    <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                </li>
            ))} */}
        </ul>
    </>
        
    );
};

export default ExpenseList;
