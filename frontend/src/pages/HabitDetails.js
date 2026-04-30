import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { habitAPI } from '../api/api';
import './HabitDetails.css';

function HabitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchHabit();
  }, [id]);

  const fetchHabit = async () => {
    try {
      const response = await habitAPI.getHabit(id);
      setHabit(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch habit');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await habitAPI.updateHabit(id, formData.title, formData.description);
      setHabit(response.data.habit);
      setEditing(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update habit');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this habit permanently?')) {
      try {
        await habitAPI.deleteHabit(id);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete habit');
      }
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await habitAPI.checkHabit(id);
      setHabit(response.data.habit);
    } catch (err) {
      setError(err.response?.data?.message || 'Error checking in');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const isCompletedToday = habit?.completedDates?.includes(
    new Date().toISOString().split('T')[0]
  );

  const completionRate = habit?.completedDates?.length > 0
    ? Math.round((habit.completedDates.length / Math.max(1, Math.ceil((new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24)))) * 100)
    : 0;

  return (
    <div className="habit-details-container">
      <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>

      {error && <div className="error-box">{error}</div>}

      <div className="habit-details-card">
        {!editing ? (
          <>
            <div className="details-header">
              <div>
                <h1>{habit?.title}</h1>
                {habit?.description && <p className="description">{habit.description}</p>}
              </div>
              <div className="header-actions">
                <button onClick={() => setEditing(true)} className="edit-btn">✏️ Edit</button>
                <button onClick={handleDelete} className="delete-btn">🗑️ Delete</button>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-icon">🔥</span>
                <p className="stat-label">Current Streak</p>
                <p className="stat-value">{habit?.streak}</p>
              </div>
              <div className="stat-box">
                <span className="stat-icon">✅</span>
                <p className="stat-label">Total Completions</p>
                <p className="stat-value">{habit?.completedDates?.length || 0}</p>
              </div>
              <div className="stat-box">
                <span className="stat-icon">📊</span>
                <p className="stat-label">Completion Rate</p>
                <p className="stat-value">{completionRate}%</p>
              </div>
              <div className="stat-box">
                <span className="stat-icon">📅</span>
                <p className="stat-label">Days Active</p>
                <p className="stat-value">{Math.ceil((new Date() - new Date(habit?.createdAt)) / (1000 * 60 * 60 * 24))}</p>
              </div>
            </div>

            <div className="check-in-section">
              <button
                onClick={handleCheckIn}
                disabled={isCompletedToday}
                className={`check-in-btn ${isCompletedToday ? 'completed' : ''}`}
              >
                {isCompletedToday ? '✓ Completed Today' : '📍 Check In Today'}
              </button>
            </div>

            <div className="completion-history">
              <h3>Recent Completions</h3>
              <div className="dates-list">
                {habit?.completedDates?.slice().reverse().slice(0, 10).map((date, idx) => (
                  <span key={idx} className="date-badge">{new Date(date).toLocaleDateString()}</span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="edit-form">
            <h2>Edit Habit</h2>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default HabitDetails;
