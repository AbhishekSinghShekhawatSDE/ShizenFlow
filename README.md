# ShizenFlow

An AI-powered personal finance tracker. Track expenses, income, and investments. Get AI-driven financial insights and a health score.

**Live:** [shizen.lovable.app](https://shizen.lovable.app)

---

## Features

- **Expense Tracking** — Log expenses across 8 categories (Food, Transport, Shopping, Bills, Entertainment, Health, Education, Other) with 5 payment methods.
- **Income Management** — Track earnings from 6 sources (Salary, Freelance, Business, Investment Returns, Rental, Other).
- **Investment Portfolio** — Monitor investments across 8 asset classes (Mutual Fund, Stocks, FD, PPF, Gold, Crypto, Real Estate, Other) with percentage breakdowns.
- **AI Financial Advisor** — Chat with Google Gemini about your finances. Get streaming, context-aware responses rendered as markdown.
- **Financial Health Score** — A computed score (0-100, graded A-D) based on savings rate, investment allocation, and spending behavior.
- **AI Spending Alerts** — Auto-generated daily alerts on the dashboard, cached for 24 hours.
- **Authentication** — Email/password with email verification and Google OAuth 2.0.
- **Data Privacy** — Row-Level Security on every table. Your data is isolated at the database level.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | Frontend UI library |
| TypeScript | 5.8 | Static type checking |
| Vite | 5.4 | Build tool and dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| shadcn/ui | Latest | Accessible component library (Radix UI) |
| Supabase | 2.98 | Database, Auth, Edge Functions |
| Google Gemini 3 Flash | Preview | LLM for financial insights and chat |
| TanStack React Query | 5.83 | Server state and caching |
| React Router | 6.30 | Client-side routing |
| Recharts | 2.15 | Data visualization |
| react-markdown | 10.1 | AI response rendering |
| Zod | 3.25 | Schema validation |
| date-fns | 3.6 | Date formatting |
| Lucide React | 0.462 | Icons |
| Vitest | 3.2 | Testing |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend (SPA)                │
│  React 18 + TypeScript + Tailwind + shadcn/ui   │
│  React Router (protected routes)                │
│  React Query (server state)                     │
└──────────────────────┬──────────────────────────┘
                       │ Supabase JS SDK
┌──────────────────────┴──────────────────────────┐
│                 Supabase Backend                │
│  ┌────────────┐  ┌──────────┐  ┌─────────────┐ │
│  │ PostgreSQL │  │   Auth   │  │   Edge Fn    │ │
│  │  (5 tables │  │ Email +  │  │  ai-chat     │ │
│  │   + RLS)   │  │  OAuth   │  │ (Deno)       │ │
│  └────────────┘  └──────────┘  └──────┬──────┘ │
└───────────────────────────────────────┼────────┘
                                        │
                            ┌───────────┴──────────┐
                            │  Lovable AI Gateway   │
                            │  Google Gemini 3      │
                            │  Flash Preview        │
                            └──────────────────────┘
```

---

## Database Schema

**profiles** — User profile data (display_name, avatar_url). Auto-created via trigger on signup.

**expenses** — amount, category, date, payment_method, notes. RLS: own rows only.

**income** — amount, source, date, notes. RLS: own rows only.

**investments** — amount, type, date, notes. RLS: own rows only.

**ai_cache** — cache_key, response, token_count. Stores AI alert responses for 24h.

All tables use `user_id` with RLS policies restricting SELECT, INSERT, UPDATE, DELETE to `auth.uid() = user_id`.

---

## Project Structure

```
src/
├── pages/
│   ├── Landing.tsx          # Public landing page with animations
│   ├── Login.tsx            # Email + Google OAuth login
│   ├── Register.tsx         # Registration with email verification
│   ├── Dashboard.tsx        # Financial overview + AI alerts
│   ├── Expenses.tsx         # Expense CRUD with category filter
│   ├── Income.tsx           # Income CRUD with source tracking
│   ├── Investments.tsx      # Investment CRUD with portfolio breakdown
│   ├── AIInsights.tsx       # Health score + AI chat
│   ├── PrivacyPolicy.tsx    # Privacy policy
│   ├── TermsOfService.tsx   # Terms of service
│   ├── Disclaimer.tsx       # Disclaimer
│   └── NotFound.tsx         # 404 page
├── components/
│   ├── AppLayout.tsx        # Authenticated layout with sidebar
│   ├── AppSidebar.tsx       # Collapsible navigation sidebar
│   ├── ProtectedRoute.tsx   # Auth route guard
│   ├── NavLink.tsx          # Active-state nav link
│   └── ui/                  # shadcn/ui components
├── hooks/
│   ├── useAuth.tsx          # Auth context provider
│   └── use-toast.ts         # Toast notifications
├── integrations/
│   └── supabase/            # Auto-generated client and types
├── index.css                # Design tokens, animations, glassmorphism
└── main.tsx                 # App entry point

supabase/
├── config.toml              # Supabase project config
├── migrations/              # Database migrations
└── functions/
    └── ai-chat/
        └── index.ts         # Edge Function: AI chat + alerts
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm. Install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

### Local Setup

```bash
git clone https://github.com/AbhishekSinghShekhawatSDE/ShizenFlow.git
cd ShizenFlow
npm install
npm run dev
```

The app runs at `http://localhost:8080`.

### Environment Variables

The `.env` file is auto-configured by Lovable Cloud:

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon key
- `VITE_SUPABASE_PROJECT_ID` — Project ID

### Edge Function Secrets

- `LOVABLE_API_KEY` — For AI gateway access
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — Auto-configured

---

## AI Integration

The `ai-chat` Edge Function proxies requests to Google Gemini 3 Flash Preview via the Lovable AI Gateway.

**Two modes:**

1. **Chat (streaming)** — Sends conversation history + financial context. Returns SSE stream parsed incrementally on the frontend.
2. **Alerts (non-streaming)** — Sends aggregated financial data. Returns 3 actionable alerts as a JSON array. Cached daily.

**System prompt** enforces concise, actionable financial advice in plain language.

---

## Security

- Row-Level Security on all 5 tables
- JWT validation on Edge Function requests
- SECURITY DEFINER trigger for profile auto-creation
- API keys stored as Supabase secrets (never exposed to client)
- Email verification required for password-based signups

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint with ESLint |

---

## Deployment

Deployed via Lovable Cloud at [shizen.lovable.app](https://shizen.lovable.app).

For manual deployment, build and serve the `dist` folder:

```bash
npm run build
```

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Push your changes
4. Open a pull request

---

## License

This project is for academic and personal use.
