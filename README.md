# Issue Tracker - Frontend

## Overview

A modern, full-featured frontend for an issue tracking system built with React, TypeScript, Ant Design, and Vite. This application provides a professional interface for managing issues with role-based access control and responsive design.

## Features

- **User Authentication**
  - Login and registration forms
  - JWT-based authentication
  - Role-based access control (User/Admin)

- **Issue Management**
  - Create, read, update, and delete issues
  - Filter by status, priority, and date
  - Pagination and sorting
  - Responsive table with actions

- **Admin Dashboard**
  - User management (Admin only)
  - Access control for sensitive operations
  - Clean, intuitive interface

- **Modern UI/UX**
  - Ant Design components
  - Framer Motion animations
  - Responsive design
  - Professional layout with sticky sidebar

## Technology Stack

### Frontend

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **UI Library**: Ant Design (antd) with Pro Components
- **State Management**: React Query (TanStack)
- **Routing**: React Router v6
- **Styling**: CSS Modules, Ant Design styling
- **Animation**: Framer Motion

### DevOps

- **Containerization**: Docker
- **Web Server**: Nginx
- **Deployment**: Render
- **Environment Management**: dotenv

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Docker (for containerized deployment)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/issue-tracker-frontend.git
cd issue-tracker-frontend

##Install dependencies
npm install

##Environment Configuration
VITE_API_BASE=https://your-backend-api.com/api
NODE_ENV=development

## Start the development server
npm run dev

## Access the application
# http://localhost:5173

#Build for production
npm run build

## Preview production build
npm run preview

# Docker Deployment
#Build the Docker image
docker build -t issue-tracker-frontend .
# Run the container
docker run -d -p 80:80 issue-tracker-frontend

# Deployment to Render
Push code to GitHub repository
Create new Web Service on Render
Connect your repository
Set environment variables in Render dashboard
Configure build command: npm run build
Set publish directory: dist
Security Considerations
JWT tokens with proper expiration
Input validation on forms
Role-based access control
Secure API calls with authentication headers

## Acknowledgments
React & React DOM
Ant Design
Vite
Render for hosting
All open-source dependencies
Contact
