import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import './Settings.css';

function Settings({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUser();
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data);
      setError('');
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

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError('Please fill in all password fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      const response = await authAPI.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setSuccess('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Invalid request');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.request) {
        setError('Cannot reach server. Please check your connection.');
      } else {
        setError(err.message || 'Failed to change password');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure? This cannot be undone!')) {
      // In a real app, you'd call an API to delete the account
      handleLogout();
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your account and preferences</p>
      </div>

      {error && <div className="error-box">{error}</div>}
      {success && <div className="success-box">{success}</div>}

      <div className="settings-content">
        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            🎨 Preferences
          </button>
          <button
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Security
          </button>
        </div>

        <div className="settings-panel">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <h2>Profile Information</h2>
              <div className="profile-info">
                <div className="info-item">
                  <label>Name</label>
                  <p>{user?.name}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{user?.email}</p>
                </div>
                <div className="info-item">
                  <label>Member Since</label>
                  <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="tab-content">
              <h2>Preferences</h2>
              <div className="preference-group">
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Dark Mode</h3>
                    <p>Enable dark theme for the app</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                  />
                </div>
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Notifications</h3>
                    <p>Receive daily reminders</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </div>
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Email Digest</h3>
                    <p>Weekly summary of your habits</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-content">
              <h2>Security</h2>
              <div className="security-section">
                <div className="security-item">
                  <h3>Change Password</h3>
                  <p>Update your password to keep your account secure</p>
                  
                  {!showPasswordForm ? (
                    <button 
                      className="action-btn"
                      onClick={() => setShowPasswordForm(true)}
                    >
                      Change Password
                    </button>
                  ) : (
                    <form onSubmit={handlePasswordChange} className="password-form">
                      <div className="form-group">
                        <label>Current Password</label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value
                          })}
                          placeholder="Enter current password"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value
                          })}
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value
                          })}
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                      
                      <div className="form-actions">
                        <button type="submit" className="action-btn">
                          Update Password
                        </button>
                        <button 
                          type="button" 
                          className="cancel-btn"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                            setError('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="settings-actions">
        <button onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </button>
        <button onClick={handleDeleteAccount} className="delete-btn">
          🗑️ Delete Account
        </button>
      </div>
    </div>
  );
}

export default Settings;
