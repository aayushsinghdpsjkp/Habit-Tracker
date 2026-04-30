import React, { useState, useEffect } from 'react';
import { habitAPI } from '../api/api';
import HabitCard from '../components/HabitCard';
import CalendarView from '../components/CalendarView';
import './Dashboard.css';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'cards'

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await habitAPI.getHabits();
      setHabits(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedHabit) => {
    setHabits(habits.map(h => h._id === updatedHabit._id ? updatedHabit : h));
  };

  const handleDelete = (habitId) => {
    setHabits(habits.filter(h => h._id !== habitId));
  };

  if (loading) {
    return <div className="dashboard-loading">Loading your habits...</div>;
  }

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const totalCompleted = habits.reduce((sum, h) => sum + (h.completedDates?.length || 0), 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Habits</h1>
        <p>Track your daily progress and build streaks 🔥</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div>
            <p className="stat-label">Total Streak</p>
            <p className="stat-number">{totalStreak}</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div>
            <p className="stat-label">Total Completions</p>
            <p className="stat-number">{totalCompleted}</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div>
            <p className="stat-label">Active Habits</p>
            <p className="stat-number">{habits.length}</p>
          </div>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="empty-state">
          <p>No habits yet. Create one to get started! 🚀</p>
        </div>
      ) : (
        <>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              📅 Calendar View
            </button>
            <button
              className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
            >
              🎴 Card View
            </button>
          </div>

          {viewMode === 'calendar' ? (
            <CalendarView habits={habits} onUpdate={handleUpdate} onDelete={handleDelete} />
          ) : (
            <div className="habits-grid">
              {habits.map(habit => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
