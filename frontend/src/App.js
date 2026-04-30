import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddHabit from './pages/AddHabit';
import HabitDetails from './pages/HabitDetails';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Leaderboard from './pages/Leaderboard';
import History from './pages/History';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    
    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/add-habit"
          element={
            isAuthenticated ? (
              <AddHabit />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/habit/:id"
          element={
            isAuthenticated ? (
              <HabitDetails />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/statistics"
          element={
            isAuthenticated ? (
              <Statistics />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/history"
          element={
            isAuthenticated ? (
              <History />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/leaderboard"
          element={
            isAuthenticated ? (
              <Leaderboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <Settings setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
