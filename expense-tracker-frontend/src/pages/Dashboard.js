import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseForm from '../components/ExpenseForm';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate()



    useEffect(() => {

        const token = localStorage.getItem('token')

        console.log('huuu', token)

        if (!token) {
            navigate('/login')
        }
        const fetchExpenses = async () => {
            try {
                const res = await axios.get('/api/expenses', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setExpenses(res.data);
                console.log('kkkk',res.data)

            } catch (err) {
                console.error('Error fetching expenses:', err);
            }
        };
        

        fetchExpenses();
    }, []);

    const handleOpenModal = () => {
        setExpenseToEdit(null); // To create a new expense
        setShowModal(true);
    };

    const handleEditExpense = (expense) => {
        setExpenseToEdit(expense);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        // Refresh expenses or perform any other action 
        handleCloseModal();
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <ExpenseChart expenses={expenses} />
            <ExpenseList expenses={expenses} onEdit={handleEditExpense} />

          
        </div>
    );
};

// Inline styles


export default Dashboard;
