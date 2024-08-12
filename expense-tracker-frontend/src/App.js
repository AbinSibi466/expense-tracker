import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'
import AddExpense from './components/AddExpense';
import CategoryList from './components/CategoryList';
// Import other pages like AddExpense, ExpenseList, Categories, Tags

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/" element={<Dashboard />} />
            {/* Define routes for other pages */}
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/categories" element={<CategoryList />} />
            {/* <Route path="/tags" element={<Tags />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

