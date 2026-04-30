import React, { useState, useEffect } from 'react';
import { habitAPI } from '../api/api';
import './History.css';

function History() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await habitAPI.getHabits();
      setHabits(response.data);
      if (response.data.length > 0) {
        setSelectedHabit(response.data[0]._id);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const currentHabit = habits.find(h => h._id === selectedHabit);
  const sortedDates = currentHabit?.completedDates?.slice().reverse() || [];

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>📅 History</h1>
        <p>View your completion history</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      {habits.length === 0 ? (
        <div className="empty-state">
          <p>No habits yet. Create one to start tracking!</p>
        </div>
      ) : (
        <div className="history-content">
          <div className="habit-selector">
            <h3>Select Habit</h3>
            <div className="habit-buttons">
              {habits.map(habit => (
                <button
                  key={habit._id}
                  className={`habit-btn ${selectedHabit === habit._id ? 'active' : ''}`}
                  onClick={() => setSelectedHabit(habit._id)}
                >
                  {habit.title}
                  <span className="count">{habit.completedDates?.length || 0}</span>
                </button>
              ))}
            </div>
          </div>

          {currentHabit && (
            <div className="history-details">
              <div className="habit-info">
                <h2>{currentHabit.title}</h2>
                <div className="info-stats">
                  <div className="info-stat">
                    <span className="label">Total Completions</span>
                    <span className="value">{sortedDates.length}</span>
                  </div>
                  <div className="info-stat">
                    <span className="label">Current Streak</span>
                    <span className="value">🔥 {currentHabit.streak}</span>
                  </div>
                  <div className="info-stat">
                    <span className="label">Last Completed</span>
                    <span className="value">{currentHabit.lastCompleted ? new Date(currentHabit.lastCompleted).toLocaleDateString() : 'Never'}</span>
                  </div>
                </div>
              </div>

              <div className="timeline">
                <h3>Completion Timeline</h3>
                {sortedDates.length > 0 ? (
                  <div className="dates-timeline">
                    {sortedDates.map((date, idx) => {
                      const dateObj = new Date(date);
                      const isToday = date === new Date().toISOString().split('T')[0];
                      return (
                        <div key={idx} className={`timeline-item ${isToday ? 'today' : ''}`}>
                          <div className="timeline-marker">✓</div>
                          <div className="timeline-content">
                            <p className="date">{dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="time">{dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          {isToday && <span className="today-badge">Today</span>}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="no-data">No completions yet. Start tracking!</p>
                )}
              </div>

              <div className="stats-breakdown">
                <h3>Statistics</h3>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span className="label">Days Since Created</span>
                    <span className="value">{Math.ceil((new Date() - new Date(currentHabit.createdAt)) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Completion Rate</span>
                    <span className="value">
                      {Math.round((sortedDates.length / Math.max(1, Math.ceil((new Date() - new Date(currentHabit.createdAt)) / (1000 * 60 * 60 * 24)))) * 100)}%
                    </span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Average Days Between</span>
                    <span className="value">
                      {sortedDates.length > 1
                        ? Math.round(Math.ceil((new Date() - new Date(currentHabit.createdAt)) / (1000 * 60 * 60 * 24)) / sortedDates.length)
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default History;
