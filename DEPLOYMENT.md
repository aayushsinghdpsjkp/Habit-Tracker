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
1. **Name**: `habit-tracker-api`
2. **Environment**: `Node`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Plan**: Free tier

### Set Environment Variables
In Render dashboard:
```
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
NODE_ENV = production
```

### Deploy
- Push to GitHub
- Render auto-deploys
- Get your backend URL: `https://habit-tracker-api.render.com`

## Step 3: Deploy Frontend to Vercel

### Create Vercel Account
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project

### Configure Frontend
1. **Framework**: React
2. **Build Command**: `npm run build`
3. **Output Directory**: `build`

### Set Environment Variables
```
REACT_APP_API_URL=https://habit-tracker-api.render.com/api
```

### Deploy
- Connect GitHub repo
- Vercel auto-deploys on push
- Get your frontend URL: `https://habit-tracker.vercel.app`

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

### Whitelist IPs
1. Go to Network Access
2. Add IP Address
3. For development: Add `0.0.0.0/0` (allow all)
4. For production: Add specific IPs

### Get Connection String
1. Click Connect
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your password

## Step 5: Verify Deployment

### Test Backend
```bash
curl https://habit-tracker-api.render.com/api/auth/me
# Should return 401 (no token)
```

### Test Frontend
1. Open `https://habit-tracker.vercel.app`
2. Register new account
3. Create habit
4. Check in
5. Verify streak works

### Test API Integration
1. Register on frontend
2. Create habit
3. Check in
4. Verify data in MongoDB Atlas

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
