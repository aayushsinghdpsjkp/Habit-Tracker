# 🚀 Deployment Guide

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] Code committed to GitHub
- [ ] README updated
- [ ] API documentation complete

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel (Frontend)                    │
│              React App (habit-tracker.vercel.app)       │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ↓
┌─────────────────────────────────────────────────────────┐
│                    Render (Backend)                     │
│              Express API (habit-tracker-api.render.com) │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ↓
┌─────────────────────────────────────────────────────────┐
│              MongoDB Atlas (Database)                   │
│         Cloud MongoDB (habit-tracker-cluster)           │
└─────────────────────────────────────────────────────────┘
```

## Step 1: Prepare Code for Production

### Backend

1. Update `backend/server.js` for production:
```javascript
// Add this before app.listen()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}
```

2. Create `backend/.env.production`:
```
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
PORT=5000
NODE_ENV=production
```

### Frontend

1. Create `.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.render.com/api
```

2. Build frontend:
```bash
cd frontend
npm run build
```

## Step 2: Deploy Backend to Render

### Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Create new Web Service

### Configure Backend Service
1. **Name**: `habit-tracker-backend`
2. **Environment**: `Node`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Plan**: Free tier

### Set Environment Variables (CRITICAL)
In Render dashboard → Environment tab, add:
```
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key_here
NODE_ENV = production
FRONTEND_URL = https://your-frontend-url.onrender.com
PORT = 5000
```

**Important**: 
- `MONGODB_URI`: Get from MongoDB Atlas connection string
- `JWT_SECRET`: Use a long random string (e.g., `openssl rand -base64 32`)
- `FRONTEND_URL`: Set to your Render frontend URL (e.g., `https://habit-tracker-459n.onrender.com`)
- `NODE_ENV`: Must be `production` for proper error handling

### Deploy
- Push to GitHub
- Render auto-deploys
- Get your backend URL: `https://habit-tracker-backend-tan7onrender.com`

## Step 3: Deploy Frontend to Render (Static Site)

### Create Static Site on Render
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository

### Configure Frontend
1. **Name**: `habit-tracker-frontend`
2. **Build Command**: `cd frontend && npm run build`
3. **Publish Directory**: `frontend/build`

### Set Environment Variables (CRITICAL)
In Render dashboard → Environment tab, add:
```
REACT_APP_API_URL = https://habit-tracker-backend-tan7onrender.com/api
```

**Important**: 
- Replace `habit-tracker-backend-tan7onrender.com` with your actual backend URL
- This tells the frontend where to send API requests
- Without this, the frontend will try to call `http://localhost:5000/api` and fail

### Deploy
- Connect GitHub repo
- Render auto-deploys on push
- Get your frontend URL: `https://habit-tracker-459n.onrender.com`

### After Deployment
1. If environment variables were added after initial deploy, trigger a redeploy:
   - Go to Deploys tab
   - Click the three dots on latest deploy
   - Click "Redeploy"

## Step 4: Setup MongoDB Atlas

### Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster
3. Choose free tier
4. Select region closest to you

### Create Database User
1. Go to Database Access
2. Create new user
3. Save username and password

### Whitelist IPs (CRITICAL for Render)
1. Go to Network Access
2. Add IP Address
3. **For Render**: Click "Add Current IP" OR add `0.0.0.0/0` to allow all IPs
   - Render uses dynamic IPs, so `0.0.0.0/0` is recommended for free tier
   - For production, use Render's static IP if available

### Get Connection String
1. Click Connect
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<username>` and `<password>` with your database user credentials
5. Replace `<database>` with `habit-tracker` (or your preferred name)
6. Example: `mongodb+srv://user:password@cluster.mongodb.net/habit-tracker?retryWrites=true&w=majority`

## Step 5: Verify Deployment

### Test Backend
```bash
# Test if backend is running
curl https://habit-tracker-backend-tan7onrender.com/api/test

# Should return:
# {"message":"Backend is working!","timestamp":"2024-01-01T12:00:00.000Z"}
```

### Test Frontend
1. Open `https://habit-tracker-459n.onrender.com`
2. Try to register a new account
3. If you see "Cannot reach server" error:
   - Check that `REACT_APP_API_URL` is set correctly
   - Trigger a redeploy of the frontend
   - Check browser console (F12) for the actual error

