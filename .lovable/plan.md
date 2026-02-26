

# Lotus-FINANCE — Implementation Plan

## Phase 1: Foundation & Auth
1. **Set up the design system** — iOS-inspired glassmorphism theme with dark mode support, custom color palette (greens/golds for finance), glassmorphism card styles, and smooth CSS transitions
2. **Create the landing page** — Hero section with animated gradient background (CSS-based), app tagline, feature highlights, and CTA buttons for Login/Sign Up
3. **Set up Supabase Cloud** — Enable auth (email/password), create database tables: `profiles`, `expenses`, `income`, `investments`, `ai_cache` with RLS policies
4. **Build Auth pages** — Login and Register pages with form validation, session management, and protected route wrapper

## Phase 2: Core Financial Features
5. **Build the app layout** — Sidebar navigation with icons (Dashboard, Expenses, Income, Investments, AI Insights), top bar with user avatar and logout
6. **Expense tracking page** — Add/edit/delete expenses with category, amount, date, payment method, notes. Filterable table view with monthly/yearly summaries
7. **Income tracking page** — Add/edit/delete income entries with source type (Salary, Freelance, Other), amount, date. Monthly totals
8. **Investment tracking page** — Add/edit/delete investments with type (MF, Stock, FD, etc.), amount, date, notes. Portfolio allocation overview

## Phase 3: Dashboard & Charts
9. **Dashboard page** — Net savings card, income vs expense comparison, financial health indicator, recent transactions list
10. **Charts & visualizations** — Income vs Expense bar chart (Recharts), expense category pie chart, monthly trends line chart, with smooth animations

## Phase 4: AI Features
11. **AI Financial Health Analysis** — Edge function using Lovable AI to analyze user's financial data and generate monthly insights (spending behavior, savings rate, risk warnings)
12. **AI Smart Alerts** — Logic-based triggers (expenses > income, spending spikes, no investments) that generate AI-formatted alert messages shown on dashboard
13. **AI Finance Assistant** — Chat interface with predefined prompts ("How can I save more?", "Is my spending healthy?") that uses user's financial data for context-aware responses

## Phase 5: Polish & Responsive
14. **Glassmorphism UI polish** — Apply backdrop-blur cards, soft shadows, gradient accents, micro-animations on interactions throughout the app
15. **Mobile responsive optimization** — Collapsible sidebar, stacked layouts, touch-friendly inputs, mobile-optimized charts

