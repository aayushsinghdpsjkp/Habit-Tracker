import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          🔥 Habit Tracker
        </Link>
        
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/dashboard" className="nav-link">📊 Dashboard</Link>
          <Link to="/add-habit" className="nav-link">➕ Add Habit</Link>
          <Link to="/statistics" className="nav-link">📈 Statistics</Link>
          <Link to="/history" className="nav-link">📅 History</Link>
          <Link to="/leaderboard" className="nav-link">🏆 Leaderboard</Link>
          <Link to="/settings" className="nav-link">⚙️ Settings</Link>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
