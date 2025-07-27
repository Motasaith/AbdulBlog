# 🚀 Deployment Guide - Modern Blog Platform

This guide will help you deploy your Modern Blog Platform to Vercel (frontend) and Render (backend) with MongoDB Atlas.

## 📋 Pre-deployment Checklist

- ✅ All environment variables configured
- ✅ MongoDB Atlas cluster set up
- ✅ Cloudinary account configured
- ✅ Brevo/SendinBlue email service set up
- ✅ Code pushed to GitHub repository
- ✅ All tests passing locally

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (Free tier is sufficient)

### 2. Configure Database Access
1. Go to **Database Access** → **Add New Database User**
2. Create a user with **Read and write to any database** permission
3. Note down username and password

### 3. Configure Network Access
1. Go to **Network Access** → **Add IP Address**
2. For development: Add your current IP
3. For production: Add `0.0.0.0/0` (allow access from anywhere)

### 4. Get Connection String
1. Go to **Clusters** → **Connect** → **Connect your application**
2. Copy the connection string
3. Replace `<password>` with your database user password
4. Replace `<dbname>` with your desired database name (e.g., `modern-blog`)

## 🖥️ Backend Deployment (Render)

### 1. Prepare for Deployment
1. Ensure your `server/package.json` has the correct start script:
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

2. Make sure all environment variables are referenced properly in your code

### 2. Deploy to Render
1. Go to [Render](https://render.com) and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `modern-blog-api` (or your preferred name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Set Environment Variables
In Render dashboard, go to **Environment** tab and add:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/modern-blog?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
BREVO_API_KEY=your_brevo_api_key
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_LOGIN=your_brevo_smtp_login
BREVO_SMTP_PASSWORD=your_brevo_smtp_password
FROM_EMAIL=your_email@domain.com
FROM_NAME=Modern Blog Platform
ADMIN_EMAIL=admin@yourdomain.com
FRONTEND_URL=https://your-frontend-domain.vercel.app
BACKEND_URL=https://your-backend-name.onrender.com
CORS_ORIGIN=https://your-frontend-domain.vercel.app
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your_session_secret_here
COOKIE_SECRET=your_cookie_secret_here
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,webp,pdf,doc,docx
```

### 4. Deploy
1. Click **Create Web Service**
2. Wait for the deployment to complete
3. Note down your backend URL (e.g., `https://your-service-name.onrender.com`)

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Frontend
1. Update `client/package.json` if needed
2. Ensure all environment variables start with `REACT_APP_`

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign up with GitHub
2. Click **New Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3. Set Environment Variables
In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```env
REACT_APP_API_URL=https://your-backend-name.onrender.com
REACT_APP_APP_NAME=Modern Blog Platform
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### 4. Deploy
1. Click **Deploy**
2. Wait for deployment to complete
3. Note down your frontend URL (e.g., `https://your-project.vercel.app`)

## 🔄 Update Backend with Frontend URL

After frontend deployment:
1. Go back to Render dashboard
2. Update environment variables:
   ```env
   FRONTEND_URL=https://your-project.vercel.app
   CORS_ORIGIN=https://your-project.vercel.app
   ```
3. Redeploy the backend service

## 🧪 Testing Deployment

### 1. Test Backend
```bash
curl https://your-backend-name.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "database": "Connected"
}
```

### 2. Test Frontend
1. Visit your Vercel URL
2. Try to register/login
3. Create a test post
4. Upload an image
5. Test all major features

## 🔧 Post-Deployment Setup

### 1. Custom Domain (Optional)
- **Vercel**: Go to Settings → Domains → Add domain
- **Render**: Go to Settings → Custom Domains → Add domain

### 2. SSL Certificates
Both Vercel and Render provide automatic SSL certificates for custom domains.

### 3. Monitoring
- Set up monitoring in Render dashboard
- Configure alerts for downtime
- Monitor MongoDB Atlas performance

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```
   Solution: Ensure CORS_ORIGIN in backend matches frontend URL exactly
   ```

2. **Database Connection Fails**
   ```
   Solution: Check MongoDB Atlas network access and connection string
   ```

3. **Environment Variables Not Loading**
   ```
   Solution: Ensure all required variables are set in both platforms
   ```

4. **Build Failures**
   ```
   Solution: Check build logs and ensure all dependencies are in package.json
   ```

5. **Image Upload Not Working**
   ```
   Solution: Verify Cloudinary credentials and network connectivity
   ```

### Debugging Steps

1. **Check Logs**
   - Render: View logs in dashboard
   - Vercel: View function logs in dashboard

2. **Test API Endpoints**
   ```bash
   # Test health endpoint
   curl https://your-backend.onrender.com/health
   
   # Test CORS
   curl -H "Origin: https://your-frontend.vercel.app" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: X-Requested-With" \
        -X OPTIONS \
        https://your-backend.onrender.com/api/auth/login
   ```

3. **Database Connection**
   ```bash
   # Test MongoDB connection
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/modern-blog"
   ```

## 🔄 Continuous Deployment

### Automatic Deployments
Both Vercel and Render support automatic deployments:

1. **Enable Auto-Deploy**
   - Vercel: Automatically enabled for connected GitHub repos
   - Render: Enable in service settings

2. **Branch Configuration**
   - Production: Deploy from `main` branch
   - Staging: Deploy from `develop` branch (optional)

### Environment-Specific Deployments
Create separate services for different environments:
- `modern-blog-api-prod` (main branch)
- `modern-blog-api-staging` (develop branch)

## 📊 Performance Optimization

### Backend (Render)
1. Enable gzip compression (already included in code)
2. Use MongoDB indexes for better query performance
3. Implement caching strategies
4. Monitor memory usage

### Frontend (Vercel)
1. Code splitting (React.lazy)
2. Image optimization
3. Bundle analysis
4. CDN benefits (automatic with Vercel)

## 🔒 Security Checklist

- ✅ All secrets in environment variables
- ✅ HTTPS enabled (automatic)
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ Input validation implemented
- ✅ Database network access restricted
- ✅ Regular security updates

## 📱 Mobile & SEO

1. **PWA Configuration** (Optional)
   - Add service worker
   - Configure manifest.json
   - Enable offline functionality

2. **SEO Optimization**
   - Meta tags implemented
   - Sitemap generation
   - Open Graph tags
   - Twitter Cards

## 💰 Cost Estimation

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited personal projects
- **Render**: 750 hours/month (sufficient for one service)
- **MongoDB Atlas**: 512MB storage, M0 cluster
- **Cloudinary**: 25GB storage, 25GB bandwidth

### Scaling Considerations
When you outgrow free tiers:
- **Vercel Pro**: $20/month
- **Render**: $7+/month for paid plans
- **MongoDB Atlas**: $9+/month for M10 cluster

---

## 🎉 Congratulations!

Your Modern Blog Platform is now live! 🚀

**Frontend**: https://your-project.vercel.app
**Backend**: https://your-backend.onrender.com
**Database**: MongoDB Atlas

Need help? Check the main README.md or create an issue in the repository.
