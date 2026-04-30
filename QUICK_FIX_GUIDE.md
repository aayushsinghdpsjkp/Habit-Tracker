# ⚡ Quick Fix Guide - 5 Minutes to Deployment

## The Problem
Your app shows "Registration failed" because the frontend can't reach the backend.

## The Solution
Set 2 environment variables on Render.

---

## Step 1: Get Your Backend URL (1 min)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service (`habit-tracker-backend`)
3. Copy the URL from the top (looks like: `https://habit-tracker-backend-xxxx.onrender.com`)

---

## Step 2: Update Frontend (1 min)

1. Go to your frontend static site on Render
2. Click "Environment" tab
3. Add/Update this variable:

```
REACT_APP_API_URL = https://habit-tracker-backend-xxxx.onrender.com/api
```

(Replace `xxxx` with your actual backend URL)

4. Click "Save"
5. Go to "Deploys" tab
6. Click three dots on latest deploy → "Redeploy"
7. Wait for redeploy to finish

---

## Step 3: Update Backend (1 min)

1. Go to your backend service on Render
2. Click "Environment" tab
3. Add/Update this variable:

```
FRONTEND_URL = https://habit-tracker-xxxx.onrender.com
```

(Replace `xxxx` with your actual frontend URL)

4. Click "Save"
5. Click "Settings" tab
6. Click "Restart Service"

---

## Step 4: Test (1 min)

1. Open your frontend URL in browser
2. Try to register
3. Should work now! ✅

---

## If Still Not Working

### Check 1: Browser Console
1. Open browser (F12)
2. Go to Console tab
3. Look for error messages
4. Screenshot and check what it says

### Check 2: Render Logs
1. Go to backend service on Render
2. Click "Logs" tab
3. Look for error messages
4. Check if MongoDB is connected

### Check 3: Environment Variables
1. Verify `REACT_APP_API_URL` is set on frontend
2. Verify `FRONTEND_URL` is set on backend
3. Verify `MONGODB_URI` is set on backend
4. Verify `JWT_SECRET` is set on backend

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Cannot reach server" | Update `REACT_APP_API_URL` on frontend |
| "Server error" | Check `MONGODB_URI` on backend |
| CORS error | Check `FRONTEND_URL` on backend |
| 500 error | Check Render backend logs |

---

## URLs You Need

```
Frontend: https://habit-tracker-459n.onrender.com
Backend: https://habit-tracker-backend-tan7onrender.com
API: https://habit-tracker-backend-tan7onrender.com/api
```

(Replace with your actual URLs)

---

## Environment Variables Checklist

### Frontend (Static Site)
- [ ] `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`

### Backend (Web Service)
- [ ] `MONGODB_URI` = your MongoDB connection string
- [ ] `JWT_SECRET` = random secret key
- [ ] `FRONTEND_URL` = `https://your-frontend.onrender.com`
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`

---

## That's It! 🎉

Your app should now work. If not, check the error messages and refer to the full guides:
- `DEPLOYMENT_CHECKLIST.md` - Detailed step-by-step
- `DEPLOYMENT_SUMMARY.md` - What was fixed
- `FIXES_APPLIED.md` - Technical details

