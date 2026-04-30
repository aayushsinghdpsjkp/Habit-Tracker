# 🔥 Habit Tracker with Streak System

A full-stack MERN application for tracking daily habits and building streaks. Perfect for demonstrating real-world skills to recruiters.

## Features

### Core Features
- ✅ User authentication (Register/Login with JWT)
- 📝 Create and manage habits
- 🔥 Automatic streak tracking
- 📊 Daily check-in system
- 🗑️ Delete habits

### Advanced Features
- 📈 Progress statistics
- 🎯 Prevent multiple check-ins per day
- 📅 Track completed dates
- 🔐 Secure password hashing with bcryptjs
- 🎨 Beautiful, responsive UI

## Tech Stack

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure

```
habit-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Habit.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── habits.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── dateUtils.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── AddHabit.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── HabitCard.js
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/habit-tracker
JWT_SECRET=your_super_secret_key_here
PORT=5000
NODE_ENV=development
```

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Frontend will open on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Habits
- `POST /api/habits` - Create habit
- `GET /api/habits` - Get all habits for user
- `GET /api/habits/:id` - Get single habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/check` - Mark habit as completed
- `GET /api/habits/:id/stats` - Get habit statistics

## Streak Logic (Core Feature)

The streak system works as follows:

```javascript
const today = getTodayString();
const yesterday = getYesterdayString();

if (habit.lastCompleted === yesterday) {
  // Continuous streak - increment
  habit.streak += 1;
} else {
  // Reset streak (either first time or missed a day)
  habit.streak = 1;
}

habit.lastCompleted = today;
habit.completedDates.push(today);
```

### Examples
- **Day 1**: Check in → streak = 1
- **Day 2**: Check in → streak = 2 (yesterday was completed)
- **Day 3**: Miss → Skip
- **Day 4**: Check in → streak = 1 (reset, missed yesterday)

## Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Habit Schema
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  streak: Number,
  lastCompleted: String (YYYY-MM-DD),
  completedDates: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set build command: `npm run build`
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to backend `.env`

## Common Issues & Solutions

### Issue: Timezone problems with dates
**Solution**: Use `toISOString().split('T')[0]` for consistent date formatting

### Issue: Multiple check-ins per day
**Solution**: Check if date already exists in `completedDates` array

### Issue: Streak resets unexpectedly
**Solution**: Verify date comparison logic and timezone handling

## Future Enhancements

- 📱 Mobile app (React Native)
- 🔔 Push notifications
- 📊 Advanced analytics & charts
- 🎯 Habit categories
- 👥 Social features (share streaks)
- 🌙 Dark mode
- 📅 Calendar view
- 🏆 Achievements/badges

## Why This Project Stands Out

✅ **Real-world logic** - Streak system shows problem-solving skills
✅ **Full MERN stack** - Demonstrates complete development capability
✅ **Authentication** - Shows security awareness
✅ **Data handling** - Complex date logic and streak calculations
✅ **Responsive design** - Works on all devices
✅ **Production-ready** - Can be deployed and used

## License

MIT

## Author

Built with ❤️ for learning and recruitment

---

**Happy habit tracking! 🔥**
