# ✅ Deployment Checklist for Render

Follow this step-by-step to deploy your Habit Tracker to Render.

---

## Phase 1: Preparation (Local)

- [ ] Clone/pull latest code from GitHub
- [ ] Run `npm install` in both `backend/` and `frontend/` directories
- [ ] Test locally: `npm run dev` in backend, `npm start` in frontend
- [ ] Verify all features work locally
- [ ] Commit all changes to GitHub

---

## Phase 2: MongoDB Atlas Setup

### Create MongoDB Cluster
- [ ] Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create new cluster (free tier)
- [ ] Select region closest to you
- [ ] Wait for cluster to be created (5-10 minutes)

### Create Database User
- [ ] Go to "Database Access"
- [ ] Click "Add New Database User"
- [ ] Create username and password
- [ ] Save credentials securely
- [ ] Click "Add User"

### Whitelist IPs
- [ ] Go to "Network Access"
- [ ] Click "Add IP Address"
- [ ] Enter `0.0.0.0/0` (allows all IPs - needed for Render)
- [ ] Click "Confirm"

### Get Connection String
- [ ] Click "Connect" on your cluster
- [ ] Choose "Connect your application"
- [ ] Copy the connection string
- [ ] Replace `<username>` with your database user
- [ ] Replace `<password>` with your database password
- [ ] Replace `<database>` with `habit-tracker`
- [ ] Save this string - you'll need it for Render

**Example:**
```
mongodb+srv://myuser:mypassword@cluster.mongodb.net/habit-tracker?retryWrites=true&w=majority
```

---

## Phase 3: Backend Deployment (Render)

