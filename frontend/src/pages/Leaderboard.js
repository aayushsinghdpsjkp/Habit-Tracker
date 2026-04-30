import React, { useState, useEffect } from 'react';
import { habitAPI } from '../api/api';
import './Leaderboard.css';

function Leaderboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('streak');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await habitAPI.getHabits();
      setHabits(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  let sortedHabits = [...habits];
  if (sortBy === 'streak') {
    sortedHabits.sort((a, b) => b.streak - a.streak);
  } else if (sortBy === 'completions') {
    sortedHabits.sort((a, b) => (b.completedDates?.length || 0) - (a.completedDates?.length || 0));
  } else if (sortBy === 'recent') {
    sortedHabits.sort((a, b) => new Date(b.lastCompleted || 0) - new Date(a.lastCompleted || 0));
  }

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return '#ff6b6b';
    if (streak >= 20) return '#ffa94d';
    if (streak >= 10) return '#ffd43b';
    if (streak >= 5) return '#51cf66';
    return '#667eea';
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>🏆 Leaderboard</h1>
        <p>Your habit rankings</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="sort-buttons">
        <button
          className={`sort-btn ${sortBy === 'streak' ? 'active' : ''}`}
          onClick={() => setSortBy('streak')}
        >
          🔥 By Streak
        </button>
        <button
          className={`sort-btn ${sortBy === 'completions' ? 'active' : ''}`}
          onClick={() => setSortBy('completions')}
        >
          ✅ By Completions
        </button>
        <button
          className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`}
          onClick={() => setSortBy('recent')}
        >
          📅 Most Recent
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="empty-state">
          <p>No habits yet. Create one to start competing!</p>
        </div>
      ) : (
        <div className="leaderboard-list">
          {sortedHabits.map((habit, index) => (
            <div key={habit._id} className={`leaderboard-item rank-${index}`}>
              <div className="rank">
                <span className="medal">{getMedalEmoji(index)}</span>
              </div>

              <div className="habit-name">
                <h3>{habit.title}</h3>
                {habit.description && <p>{habit.description}</p>}
              </div>

              <div className="stats">
                <div className="stat">
                  <span className="label">Streak</span>
                  <span
                    className="value streak"
                    style={{ color: getStreakColor(habit.streak) }}
                  >
                    🔥 {habit.streak}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Completions</span>
                  <span className="value">✅ {habit.completedDates?.length || 0}</span>
                </div>
                <div className="stat">
                  <span className="label">Last Done</span>
                  <span className="value">
                    {habit.lastCompleted
                      ? new Date(habit.lastCompleted).toLocaleDateString()
                      : 'Never'}
                  </span>
                </div>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(100, (habit.streak / 30) * 100)}%`,
                    backgroundColor: getStreakColor(habit.streak)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="leaderboard-info">
        <h3>📊 How It Works</h3>
        <ul>
          <li><strong>Streak:</strong> Consecutive days of completion</li>
          <li><strong>Completions:</strong> Total number of times completed</li>
          <li><strong>Recent:</strong> Last time you checked in</li>
          <li>🔥 Red = 30+ day streak (Amazing!)</li>
          <li>🟠 Orange = 20+ day streak (Great!)</li>
          <li>🟡 Yellow = 10+ day streak (Good!)</li>
          <li>🟢 Green = 5+ day streak (Nice!)</li>
          <li>🔵 Blue = Starting out</li>
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
