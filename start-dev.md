# Development Setup Instructions

Follow these steps to test if your posts are showing up:

## 1. Start the Backend Server

Open a terminal and run:
```bash
cd "D:\Proton Backup\Full Stack Projects\myblog\server"
npm start
```

You should see:
- 🗄️ MongoDB Connected
- 🚀 Modern Blog Platform API running on port 5000
- 📝 Environment: development
- 🗄️ Database: Connected

## 2. Test the API directly

In another terminal, run:
```bash
cd "D:\Proton Backup\Full Stack Projects\myblog"
node test-api.js
```

This should show you the 4 posts from your database.

## 3. Start the Frontend

In another terminal, run:
```bash
cd "D:\Proton Backup\Full Stack Projects\myblog\client"
npm start
```

This will open your React app at http://localhost:3000

## 4. Check Browser Console

1. Open your browser and go to http://localhost:3000
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Look for these messages:
   - "API Base URL:" - should show http://localhost:5000
   - "Making API request to:" - should show the full URL
   - "API response received:" - should show the posts data

## 5. If Posts Still Don't Show

Check the browser console for any errors. Common issues:
- CORS errors
- Network connection failed
- API endpoint not found (404)
- Server not running

## 6. Manual API Test

You can also test the API directly in your browser by visiting:
http://localhost:5000/api/posts

This should return a JSON array with your 4 posts.

## Troubleshooting

If you see any errors, please share:
1. Server console output
2. Browser console errors
3. Network tab in browser dev tools showing the API request status
