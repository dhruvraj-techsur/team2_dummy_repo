# Login and Dashboard Application

A complete full-stack web application implementing user authentication, login functionality, and a personalized dashboard. Built with React frontend and Node.js backend.

## 🚀 Features

### Authentication
- **User Login**: Secure login with email and password validation
- **JWT Authentication**: Token-based authentication with automatic token management
- **Protected Routes**: Dashboard access restricted to authenticated users only
- **Session Management**: Persistent login state with automatic token validation
- **Logout Functionality**: Secure logout with token cleanup

### Frontend (React)
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Form Validation**: Client-side validation with real-time error feedback
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Mobile-friendly interface

### Backend (Node.js/Express)
- **RESTful API**: Clean API endpoints for authentication
- **Password Hashing**: Secure password storage using bcrypt
- **Input Validation**: Server-side validation using express-validator
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Proper HTTP status codes and error messages

## 📋 User Stories Implemented

### 🧑‍💻 Login Screen
- ✅ **Display Login Form**: Email and password fields with validation
- ✅ **Handle Login Submission**: API integration with loading states and error handling

### 🔐 Backend Service - User Validation
- ✅ **Validate User Credentials via API**: POST /api/login endpoint with validation
- ✅ **Manage Session or Token Authentication**: JWT token generation and validation

### 📊 Dashboard Screen
- ✅ **Display User Dashboard After Login**: Protected route with user-specific content
- ✅ **Implement Logout Functionality**: Secure logout with token cleanup

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing with protected routes
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with gradients and animations

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for API development
- **bcryptjs**: Password hashing and verification
- **jsonwebtoken**: JWT token generation and validation
- **express-validator**: Input validation middleware
- **cors**: Cross-origin resource sharing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd login-dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## 🎯 Usage

### Demo Credentials
- **Email**: `user@example.com`
- **Password**: `password`

### Application Flow
1. Navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Enter the demo credentials
4. Upon successful login, you'll be redirected to the dashboard
5. The dashboard displays user information and mock data
6. Use the logout button to sign out

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   └── Dashboard.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user info (protected)

### Health Check
- `GET /api/health` - Server health check

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Both client and server-side validation
- **CORS Protection**: Configured for secure cross-origin requests
- **Protected Routes**: Dashboard access requires valid authentication

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during operations
- **Error Handling**: Clear error messages for users
- **Smooth Transitions**: CSS animations and hover effects

## 🚀 Deployment

### Frontend (React)
```bash
cd client
npm run build
```

### Backend (Node.js)
```bash
cd server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.