# RBAC Blog Platform - Frontend

A modern React.js frontend for a Role-Based Access Control blog platform with a clean, Medium-inspired design and secure authentication system.

## 🚀 Features

- **User Interface**
  - Clean, minimal design inspired by Medium
  - Fully responsive design for all devices
  - Dark/light theme support
  - Smooth animations and micro-interactions

- **Authentication & User Management**
  - Email/password registration and login
  - Google OAuth integration
  - Email verification workflow
  - Password reset functionality
  - Role-based UI rendering

- **Blog Features**
  - Clean article reading experience
  - Article search and filtering
  - Like/unlike functionality
  - Comment system with real-time updates
  - User profiles and reading lists

- **Admin Dashboard**
  - Complete blog post management (CRUD)
  - User management and role assignment
  - Platform analytics and statistics
  - Content moderation tools

- **Performance & Accessibility**
  - Code splitting and lazy loading
  - SEO optimization
  - WCAG accessibility compliance
  - Progressive Web App features

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI + Heroicons
- **Form Handling**: React Hook Form + Yup validation
- **HTTP Client**: Axios
- **Rich Text Editor**: React Quill
- **Authentication**: JWT with automatic refresh
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- Backend API running (see backend README)
- Modern web browser

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rbac-blog-frontend
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api


### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Use the same project from backend setup
3. Add authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)

## 🚀 Running the Application

### Development Mode
```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/                   # Static assets
│   ├── icons/               # App icons and favicons
│   ├── images/              # Static images
│   └── manifest.json        # PWA manifest
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Basic UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   ├── auth/            # Authentication components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── GoogleLoginButton.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── blog/            # Blog-related components
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogList.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── BlogEditor.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── comments/        # Comment system
│   │   │   ├── CommentSection.jsx
│   │   │   ├── CommentCard.jsx
│   │   │   └── CommentForm.jsx
│   │   └── admin/           # Admin components
│   │       ├── AdminDashboard.jsx
│   │       ├── UserManagement.jsx
│   │       ├── PostManagement.jsx
│   │       └── AdminRoute.jsx
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── BlogPostPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   ├── useLocalStorage.js
│   │   └── useDebounce.js
│   ├── store/               # Redux store
│   │   ├── index.js         # Store configuration
│   │   ├── slices/          # Redux slices
│   │   │   ├── authSlice.js
│   │   │   ├── blogSlice.js
│   │   │   ├── userSlice.js
│   │   │   └── uiSlice.js
│   │   └── api/             # RTK Query API slices
│   │       ├── authApi.js
│   │       ├── blogApi.js
│   │       └── adminApi.js
│   ├── utils/               # Utility functions
│   │   ├── api.js           # API configuration
│   │   ├── auth.js          # Auth utilities
│   │   ├── constants.js     # App constants
│   │   ├── helpers.js       # Helper functions
│   │   └── validation.js    # Form validation schemas
│   ├── styles/              # Global styles
│   │   ├── globals.css      # Global CSS and Tailwind imports
│   │   └── components.css   # Component-specific styles
│   ├── assets/              # Local assets
│   │   ├── images/
│   │   └── icons/
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # App entry point
│   └── vite-env.d.ts        # Vite type definitions
├── tests/                   # Test files
│   ├── __mocks__/           # Test mocks
│   ├── components/          # Component tests
│   ├── pages/               # Page tests
│   └── utils/               # Utility tests
├── .env.example             # Environment variables example
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
├── package.json
└── README.md
```