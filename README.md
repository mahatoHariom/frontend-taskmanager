# Frontend - Task Manager

A modern React frontend for the Task Manager application built with Vite, TypeScript, React Query, and Tailwind CSS.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Environment Variables

Create a `.env` file in the frontend directory with the following variable:

```env
VITE_API_URL=http://localhost:5000/api
```

### Environment Variables Explained

- `VITE_API_URL`: Backend API base URL (default: `http://localhost:5000/api`)

## Installation

Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173` with hot-reload enabled.

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally.

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Features

- **Authentication**: User registration and login with JWT
- **Task Management**: Create, read, update, and delete tasks
- **Filtering & Sorting**: Filter by status/priority, sort by various fields
- **Pagination**: Navigate through tasks with URL-based state
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Dark Mode**: Theme switching support
- **Real-time Updates**: React Query for efficient data fetching and caching

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query** - Server state management
- **Redux Toolkit** - User authentication state
- **React Router** - Client-side routing
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI component library
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks (React Query)
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── store/          # Redux store (auth only)
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
└── index.html          # HTML template
```

## Usage

1. Make sure the backend server is running on `http://localhost:5000`
2. Start the frontend development server: `npm run dev`
3. Open `http://localhost:5173` in your browser
4. Register a new account or login with existing credentials
5. Start managing your tasks!
