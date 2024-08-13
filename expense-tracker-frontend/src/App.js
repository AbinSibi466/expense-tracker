import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AddExpense from './components/AddExpense';
import CategoryList from './components/CategoryList';
import TagList from './components/TagList';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {/* Conditionally render Sidebar only if the user is authenticated */}
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}
        <div className={isAuthenticated ? "content" : "content-no-sidebar"}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-expense" element={isAuthenticated ? <AddExpense /> : <Navigate to="/login" />} />
            <Route path="/categories" element={isAuthenticated ? <CategoryList /> : <Navigate to="/login" />} />
            <Route path="/tags" element={isAuthenticated ? <TagList /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
