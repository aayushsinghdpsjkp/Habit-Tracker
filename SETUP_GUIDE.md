# 🚀 Complete Setup Guide

## Step-by-Step Installation

### 1. Prerequisites Check

Make sure you have installed:
- Node.js v14+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git

Verify installation:
```bash
node --version
npm --version
git --version
```

### 2. MongoDB Setup

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and get your connection string
5. Replace `<password>` with your password
6. Copy the connection string

#### Option B: Local MongoDB
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017/habit-tracker`

### 3. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key_here
# PORT=5000
```

**Example .env:**
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/habit-tracker
JWT_SECRET=my_super_secret_jwt_key_12345
PORT=5000
NODE_ENV=development
```

### 4. Start Backend

```bash
# From backend directory
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### 5. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will automatically open at `http://localhost:3000`

### 6. Test the Application

1. **Register**: Create a new account
2. **Add Habit**: Click "Add Habit" and create one
3. **Check In**: Mark it complete
4. **Verify Streak**: Should show streak = 1
5. **Check Again Tomorrow**: Streak should increment

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |

### Frontend (.env)

Optional - defaults to `http://localhost:5000`

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Check MongoDB is running
- Verify connection string in .env
- For Atlas, check IP whitelist

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Backend CORS is already configured. Check:
- Backend is running on port 5000
- Frontend proxy in package.json is correct

### Module Not Found
```
Cannot find module 'express'
```
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

### Making Changes

**Backend Changes**:
- Edit files in `backend/`
- Server auto-restarts with nodemon
- Test with Postman or frontend

**Frontend Changes**:
- Edit files in `frontend/src/`
- Browser auto-refreshes
- Check console for errors

## Testing the API with Postman

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
```

Copy the token from response.

### 3. Create Habit
```
POST http://localhost:5000/api/habits
Headers:
  Authorization: Bearer <your_token>
Body (JSON):
{
  "title": "Gym",
  "description": "Go to gym for 1 hour"
}
```

### 4. Get All Habits
```
GET http://localhost:5000/api/habits
Headers:
  Authorization: Bearer <your_token>
```

### 5. Check Habit
```
POST http://localhost:5000/api/habits/<habit_id>/check
Headers:
  Authorization: Bearer <your_token>
```

## Production Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import project
4. Set `REACT_APP_API_URL` to your Render backend URL
5. Deploy

### MongoDB Atlas Setup

1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Add to backend environment variables

## Performance Tips

1. **Database Indexing**: Add indexes to frequently queried fields
2. **Caching**: Implement Redis for session management
3. **Pagination**: Add pagination to habit list
4. **Lazy Loading**: Load habits on demand
5. **Compression**: Enable gzip compression

## Security Checklist

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ CORS configured
- ✅ Environment variables for secrets
- ✅ Input validation on backend
- ✅ Authorization checks on routes

## Next Steps

1. ✅ Complete setup
2. ✅ Test all features
3. ✅ Customize styling
4. ✅ Add more features
5. ✅ Deploy to production
6. ✅ Share on GitHub

## Getting Help

- Check error messages carefully
- Review console logs (browser and terminal)
- Check MongoDB connection
- Verify environment variables
- Test API with Postman

---

**Happy coding! 🚀**
