import React, { useState, useEffect } from 'react';
import { habitAPI } from '../api/api';
import './Statistics.css';

function Statistics() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const totalStreak = habits.reduce((sum, h) => h.streak, 0);
  const totalCompletions = habits.reduce((sum, h) => sum + (h.completedDates?.length || 0), 0);
  const avgStreak = habits.length > 0 ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length) : 0;
  const longestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;
  const completionRate = habits.length > 0
    ? Math.round((totalCompletions / (habits.length * 30)) * 100)
    : 0;

  const topHabits = [...habits].sort((a, b) => b.streak - a.streak).slice(0, 5);
  const mostCompleted = [...habits].sort((a, b) => (b.completedDates?.length || 0) - (a.completedDates?.length || 0)).slice(0, 5);

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h1>📊 Statistics</h1>
        <p>Your habit tracking overview</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="overview-grid">
        <div className="overview-card">
          <span className="icon">🔥</span>
          <p className="label">Total Streak</p>
          <p className="value">{totalStreak}</p>
        </div>
        <div className="overview-card">
          <span className="icon">✅</span>
          <p className="label">Total Completions</p>
          <p className="value">{totalCompletions}</p>
        </div>
        <div className="overview-card">
          <span className="icon">📈</span>
          <p className="label">Average Streak</p>
          <p className="value">{avgStreak}</p>
        </div>
        <div className="overview-card">
          <span className="icon">🏆</span>
          <p className="label">Longest Streak</p>
          <p className="value">{longestStreak}</p>
        </div>
        <div className="overview-card">
          <span className="icon">📊</span>
          <p className="label">Completion Rate</p>
          <p className="value">{completionRate}%</p>
        </div>
        <div className="overview-card">
          <span className="icon">🎯</span>
          <p className="label">Active Habits</p>
          <p className="value">{habits.length}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>🔥 Top Streaks</h3>
          <div className="chart">
            {topHabits.length > 0 ? (
              topHabits.map((habit, idx) => (
                <div key={idx} className="chart-bar">
                  <div className="bar-label">{habit.title}</div>
                  <div className="bar-container">
                    <div
                      className="bar"
                      style={{ width: `${(habit.streak / longestStreak) * 100}%` }}
                    >
                      <span className="bar-value">{habit.streak}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No habits yet</p>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h3>✅ Most Completed</h3>
          <div className="chart">
            {mostCompleted.length > 0 ? (
              mostCompleted.map((habit, idx) => (
                <div key={idx} className="chart-bar">
                  <div className="bar-label">{habit.title}</div>
                  <div className="bar-container">
                    <div
                      className="bar completed"
                      style={{ width: `${((habit.completedDates?.length || 0) / Math.max(...mostCompleted.map(h => h.completedDates?.length || 0))) * 100}%` }}
                    >
                      <span className="bar-value">{habit.completedDates?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No completions yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="insights-card">
        <h3>💡 Insights</h3>
        <ul className="insights-list">
          {habits.length === 0 && <li>Create your first habit to start tracking!</li>}
          {habits.length > 0 && longestStreak > 0 && <li>Your longest streak is <strong>{longestStreak} days</strong>! Keep it up! 🔥</li>}
          {habits.length > 0 && completionRate > 80 && <li>Excellent completion rate of <strong>{completionRate}%</strong>! You're crushing it! 💪</li>}
          {habits.length > 0 && completionRate < 50 && <li>Try to increase your completion rate. Consistency is key! 📈</li>}
          {habits.length > 3 && <li>You're tracking <strong>{habits.length} habits</strong>. Focus on quality over quantity!</li>}
          {habits.length > 0 && <li>Average streak: <strong>{avgStreak} days</strong></li>}
        </ul>
      </div>
    </div>
  );
}

export default Statistics;
