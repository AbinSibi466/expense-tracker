import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { FaHome, FaTags, FaPlus, FaChartPie, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="toggle-button">
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
        <h3>ET</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/">
              <FaHome /> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-expense">
              <FaPlus /> <span>Add Expense</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories">
              <FaChartPie /> <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tags">
              <FaTags /> <span>Tags</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
