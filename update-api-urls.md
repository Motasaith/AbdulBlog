# Manual Updates Required

The following files still contain hardcoded API URLs that need to be updated manually:

## Files to Update:

1. **BlogPost.js** - Replace `http://localhost:5000` with API utility
2. **Contact.js** - Replace hardcoded URL with API utility
3. **EditPost.js** - Replace hardcoded URL with API utility
4. **EditProfile.js** - Replace hardcoded URL with API utility
5. **ManageAdmins.js** - Replace hardcoded URL with API utility
6. **ManagePosts.js** - Replace hardcoded URL with API utility
7. **Messages.js** - Replace hardcoded URL with API utility
8. **RegisterAdmin.js** - Replace hardcoded URL with API utility
9. **Stats.js** - Replace hardcoded URL with API utility
10. **TrashBin.js** - Replace hardcoded URL with API utility

## Steps for each file:

1. Import the API utility: `import api from '../utils/api';`
2. Remove axios import if only used for API calls
3. Replace `axios.get('http://localhost:5000/api/...')` with `api.get('/api/...')`
4. Replace `axios.post('http://localhost:5000/api/...')` with `api.post('/api/...')`
5. Remove manual Authorization headers (handled by interceptor)

## Example transformation:

**Before:**
```javascript
import axios from 'axios';

const token = localStorage.getItem('authToken');
const res = await axios.get('http://localhost:5000/api/posts', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

**After:**
```javascript
import api from '../utils/api';

const res = await api.get('/api/posts');
```

## Production Deployment:

1. Update `.env.production` files with your actual production URLs
2. Set environment variables in Vercel/Render dashboard
3. For Vercel: Add `REACT_APP_API_URL` in Environment Variables
4. For Render: Add all server environment variables in Environment section
