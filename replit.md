# replit.md

## Overview

This is a full-stack web application built with React/TypeScript frontend and Express.js backend, designed as a care assistant application. The project uses a modern tech stack with Vite for build tooling, ShadCN/UI for components, Tailwind CSS for styling, Drizzle ORM for database management, and PostgreSQL as the database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: ShadCN/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Animations**: Framer Motion for smooth transitions and interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Build**: esbuild for server-side bundling

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express.js application
├── shared/          # Shared types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Frontend Components
- **Care Assistant Interface**: Main application page with multi-step user interaction
- **Care Suggestions**: Animated grid of personalized care recommendations
- **UI Components**: Complete set of accessible components from ShadCN/UI
- **Toast System**: User notifications and feedback
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Backend Components
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Interface**: Abstracted data layer with both memory and database implementations
- **Route Registration**: Modular route handling system
- **Development Tools**: Hot reload with Vite integration in development

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Zod schemas for type-safe data validation
- **Migrations**: Drizzle-managed database migrations

## Data Flow

### Client-Server Communication
1. **API Requests**: Frontend uses fetch with credentials for authenticated requests
2. **Query Management**: TanStack Query handles caching, background updates, and error states
3. **Error Handling**: Centralized error handling with user-friendly toast notifications
4. **Session Management**: Cookie-based sessions with PostgreSQL storage

### State Management
- **Server State**: Managed by TanStack Query with automatic caching and invalidation
- **Local State**: React hooks for component-level state
- **Form State**: React Hook Form with Zod validation
- **UI State**: Component state for animations and interactions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@radix-ui/***: Accessible UI primitives for component foundation
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth user interactions

### Development Tools
- **Vite**: Build tool with HMR and optimized bundling
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first CSS framework
- **esbuild**: Fast server-side bundling for production

### UI and Styling
- **ShadCN/UI**: Pre-built accessible components
- **class-variance-authority**: Component variant management
- **tailwindcss-animate**: CSS animations for Tailwind
- **lucide-react**: Icon library

## Deployment Strategy

### Development Environment
- **Server**: Express with Vite middleware for HMR
- **Database**: PostgreSQL with environment-based connection string
- **Hot Reload**: Full-stack development with automatic restarts

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Environment**: Production-specific configuration via NODE_ENV

### Database Management
- **Migrations**: Drizzle Kit for schema migrations (`npm run db:push`)
- **Connection**: Environment variable-based database URL
- **ORM**: Type-safe queries with Drizzle ORM
- **Session Store**: PostgreSQL-backed session storage

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build (frontend + backend)
- `npm start`: Production server
- `npm run check`: TypeScript type checking
- `npm run db:push`: Database schema migration