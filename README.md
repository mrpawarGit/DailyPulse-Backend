# 🚀 DailyPulse Backend API

A robust RESTful API backend for the DailyPulse habit tracking application. Built with Node.js, Express, MongoDB, and JWT authentication, this API provides comprehensive endpoints for user management, habit tracking, mood logging, and analytics.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg) ![Express](https://img.shields.io/badge/Express-v4.18-blue.svg) ![MongoDB](https://img.shields.io/badge/MongoDB-v8.0-brightgreen.svg) ![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌐 Live API

**API Base URL**: `https://dailypulse-backend.onrender.com/api`

**Health Check**: [https://dailypulse-backend.onrender.com/api/health](https://dailypulse-backend.onrender.com/api/health)

## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication**: Secure user registration and login
- 📊 **Habit Management**: Create, read, update, and delete habits with categories
- 📝 **Progress Tracking**: Log daily habit completion with notes
- 😊 **Mood Tracking**: Daily mood logging with emoji-based interface
- 🔥 **Streak Calculation**: Automatic streak tracking and updates
- 📈 **Analytics**: Comprehensive statistics and trend analysis
- 🎯 **Category Breakdown**: Organize habits by categories
- 💡 **Motivational Content**: Random quotes and habit-building tips

### Advanced Features
- ⚡ **Real-time Streak Updates**: Automatic recalculation on progress logs
- 🔒 **Protected Routes**: JWT middleware for secure endpoints
- 📅 **Date Range Queries**: Flexible date-based data retrieval
- 🎨 **Customizable Habits**: Support for boolean and countable habit types
- 🌓 **User Preferences**: Theme and notification settings
- 📊 **Performance Analytics**: Best performing habits tracking

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v18+ | Runtime Environment |
| **Express.js** | v4.18.2 | Web Framework |
| **MongoDB Atlas** | Cloud | Database (Production) |
| **Mongoose** | v8.0.0 | ODM for MongoDB |
| **JWT** | v9.0.2 | Authentication |
| **bcryptjs** | v2.4.3 | Password Hashing |
| **Helmet** | v7.1.0 | Security Headers |
| **CORS** | v2.8.5 | Cross-Origin Resource Sharing |
| **Morgan** | v1.10.0 | HTTP Request Logger |
| **Express Validator** | v7.0.1 | Input Validation |

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: v6.0+ (local) or MongoDB Atlas account (production)
- **Git**: For cloning the repository

Check your versions:
```
node --version
npm --version
mongod --version
```

## 🚀 Installation

### 1. Clone the Repository

```
git clone https://github.com/mrpawarGit/DailyPulse-Backend.git
cd DailyPulse-Backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas** (Cloud - Recommended for Production)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Replace `<username>`, `<password>`, and database name

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (Local)
MONGODB_URI=mongodb://localhost:27017/dailypulse

# Database Configuration (Production - MongoDB Atlas)
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dailypulse?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5000
# CORS_ORIGIN=https://daily-pulse-app.vercel.app (for production)
```

### Security Notes
⚠️ **Important**: 
- Never commit your `.env` file to version control
- Use a strong, random JWT_SECRET (at least 32 characters)
- Change all default credentials in production
- Use environment-specific CORS origins

## 🏃‍♂️ Running the Application

### Development Mode

Start the server with auto-reload using nodemon:

```
npm run dev
```

The API will be available at: **http://localhost:3000**

### Production Mode

```
npm start
```

### Health Check

Verify the server is running:

```
curl http://localhost:3000/api/health
```

Or for production:
```
curl https://dailypulse-backend.onrender.com/api/health
```

Expected response:
```
{
  "status": "OK",
  "message": "DailyPulse API is running",
  "timestamp": "2025-10-25T12:00:00.000Z"
}
```

## 📚 API Documentation

### Base URLs

**Local Development**: `http://localhost:3000/api`

**Production**: `https://dailypulse-backend.onrender.com/api`

### Authentication Endpoints

#### Register User
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "currentStreak": 0,
      "longestStreak": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "settings": {
    "theme": "dark",
    "notificationsEnabled": true
  }
}
```

### Habit Endpoints

#### Get All Habits
```
GET /api/habits
Authorization: Bearer <token>
```

#### Create Habit
```
POST /api/habits
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Drink Water",
  "icon": "💧",
  "category": "Health",
  "type": "countable",
  "target": 8,
  "color": "blue"
}
```

#### Update Habit
```
PUT /api/habits/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Drink More Water",
  "target": 10
}
```

#### Delete Habit
```
DELETE /api/habits/:id
Authorization: Bearer <token>
```

**Response:**
```
{
  "success": true,
  "message": "Habit and associated logs deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011"
  }
}
```

#### Archive/Unarchive Habit
```
PATCH /api/habits/:id/archive
Authorization: Bearer <token>
```

### Log Endpoints

#### Create/Update Log
```
POST /api/logs
Authorization: Bearer <token>
Content-Type: application/json

