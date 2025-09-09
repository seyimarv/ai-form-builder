# FormCraft AI - AI-Powered Form Builder

Create beautiful forms with AI. Describe your form needs in natural language and get a working form instantly.

## 🚀 Features

- **AI-Powered Form Generation**: Chat with AI to build forms naturally
- **Real-time Preview**: See your form as it's being built
- **Professional UI**: Modern, responsive design with Tailwind CSS
- **Secure Authentication**: Powered by Clerk
- **Database Integration**: PostgreSQL with Neon for scalability
- **Form Management**: Dashboard to manage all your forms
- **Response Collection**: Collect and analyze form submissions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS v4
- **AI**: Vercel AI SDK with OpenAI GPT-4
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui + AI Elements
- **Deployment**: Vercel

## 📋 Quick Setup

### 1. Clone and Install

```bash
git clone <your-repo>
cd ai-form
npm install
```

### 2. Environment Variables

Create `.env.local` in your project root:

```bash
# Database - Get from Neon Console (https://console.neon.tech/)
DATABASE_URL="postgresql://username:password@host.neon.tech/database?sslmode=require"

# Clerk Authentication - Get from Clerk Dashboard (https://dashboard.clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-publishable-key"
CLERK_SECRET_KEY="sk_test_your-secret-key"

# AI Provider - Get from OpenAI (https://platform.openai.com/api-keys)
OPENAI_API_KEY="sk-your-openai-api-key"

# Optional Clerk URLs (defaults work fine)
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

### 3. Database Setup

```bash
# Run database migrations
npx drizzle-kit migrate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 🗄️ Database Schema

### Tables Created:

**forms**
- `id` (uuid, primary key)
- `user_id` (text, Clerk user ID)
- `name` (text)
- `description` (text, optional)
- `schema` (jsonb, form field definitions)
- `is_published` (boolean)
- `created_at`, `updated_at` (timestamps)

**form_responses**
- `id` (uuid, primary key)
- `form_id` (uuid, foreign key)
- `data` (jsonb, response data)
- `submitted_at` (timestamp)
- `ip_address` (text, optional)

**chat_sessions**
- `id` (uuid, primary key)
- `user_id` (text, Clerk user ID)
- `form_id` (uuid, optional foreign key)
- `messages` (jsonb, chat history)
- `created_at`, `updated_at` (timestamps)

## 🔐 Authentication

### Routes:
- **Public**: `/`, `/sign-in`, `/sign-up`
- **Protected**: `/dashboard/*`, `/api/chat/*`

### Setup Clerk:
1. Create account at [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create new application
3. Copy publishable key and secret key to `.env.local`
4. Configure sign-in methods (email, social, etc.)

## 🤖 AI Integration

### Supported Form Fields:
- Text input (single line)
- Email input (with validation)
- Textarea (multi-line)
- Select dropdown
- Radio buttons
- Checkboxes
- Star rating (1-5)
- File upload

### AI Chat Features:
- Natural language form building
- Real-time form preview
- Multi-turn conversations
- Form schema validation
- Error handling and suggestions

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/          # Protected dashboard pages
│   │   ├── create/        # AI form builder
│   │   ├── forms/         # Form management
│   │   └── layout.tsx     # Dashboard layout
│   ├── sign-in/           # Clerk sign-in page
│   ├── sign-up/           # Clerk sign-up page
│   ├── api/
│   │   └── chat/          # AI chat endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── ai-elements/       # AI Elements components
│   └── form-preview.tsx   # Form preview component
├── lib/
│   └── db/                # Database schema and connection
├── middleware.ts          # Clerk middleware
└── drizzle.config.ts      # Database configuration
```

## 🚧 Development Phases

### ✅ Phase 1: Foundation (Complete)
- Next.js 15 setup with TypeScript
- Clerk authentication integration
- Neon PostgreSQL with Drizzle ORM
- shadcn/ui components
- Professional landing page

### ✅ Phase 2: AI Form Generator (Complete)
- Chat interface with AI Elements
- Real-time form preview
- AI-powered schema generation
- Form validation and error handling

### 🔄 Phase 3: Form Management (In Progress)
- Form dashboard and management
- Public form pages
- Response collection and storage
- Basic analytics

### 📅 Phase 4: Advanced Features (Planned)
- "Troubleshoot with AI" feature
- Subscription management UI
- Advanced form types
- Integration webhooks
- Form analytics dashboard

## 🐛 Troubleshooting

### Database Connection Error:
```
Error: Please provide required params for Postgres driver: url: undefined
```
**Solution**: Add `DATABASE_URL` to your `.env.local` file

### Authentication Redirect Loop:
**Solution**: Check Clerk keys are correctly set in `.env.local`

### Form Query Error:
```
Failed query: select ... from "forms"
```
**Solution**: Run database migrations with `npx drizzle-kit migrate`

## 🚀 Deployment

### Vercel Deployment:
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Environment Variables for Production:
- Set all the same variables from `.env.local`
- Use production database URL from Neon
- Use production Clerk keys
- Use production OpenAI API key


---

**FormCraft AI** - Making form creation as easy as having a conversation! 🎯✨