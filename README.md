# 🚀 Modern Blog Platform

A cutting-edge, full-stack blog platform built with the MERN stack, featuring modern design, advanced security, and seamless deployment capabilities.

## ✨ Features

### 🎨 **Modern UI/UX**
- **TailwindCSS** with custom design system
- **Glass morphism** effects and animations
- **Responsive design** optimized for all devices
- **Dark/Light mode** support
- **Custom fonts** (Inter, Playfair Display, JetBrains Mono)
- **Framer Motion** animations

### 🔒 **Security First**
- **JWT** authentication with refresh tokens
- **bcrypt** password hashing with configurable rounds
- **Rate limiting** and request throttling
- **Input validation** and sanitization
- **CORS** protection with environment-specific origins
- **Helmet.js** security headers
- **XSS** and **NoSQL injection** protection
- **Account lockout** after failed login attempts
- **Session management** with MongoDB store

### 🏗️ **Robust Architecture**
- **Environment-based configuration** (all secrets in .env)
- **Error handling** middleware with comprehensive logging
- **Database connection** with automatic reconnection
- **Graceful shutdown** handling
- **Compression** middleware for performance
- **Morgan** logging for development and production

### 📱 **Modern Features**
- **Real-time** user interactions
- **Image upload** with Cloudinary integration
- **Email notifications** via Brevo/SendinBlue
- **Rich text editor** with markdown support
- **Comment system** with moderation
- **User profiles** with social links
- **Analytics dashboard**
- **Search functionality**
- **Category management**

### 🌐 **Deployment Ready**
- **Vercel** optimized frontend
- **Render** compatible backend
- **MongoDB Atlas** integration
- **Environment variables** for all configurations
- **CI/CD** ready structure

## 🛠️ Tech Stack

### Frontend
- **React 18** with functional components and hooks
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Query** for server state management
- **React Hook Form** for form handling
- **React Router** for navigation
- **React Helmet** for SEO
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Morgan** for logging
- **Multer** for file uploads
- **Nodemailer** for email sending

### DevOps & Tools
- **Concurrently** for development
- **Dotenv** for environment variables
- **ESLint** for code linting
- **Git** for version control

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-blog-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   
   Create `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_REFRESH_EXPIRE=30d
   
   # URLs
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:5000
   
   # Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email (Brevo/SendinBlue)
   BREVO_API_KEY=your_brevo_api_key
   FROM_EMAIL=your_email@domain.com
   
   # Security
   BCRYPT_ROUNDS=12
   SESSION_SECRET=your_session_secret
   COOKIE_SECRET=your_cookie_secret
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
modern-blog-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   ├── context/       # React context
│   │   ├── services/      # API services
│   │   └── styles/        # Additional styles
│   ├── tailwind.config.js
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database and configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── package.json
├── .env                 # Environment variables
├── package.json         # Root package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

All sensitive information is stored in environment variables:

- **Database**: MongoDB connection string
- **Authentication**: JWT secrets and expiration times
- **File Upload**: Cloudinary credentials
- **Email**: Brevo/SendinBlue API keys
- **Security**: Bcrypt rounds, session secrets
- **URLs**: Frontend and backend URLs for CORS

### Security Configuration

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Password Policy**: Minimum 6 characters, bcrypt with 12 rounds
- **Account Lockout**: 5 failed attempts lock account for 2 hours
- **JWT**: 7-day access tokens, 30-day refresh tokens
- **CORS**: Environment-specific allowed origins

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Environment Variables for Vercel:**
```env
REACT_APP_API_URL=https://your-backend-url.render.com
```

### Backend (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables in Render dashboard
4. Deploy automatically on push to main branch

**Environment Variables for Render:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
# ... all other environment variables
```

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Set up database user and network access
3. Get connection string and add to environment variables

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Post Endpoints
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)

### User Endpoints
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `POST /api/users/avatar` - Upload avatar (auth required)

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TailwindCSS** for the amazing utility-first CSS framework
- **Framer Motion** for smooth animations
- **MongoDB** for the powerful database
- **Cloudinary** for image management
- **Brevo** for email services
- **Vercel** and **Render** for hosting platforms

## 📞 Support

For support, email your-email@domain.com or create an issue in the repository.

---

**Built with ❤️ using the MERN stack**
