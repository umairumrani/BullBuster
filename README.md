# BullBuster - Restaurant Management System

A modern, full-stack restaurant management application built with React, Express.js, and TypeScript. Features online ordering, menu browsing, order tracking, and a comprehensive admin interface.

## 🚀 Features

- **Modern UI/UX**: Professional design with glassmorphism effects and smooth animations
- **Menu Management**: Dynamic menu with categories and real-time availability
- **Order System**: Complete order management with tracking and status updates
- **Contact System**: Customer inquiry handling
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Drizzle ORM

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TanStack Query** for state management
- **Radix UI** for accessible components

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Neon Database** (PostgreSQL)
- **Zod** for validation

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BullBuster
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL:
```env
DATABASE_URL=postgresql://username:password@hostname:port/database
NODE_ENV=development
PORT=3000
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- PostgreSQL database (Neon recommended)

### Steps

1. **Prepare the project**:
   - Ensure all environment variables are set
   - Test the build locally: `npm run build`

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure environment variables in Vercel**:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`

4. **Set up database**:
   - Create a Neon database or use your PostgreSQL provider
   - Run migrations: `npm run db:push`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (production/development) | Yes |
| `PORT` | Server port (auto-set by Vercel) | No |

## 🏗️ Project Structure

```
BullBuster/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema and validation
├── dist/                 # Build output
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies and scripts
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `drizzle.config.ts` - Database configuration

## 📄 License

MIT License - see LICENSE file for details.