### Test API Integration
1. Register on frontend
2. Create a habit
3. Check in to the habit
4. Verify data appears in MongoDB Atlas

### Common Issues & Fixes

**Issue**: "Registration failed" or "Cannot reach server"
- **Cause**: `REACT_APP_API_URL` not set or incorrect
- **Fix**: 
  1. Go to Render frontend settings
  2. Add/update `REACT_APP_API_URL` environment variable
  3. Trigger a redeploy

**Issue**: Backend returns 500 error
- **Cause**: `MONGODB_URI` not set or connection failed
- **Fix**:
  1. Check Render backend logs
  2. Verify `MONGODB_URI` is correct
  3. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`

**Issue**: CORS error in browser console
- **Cause**: `FRONTEND_URL` not set on backend
- **Fix**:
  1. Go to Render backend settings
  2. Add `FRONTEND_URL` environment variable
  3. Restart the backend service

## Monitoring & Maintenance

### Render Dashboard
- View logs
- Monitor performance
- Check error rates
- Restart service if needed

### Vercel Dashboard
- View deployments
- Check build logs
- Monitor performance
- View analytics

### MongoDB Atlas
- Monitor database performance
- Check storage usage
- View backup status
- Monitor connections

## Troubleshooting Deployment

### Backend Won't Start
```
Check Render logs:
- Verify environment variables
- Check MongoDB connection
- Look for syntax errors
```

### Frontend Can't Connect to Backend
```
Check:
- REACT_APP_API_URL is correct
- Backend is running
- CORS is enabled
- Check browser console
```

### Database Connection Error
```
Check:
- Connection string is correct
- IP is whitelisted
- Username/password correct
- Database exists
```

### Slow Performance
```
Optimize:
- Add database indexes
- Enable caching
- Compress responses
- Use CDN for static files
```

## Production Best Practices

### Security
- ✅ Use HTTPS everywhere
- ✅ Rotate JWT secrets regularly
- ✅ Use strong passwords
- ✅ Enable 2FA on accounts
- ✅ Regular security audits

### Performance
- ✅ Enable compression
- ✅ Add caching headers
- ✅ Optimize database queries
- ✅ Use CDN for static files
- ✅ Monitor response times

### Reliability
- ✅ Setup error monitoring (Sentry)
- ✅ Enable database backups
- ✅ Setup uptime monitoring
- ✅ Create runbooks for common issues
- ✅ Regular testing

### Maintenance
- ✅ Keep dependencies updated
- ✅ Monitor logs regularly
- ✅ Review performance metrics
- ✅ Plan capacity upgrades
- ✅ Document changes

## Scaling for Growth

### When to Scale
- Users > 1000
- Requests > 1000/day
- Database > 1GB
- Response time > 1s

### Scaling Options
1. **Upgrade Render Plan**: From free to paid
2. **Upgrade MongoDB**: From free to paid tier
3. **Add Caching**: Redis for session management
4. **Database Optimization**: Add indexes, optimize queries
5. **Load Balancing**: Multiple backend instances

## Rollback Procedure

### If Deployment Fails
1. **Render**: Click "Rollback" in dashboard
2. **Vercel**: Click "Rollback" in deployments
3. **MongoDB**: Restore from backup

### Manual Rollback
```bash
# Revert to previous commit
git revert <commit-hash>
git push

# Services auto-redeploy
```

## Monitoring Tools

### Recommended Services
- **Error Tracking**: Sentry
- **Performance**: New Relic
- **Uptime**: UptimeRobot
- **Analytics**: Google Analytics
- **Logs**: LogRocket

## Cost Estimation

### Free Tier (Recommended for Learning)
- Render: Free (sleeps after 15 min inactivity)
- Vercel: Free
- MongoDB Atlas: Free (512MB)
- **Total**: $0/month

### Paid Tier (Production)
- Render: $7/month (basic)
- Vercel: $20/month (pro)
- MongoDB Atlas: $57/month (M10)
- **Total**: ~$84/month

## Support & Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Docs](https://react.dev/)

---

**Deployment complete! Your app is live! 🎉**
