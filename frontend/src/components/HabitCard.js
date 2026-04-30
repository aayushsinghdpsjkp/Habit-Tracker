import React, { useState } from 'react';
import { habitAPI } from '../api/api';
import './HabitCard.css';

function HabitCard({ habit, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    try {
      // Send today's date
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      const response = await habitAPI.checkHabit(habit._id, todayStr);
      onUpdate(response.data.habit);
    } catch (err) {
      setError(err.response?.data?.message || 'Error completing habit');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await habitAPI.deleteHabit(habit._id);
        onDelete(habit._id);
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting habit');
      }
    }
  };

  const isCompletedToday = habit.completedDates?.includes(
    new Date().toISOString().split('T')[0]
  );

  return (
    <div className="habit-card">
      <div className="habit-header">
        <h3>{habit.title}</h3>
        <button
          className="delete-btn"
          onClick={handleDelete}
          title="Delete habit"
        >
          ✕
        </button>
      </div>

      {habit.description && (
        <p className="habit-description">{habit.description}</p>
      )}

      <div className="habit-stats">
        <div className="stat">
          <span className="stat-label">Streak</span>
          <span className="stat-value">
            🔥 {habit.streak}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">
            ✅ {habit.completedDates?.length || 0}
          </span>
        </div>
      </div>

      {habit.lastCompleted && (
        <p className="last-completed">
          Last: {new Date(habit.lastCompleted).toLocaleDateString()}
        </p>
      )}

      {error && <p className="error-message">{error}</p>}

      <button
        className={`check-btn ${isCompletedToday ? 'completed' : ''}`}
        onClick={handleCheck}
        disabled={loading || isCompletedToday}
      >
        {isCompletedToday ? '✓ Completed Today' : 'Mark Complete'}
      </button>
    </div>
  );
}

export default HabitCard;
