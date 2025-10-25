# 🚀 DailyPulse Backend API

A robust RESTful API backend for the DailyPulse habit tracking application. Built with Node.js, Express, MongoDB, and JWT authentication, this API provides comprehensive endpoints for user management, habit tracking, mood logging, and analytics.

## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication**: Secure user registration and login
- 📊 **Habit Management**: Create, read, update, delete habits with categories
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
| **MongoDB** | v8.0+ | Database |
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
- **MongoDB**: v6.0+ (local or MongoDB Atlas)
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

**Option B: MongoDB Atlas** (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `<password>` with your database password

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dailypulse
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/dailypulse?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5000
```

### Security Notes
⚠️ **Important**: 
- Never commit your `.env` file to version control
- Use a strong, random JWT_SECRET (at least 32 characters)
- Change all default credentials in production

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

Expected response:
```
{
  "status": "OK",
  "message": "DailyPulse API is running",
  "timestamp": "2025-10-25T12:00:00.000Z"
}
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

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

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with 10 salt rounds
- **Helmet.js**: Security headers (XSS, CSP, etc.)
- **CORS**: Configured for specific origins
- **Input Validation**: Express-validator for request validation
- **Environment Variables**: Sensitive data stored securely
- **MongoDB Injection Protection**: Mongoose sanitization

## 🧪 Testing

### Manual Testing with cURL

```
# Health check
curl http://localhost:3000/api/health

# Register user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Testing with Postman

1. Import the API endpoints into Postman
2. Set up an environment variable for `authToken`
3. Test all endpoints systematically

## 🚢 Deployment

### Deploy to Render (Recommended)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Choose "Node" environment
   - Build command: `npm install`
   - Start command: `npm start`

3. **Add Environment Variables** in Render dashboard:
   ```
   MONGODB_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=<your_secret_key>
   NODE_ENV=production
   CORS_ORIGIN=<your_frontend_url>
   ```

4. **Deploy** and get your API URL

### Deploy to Heroku

```
# Login to Heroku
heroku login

# Create app
heroku create dailypulse-api

# Set environment variables
heroku config:set MONGODB_URI=<your_uri>
heroku config:set JWT_SECRET=<your_secret>
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Deploy to Railway

1. Visit [railway.app](https://railway.app)
2. Import from GitHub
3. Add environment variables
4. Deploy automatically

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Coding Standards

- Use ES6+ features
- Follow CommonJS module pattern (require/module.exports)
- Add JSDoc comments for functions
- Handle errors properly with try-catch
- Use async/await for asynchronous operations

## 👥 Authors

**Mayur**
- GitHub: [@mrpawarGit](https://github.com/mrpawarGit)

**Akash**
- GitHub: [@Akashpandit01](https://github.com/Akashpandit01)


## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MongoDB team for the powerful database
- All contributors who help improve this project

## 🗺️ Roadmap

- [ ] Add unit and integration tests
- [ ] Implement rate limiting for API endpoints
- [ ] Add Redis caching for frequently accessed data
- [ ] Create API versioning (v1, v2)
- [ ] Add WebSocket support for real-time updates
- [ ] Implement email notifications
- [ ] Add social features (friends, leaderboards)
- [ ] Create comprehensive API documentation with Swagger
- [ ] Add data export functionality
- [ ] Implement two-factor authentication

---

**Built with ❤️ using Node.js + Express + MongoDB**

⭐ Star this repo if you find it helpful!

[⬆ Back to top](#dailypulse-backend-api)
