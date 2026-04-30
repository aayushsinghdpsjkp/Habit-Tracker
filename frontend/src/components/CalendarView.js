import React, { useState } from 'react';
import { habitAPI } from '../api/api';
import './CalendarView.css';

function CalendarView({ habits, onUpdate, onDelete }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState('');

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const isDateCompleted = (habit, day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return habit.completedDates?.includes(dateStr);
  };

  const handleDateClick = async (habit, day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Only allow checking in for today
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    if (dateStr !== todayStr) {
      setError('You can only check in for today');
      setTimeout(() => setError(''), 3000);
      return;
    }

    console.log('Clicked day:', day);
    console.log('Date string:', dateStr);

    try {
      const response = await habitAPI.checkHabit(habit._id, dateStr);
      console.log('Updated habit:', response.data.habit);
      onUpdate(response.data.habit);
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Error completing habit');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = async (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      try {
        await habitAPI.deleteHabit(habitId);
        onDelete(habitId);
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting habit');
      }
    }
  };

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="calendar-view">
      {error && <div className="error-box">{error}</div>}

      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="nav-btn">←</button>
        <h2>{monthName}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="nav-btn">→</button>
      </div>

      {habits.length === 0 ? (
        <div className="empty-state">No habits yet</div>
      ) : (
        <div className="calendar-grid-wrapper">
          <div className="calendar-grid">
            {/* Header Row */}
            <div className="grid-row header-row">
              <div className="grid-cell habit-header">Habits</div>
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dayOfWeek = dayNames[date.getDay()];
                return (
                  <div key={day} className="grid-cell day-header">
                    <div className="day-name">{dayOfWeek}</div>
                    <div className="day-number">{day}</div>
                  </div>
                );
              })}
            </div>

            {/* Habit Rows */}
            {habits.map(habit => (
              <div key={habit._id} className="grid-row habit-row">
                <div className="grid-cell habit-cell">
                  <div className="habit-title">{habit.title}</div>
                  <div className="habit-meta">
                    <span className="streak">🔥 {habit.streak}</span>
                    <button className="delete-btn" onClick={() => handleDelete(habit._id)}>✕</button>
                  </div>
                </div>
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const completed = isDateCompleted(habit, day);
                  
                  // Check if this is today
                  const today = new Date();
                  const isToday = day === today.getDate() && 
                                 currentDate.getMonth() === today.getMonth() &&
                                 currentDate.getFullYear() === today.getFullYear();
                  
                  return (
                    <div
                      key={day}
                      className={`grid-cell day-cell ${completed ? 'completed' : ''} ${isToday ? 'today' : ''}`}
                      onClick={() => handleDateClick(habit, day)}
                    >
                      {completed && <span className="check">✓</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;
