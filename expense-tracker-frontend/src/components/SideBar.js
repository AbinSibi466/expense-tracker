import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { FaHome, FaTags, FaPlus, FaChartPie, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => {
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
              <FaHome /> {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-expense">
              <FaPlus /> {!isCollapsed && <span>Add Expense</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories">
              <FaChartPie /> {!isCollapsed && <span>Categories</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/tags">
              <FaTags /> {!isCollapsed && <span>Tags</span>}
            </NavLink>
          </li>
          <li>
            <button onClick={onLogout} className="logout-button">
              <FaSignOutAlt /> {!isCollapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
