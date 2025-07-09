# Restaurant Management System (BullBsuter)

## Overview

This is a modern full-stack restaurant application built with Express.js, React, and TypeScript. The application provides a comprehensive restaurant experience including menu browsing, order tracking, contact forms, and a visually appealing gallery section. The project uses a monorepo structure with shared schemas and modern web technologies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive set of Radix UI primitives with custom styling
- **Animations**: Framer Motion for smooth interactions and scroll-based animations

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Shared schema definitions between client and server
- **API Design**: RESTful API with structured error handling

### Build and Development
- **Package Manager**: npm with lockfile version 3
- **Development Server**: Vite dev server with HMR (Hot Module Replacement)
- **Production Build**: Vite for frontend, esbuild for backend bundling
- **TypeScript**: Strict mode enabled with path mapping for clean imports

## Key Components

### Database Schema
The application uses four main entities:
- **Users**: Authentication and user management (username/password)
- **Menu Items**: Restaurant menu with categories, pricing, and availability
- **Orders**: Customer orders with status tracking and order history
- **Contacts**: Customer inquiries and feedback

### API Endpoints
- `GET /api/menu` - Retrieve all menu items
- `GET /api/menu/:category` - Filter menu items by category
- `POST /api/orders` - Create new customer orders
- `GET /api/orders/:orderNumber` - Track specific orders
- `POST /api/contact` - Submit customer contact forms

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling to sections
- **Hero Section**: Eye-catching landing area with animations
- **Menu Section**: Interactive menu browser with category filtering
- **Order Tracking**: Real-time order status updates
- **Gallery**: Visual showcase of restaurant and food
- **Contact**: Customer inquiry form with validation

### Storage Layer
The application implements a storage interface pattern with:
- **Interface Definition**: `IStorage` for consistent data operations
- **Memory Implementation**: `MemStorage` for development and testing
- **Database Operations**: CRUD operations for all entities
- **Seeded Data**: Pre-populated menu items for immediate functionality

## Data Flow

1. **Menu Display**: Frontend fetches menu data via TanStack Query, displays with category filtering
2. **Order Creation**: Form submission validates data using Zod schemas, creates order with unique tracking number
3. **Order Tracking**: Customers can track orders using order numbers, real-time status updates
4. **Contact Forms**: Validated submissions stored in database with confirmation feedback

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` and `drizzle-zod` for database operations and validation
- **UI Library**: Extensive Radix UI component collection
- **State Management**: `@tanstack/react-query` for server state
- **Validation**: `zod` for runtime type checking
- **Styling**: `tailwindcss` with utility classes

### Development Tools
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Replit Integration**: Custom plugins for development environment
- **Session Management**: `connect-pg-simple` for PostgreSQL session storage

## Deployment Strategy

### Development Mode
- Vite dev server with middleware mode integration
- Express server handles API routes
- Hot module replacement for rapid development
- Replit-specific plugins for cloud development

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Environment variables required: `DATABASE_URL` for PostgreSQL connection
- Session storage using PostgreSQL for scalability

### Database Management
- Drizzle Kit for schema migrations and database pushes
- PostgreSQL dialect with connection pooling
- Environment-based configuration for different deployment stages

### Key Architectural Decisions

**Monorepo Structure**: Shared schemas between frontend and backend ensure type safety and reduce duplication. This approach allows for consistent data validation on both client and server sides.

**Storage Interface Pattern**: Abstract storage interface allows for easy testing with in-memory implementation while supporting database operations in production. This separation of concerns makes the codebase more maintainable.

**Component-Based UI**: Heavy use of Radix UI primitives provides accessibility out of the box while maintaining design flexibility through Tailwind CSS. The shadcn/ui component pattern ensures consistency across the application.

**Server-Side State Management**: TanStack Query handles all server state, providing caching, background updates, and error handling. This reduces complexity in component state management.

**Type-Safe Database Operations**: Drizzle ORM with TypeScript ensures compile-time safety for database operations while providing an intuitive API for complex queries.