{
  "habitId": "507f1f77bcf86cd799439011",
  "date": "2025-10-25",
  "progress": 8,
  "notes": "Feeling great!"
}
```

#### Get Today's Logs
```
GET /api/logs/today
Authorization: Bearer <token>
```

#### Get Logs by Date
```
GET /api/logs/date/2025-10-25
Authorization: Bearer <token>
```

#### Get Logs by Habit
```
GET /api/logs/habit/:habitId
Authorization: Bearer <token>
```

#### Get Logs by Date Range
```
GET /api/logs/range?startDate=2025-10-01&endDate=2025-10-25
Authorization: Bearer <token>
```

### Mood Endpoints

#### Log Mood
```
POST /api/moods
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2025-10-25",
  "mood": "😊",
  "notes": "Had a productive day!"
}
```

#### Get Today's Mood
```
GET /api/moods/today
Authorization: Bearer <token>
```

#### Get Moods by Date Range
```
GET /api/moods/range?startDate=2025-10-01&endDate=2025-10-25
Authorization: Bearer <token>
```

### Analytics Endpoints

#### Get Dashboard Overview
```
GET /api/analytics/overview
Authorization: Bearer <token>
```

**Response:**
```
{
  "success": true,
  "data": {
    "totalHabits": 5,
    "completedToday": 3,
    "completionRate": 60,
    "totalCompletions": 150,
    "currentStreak": 7,
    "longestStreak": 15
  }
}
```

#### Get Trends
```
GET /api/analytics/trends?days=7
Authorization: Bearer <token>
```

#### Get Category Breakdown
```
GET /api/analytics/category-breakdown
Authorization: Bearer <token>
```

#### Get Mood Statistics
```
GET /api/analytics/mood-stats?days=30
Authorization: Bearer <token>
```

#### Get Best Habits
```
GET /api/analytics/best-habits?days=30
Authorization: Bearer <token>
```

### Motivation Endpoints (Public)

#### Get Random Quote
```
GET /api/motivation/quote
```

#### Get Habit Tips
```
GET /api/motivation/tips
```

## 🗄️ Database Schema

### User Model
```
{
  name: String,
  email: String (unique, required),
  password: String (hashed),
  currentStreak: Number,
  longestStreak: Number,
  lastCompletionDate: Date,
  settings: {
    theme: String (light/dark),
    notificationsEnabled: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Habit Model
```
{
  userId: ObjectId (ref: User),
  name: String,
  icon: String,
  category: String (Health/Productivity/Mindfulness/Fitness/Learning/Other),
  type: String (boolean/countable),
  target: Number,
  color: String,
  isArchived: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### HabitLog Model
```
{
  userId: ObjectId (ref: User),
  habitId: ObjectId (ref: Habit),
  date: String (YYYY-MM-DD),
  progress: Number,
  completed: Boolean,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Mood Model
```
{
  userId: ObjectId (ref: User),
  date: String (YYYY-MM-DD),
  mood: String (😊/😐/😔/😡/😴),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 📁 Project Structure

```
dailypulse-backend/
├── config/
│   ├── db.js                 # MongoDB connection
│   └── jwt.js                # JWT token utilities
├── models/
│   ├── User.js               # User model & schema
│   ├── Habit.js              # Habit model & schema
│   ├── HabitLog.js           # Habit log model & schema
│   └── Mood.js               # Mood model & schema
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── habitController.js    # Habit CRUD operations
│   ├── logController.js      # Log management
│   ├── analyticsController.js # Analytics calculations
│   └── motivationController.js # Motivational content
├── routes/
│   ├── auth.routes.js        # Auth endpoints
│   ├── habit.routes.js       # Habit endpoints
│   ├── log.routes.js         # Log endpoints
│   ├── mood.routes.js        # Mood endpoints
│   ├── analytics.routes.js   # Analytics endpoints
│   └── motivation.routes.js  # Motivation endpoints
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── errorHandler.js       # Global error handler
│   └── validateRequest.js    # Input validation
├── utils/
│   └── streakCalculator.js   # Streak calculation logic
├── .env                      # Environment variables (not in repo)
├── .gitignore
├── package.json
├── server.js                 # Application entry point
└── README.md
```

## 🔒 Security

This API implements multiple security measures:

- **JWT Authentication**: Secure token-based authentication with 7-day expiry
- **Password Hashing**: bcrypt with 10 salt rounds
- **Helmet.js**: Security headers (XSS, CSP, HSTS, etc.)
- **CORS**: Configured for specific frontend origins
- **Input Validation**: Express-validator for request validation
- **Environment Variables**: Sensitive data stored securely
- **MongoDB Injection Protection**: Mongoose built-in sanitization
- **Rate Limiting**: Protection against brute force attacks

## 🧪 Testing

### Manual Testing with cURL

```
# Health check (Production)
curl https://dailypulse-backend.onrender.com/api/health

# Register user
curl -X POST https://dailypulse-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST https://dailypulse-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Testing with Postman

1. Import the API endpoints into Postman
2. Set up an environment variable for `authToken`
3. Set base URL: `https://dailypulse-backend.onrender.com/api`
4. Test all endpoints systematically

### Example Postman Collection

```
{
  "info": {
    "name": "DailyPulse API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/health"
      }
    }
  ]
}
```

## 🚢 Deployment

### Deployed on Render

The API is live and deployed at: **[https://dailypulse-backend.onrender.com](https://dailypulse-backend.onrender.com)**

### Deploy Your Own

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

**Steps to deploy on Render:**

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose "Node" as environment
   - Build command: `npm install`
   - Start command: `npm start`
   - Choose free plan or paid plan

3. **Add Environment Variables** in Render dashboard:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dailypulse
   JWT_SECRET=your_production_secret_key_at_least_32_characters_long
   NODE_ENV=production
   CORS_ORIGIN=https://daily-pulse-app.vercel.app
   PORT=3000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app
   - Get your API URL: `https://your-app-name.onrender.com`

5. **Update Frontend**
   - Update `VITE_API_URL` in frontend `.env` to your Render URL

### MongoDB Atlas Setup (Required for Production)

1. **Create MongoDB Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a Cluster**
   - Choose Free Tier (M0)
   - Select region (closest to your Render deployment)
   - Create cluster

3. **Create Database User**
   - Database Access → Add New Database User
   - Set username and strong password
   - Grant "Read and write to any database" role

4. **Whitelist IP Address**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, whitelist specific IPs

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<username>`, `<password>`, and database name

### Render Configuration Tips

- **Auto-Deploy**: Enable auto-deploy from GitHub for automatic updates
- **Health Checks**: Render automatically pings `/api/health`
- **Environment Variables**: Never commit `.env` to GitHub
- **Logs**: View real-time logs in Render dashboard
- **Cold Starts**: Free tier apps sleep after inactivity (takes ~30s to wake)

### Coding Standards

- Use CommonJS module pattern (require/module.exports)
- Add JSDoc comments for functions
- Handle errors properly with try-catch blocks
- Use async/await for asynchronous operations
- Follow REST API naming conventions
- Write meaningful commit messages

## 🐛 Known Issues

- Free tier on Render experiences cold starts (~30 seconds)
- Rate limiting not yet implemented (coming soon)

For more issues, check [GitHub Issues](https://github.com/mrpawarGit/DailyPulse-Backend/issues).

## 👥 Authors

**Mayur Pawar** - [@mrpawarGit](https://github.com/mrpawarGit)

**Akash Pandit** - [@Akashpandit01](https://github.com/Akashpandit01)

## 🔗 Related Projects

**Frontend**: [DailyPulse-Frontend](https://github.com/mrpawarGit/DailyPulse-Frontend)

**Live Demo**: [https://daily-pulse-app.vercel.app](https://daily-pulse-app.vercel.app)

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB team for the powerful database
- Render for reliable hosting
- All contributors who help improve this project

## 🗺️ Roadmap

- [x] Core API endpoints
- [x] JWT authentication
- [x] MongoDB integration
- [x] Habit CRUD operations
- [x] Mood tracking
- [x] Analytics endpoints
- [x] Deployment to Render
- [ ] Implement rate limiting for API endpoints
- [ ] Add WebSocket support for real-time updates
- [ ] Implement email notifications
- [ ] Add social features (friends, leaderboards)
- [ ] Add data export functionality

## 📊 API Status

![API Status](https://img.shields.io/website?url=https%3A%2F%2Fdailypulse-backend.onrender.com%2Fapi%2Fhealth)
![GitHub last commit](https://img.shields.io/github/last-commit/mrpawarGit/DailyPulse-Backend)
![GitHub issues](https://img.shields.io/github/issues/mrpawarGit/DailyPulse-Backend)

---

**Built with ❤️ using Node.js + Express + MongoDB**
12. ✅ **Updated testing examples** for production

Your Backend README is now complete and professional! 🚀✨