### Create Render Account
- [ ] Go to [Render.com](https://render.com)
- [ ] Sign up with GitHub
- [ ] Authorize Render to access your GitHub

### Create Backend Service
- [ ] Click "New +" → "Web Service"
- [ ] Select your GitHub repository
- [ ] Click "Connect"

### Configure Backend Service
- [ ] **Name**: `habit-tracker-backend`
- [ ] **Environment**: `Node`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Plan**: Free
- [ ] Click "Create Web Service"

### Set Environment Variables
- [ ] Go to "Environment" tab
- [ ] Click "Add Environment Variable"
- [ ] Add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string from Phase 2 |
| `JWT_SECRET` | Generate random string: `openssl rand -base64 32` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Leave blank for now, will update after frontend deploy |
| `PORT` | `5000` |

- [ ] Click "Save"
- [ ] Wait for deployment to complete (2-5 minutes)
- [ ] Copy your backend URL (e.g., `https://habit-tracker-backend-xxxx.onrender.com`)

### Verify Backend
- [ ] Go to your backend URL + `/api/test`
- [ ] Should see: `{"message":"Backend is working!","timestamp":"..."}`
- [ ] If error, check Render logs for issues

---

## Phase 4: Frontend Deployment (Render Static Site)

### Create Frontend Static Site
- [ ] Go to [Render.com](https://render.com)
- [ ] Click "New +" → "Static Site"
- [ ] Select your GitHub repository
- [ ] Click "Connect"

### Configure Frontend
- [ ] **Name**: `habit-tracker-frontend`
- [ ] **Build Command**: `cd frontend && npm run build`
- [ ] **Publish Directory**: `frontend/build`
- [ ] Click "Create Static Site"

### Set Environment Variables
- [ ] Go to "Environment" tab
- [ ] Click "Add Environment Variable"
- [ ] Add this variable:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | Your backend URL + `/api` (e.g., `https://habit-tracker-backend-xxxx.onrender.com/api`) |

- [ ] Click "Save"
- [ ] **Important**: Trigger a redeploy:
  - [ ] Go to "Deploys" tab
  - [ ] Click three dots on latest deploy
  - [ ] Click "Redeploy"
- [ ] Wait for deployment to complete
- [ ] Copy your frontend URL (e.g., `https://habit-tracker-xxxx.onrender.com`)

---

## Phase 5: Update Backend with Frontend URL

### Add Frontend URL to Backend
- [ ] Go back to your backend service on Render
- [ ] Go to "Environment" tab
- [ ] Update `FRONTEND_URL` with your frontend URL
- [ ] Click "Save"
- [ ] Restart backend service:
  - [ ] Go to "Settings" tab
  - [ ] Click "Restart Service"

---

## Phase 6: Testing

### Test Frontend Access
- [ ] Open your frontend URL in browser
- [ ] Should see login/register page
- [ ] Check browser console (F12) for errors

### Test Registration
- [ ] Click "Register"
- [ ] Fill in name, email, password
- [ ] Click "Register"
- [ ] Should redirect to dashboard
- [ ] If error, check console for details

### Test Habit Creation
- [ ] Click "Add Habit"
- [ ] Enter habit name and description
- [ ] Click "Create Habit"
- [ ] Should appear on dashboard

### Test Check-In
- [ ] Click "Mark Complete" on a habit
- [ ] Streak should increase
- [ ] Button should show "✓ Completed Today"

### Test Other Features
- [ ] Click on habit to view details
- [ ] Edit habit
- [ ] Delete habit
- [ ] Change password in settings
- [ ] Logout and login again

---

## Phase 7: Troubleshooting

### Issue: "Cannot reach server" error
**Solution:**
1. Check `REACT_APP_API_URL` is set correctly on frontend
2. Verify backend URL is correct
3. Trigger frontend redeploy
4. Check browser console for exact error

### Issue: Backend returns 500 error
**Solution:**
1. Check Render backend logs
2. Verify `MONGODB_URI` is correct
3. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
4. Restart backend service

### Issue: CORS error in console
**Solution:**
1. Verify `FRONTEND_URL` is set on backend
2. Restart backend service
3. Check that frontend URL matches exactly

### Issue: Registration fails
**Solution:**
1. Check browser console for error message
2. Check Render backend logs
3. Verify MongoDB connection is working
4. Try creating a new user with different email

### Issue: Check-in doesn't work
**Solution:**
1. Refresh page
2. Check browser console for errors
3. Verify backend is running
4. Check Render logs for API errors

---

## Phase 8: Monitoring

### Daily Checks
- [ ] Test login/register
- [ ] Test habit creation
- [ ] Test check-in
- [ ] Check Render logs for errors

### Weekly Checks
- [ ] Review Render dashboard
- [ ] Check MongoDB storage usage
- [ ] Monitor response times
- [ ] Check for any error patterns

### Monthly Checks
- [ ] Review all features
- [ ] Check for performance issues
- [ ] Update dependencies if needed
- [ ] Backup important data

---

## Phase 9: Maintenance

### If You Need to Update Code
1. Make changes locally
2. Test thoroughly
3. Commit to GitHub
4. Render auto-deploys
5. Test on production

### If Something Breaks
1. Check Render logs
2. Check browser console
3. Verify environment variables
4. Restart service if needed
5. Rollback if necessary

### Updating Environment Variables
1. Go to Render service
2. Go to "Environment" tab
3. Update variable
4. Click "Save"
5. Restart service (if needed)

---

## Success Criteria ✅

Your deployment is successful when:
- [ ] Frontend loads without errors
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can create habits
- [ ] Can check in to habits
- [ ] Streaks increment correctly
- [ ] Can edit and delete habits
- [ ] Can change password
- [ ] No CORS errors
- [ ] No network errors
- [ ] All features work as expected

---

## Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `https://habit-tracker-xxxx.onrender.com` | User interface |
| Backend | `https://habit-tracker-backend-xxxx.onrender.com` | API server |
| MongoDB | `mongodb+srv://...` | Database |
| Render Dashboard | `https://dashboard.render.com` | Manage services |
| MongoDB Atlas | `https://cloud.mongodb.com` | Manage database |

---

## Support

If you encounter issues:
1. Check the FIXES_APPLIED.md file
2. Review DEPLOYMENT.md for detailed instructions
3. Check Render logs for error messages
4. Check browser console (F12) for client errors
5. Verify all environment variables are set correctly

---

**Good luck! Your app will be live soon! 🚀**

