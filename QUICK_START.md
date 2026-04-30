# ⚡ Quick Start (5 minutes)

## Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier)

## Step 1: Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account → Create cluster → Get connection string
3. Copy your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/...`)

## Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=your_connection_string_here" > .env
echo "JWT_SECRET=your_secret_key_here" >> .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env

# Start backend
npm run dev
```

Wait for: `Server running on port 5000` and `MongoDB connected`

## Step 3: Setup Frontend (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

Browser opens automatically at `http://localhost:3000`

## Step 4: Test It!

1. **Register**: Create account with email/password
2. **Add Habit**: Click "Add Habit" → Enter "Gym"
3. **Check In**: Click "Mark Complete"
4. **See Streak**: Should show 🔥 1

## That's It! 🎉

Your habit tracker is running!

### Next Steps
- Add more habits
- Check in daily to build streaks
- Read SETUP_GUIDE.md for detailed info
- Deploy to production (see README.md)

### Troubleshooting

**Backend won't start?**
- Check MongoDB connection string
- Verify .env file exists
- Check port 5000 is free

**Frontend won't connect?**
- Check backend is running
- Check browser console for errors
- Verify API URL in frontend

**MongoDB error?**
- Check connection string
- Verify IP whitelist on Atlas
- Check username/password

---

**Questions? Check SETUP_GUIDE.md for detailed help!**
