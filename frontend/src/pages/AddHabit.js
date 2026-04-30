import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitAPI } from '../api/api';
import './AddHabit.css';

function AddHabit() {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await habitAPI.createHabit(formData.title, formData.description);
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('Cannot reach server. Please check your connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-habit-container">
      <div className="add-habit-card">
        <h1>Create New Habit</h1>
        <p>Start building a new habit today! 🚀</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Habit Name *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Gym, Coding, Reading"
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Why is this habit important? What's your goal?"
              rows="4"
              maxLength="200"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Creating...' : 'Create Habit'}
            </button>
          </div>
        </form>

        <div className="tips">
          <h3>💡 Tips for Success</h3>
          <ul>
            <li>Start with habits you can do daily</li>
            <li>Keep it simple and specific</li>
            <li>Build streaks by checking in every day</li>
            <li>Don't break the chain! 🔥</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddHabit;
