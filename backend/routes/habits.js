const express = require('express');
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');
const { getTodayString, getYesterdayString, isToday } = require('../utils/dateUtils');

const router = express.Router();

// Create habit
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const habit = new Habit({
      userId: req.userId,
      title,
      description: description || ''
    });

    await habit.save();
    res.status(201).json({ message: 'Habit created', habit });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all habits for user
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single habit
router.get('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check authorization
    if (habit.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark habit as completed (Core Streak Logic)
router.post('/:id/check', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check authorization
    if (habit.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Use the EXACT date sent from frontend
    const targetDate = req.body.date;
    
    if (!targetDate) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const yesterday = new Date(new Date(targetDate).getTime() - 86400000).toISOString().split('T')[0];

    // Prevent multiple check-ins per day
    if (habit.completedDates.includes(targetDate)) {
      return res.status(400).json({ message: 'Already completed for this date' });
    }

    // Streak Logic
    if (habit.lastCompleted === yesterday) {
      // Continuous streak - increment
      habit.streak += 1;
    } else {
      // Reset streak (either first time or missed a day)
      habit.streak = 1;
    }

    habit.lastCompleted = targetDate;
    habit.completedDates.push(targetDate);
    habit.updatedAt = new Date();

    await habit.save();

    res.json({
      message: 'Habit completed',
      habit,
      streakInfo: {
        streak: habit.streak,
        lastCompleted: habit.lastCompleted
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update habit
router.put('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check authorization
    if (habit.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, description } = req.body;

    if (title) habit.title = title;
    if (description !== undefined) habit.description = description;
    habit.updatedAt = new Date();

    await habit.save();

    res.json({ message: 'Habit updated', habit });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check authorization
    if (habit.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Habit.findByIdAndDelete(req.params.id);

    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get habit statistics
router.get('/:id/stats', auth, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check authorization
    if (habit.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const stats = {
      title: habit.title,
      currentStreak: habit.streak,
      totalCompletions: habit.completedDates.length,
      lastCompleted: habit.lastCompleted,
      createdAt: habit.createdAt,
      completedDates: habit.completedDates
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
