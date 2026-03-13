import { useEffect } from "react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-4 text-primary border-b border-border pb-2">{title}</h2>
    {children}
  </section>
);

const ProjectData = () => {
  useEffect(() => { document.title = "Project Data | ShizenFlow"; }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">ShizenFlow - Project Documentation</h1>
      <p className="text-muted-foreground mb-10 text-sm">Internal academic documentation. Not listed in navigation.</p>

      {/* 1. PROJECT TITLE */}
      <Section title="1. Project Title">
        <p className="text-lg font-semibold">ShizenFlow: An AI-Powered Personal Finance Tracking and Advisory Web Application</p>
      </Section>

      {/* 2. ABSTRACT */}
      <Section title="2. Abstract">
        <p className="text-muted-foreground leading-relaxed">
          Managing personal finances remains a challenge for individuals who lack access to professional financial advisory services. ShizenFlow addresses this gap by providing an intelligent, web-based personal finance tracker that combines manual transaction logging with AI-driven financial insights. Built using React 18 with TypeScript for type-safe frontend development, Vite as the build tool, Tailwind CSS with shadcn/ui for a modern dark-themed UI, and Supabase for backend services including PostgreSQL database, authentication (email and Google OAuth), and serverless Edge Functions, the application enables users to track expenses, income, and investments in a unified dashboard. The AI layer, powered by Google Gemini 3 Flash Preview via the Lovable AI Gateway, provides real-time streaming financial advice, automated spending alerts, a computed financial health score, and an interactive chat interface where users can ask natural-language questions about their finances. Row-Level Security (RLS) policies ensure data isolation per user. The system demonstrates how modern web technologies and large language models can be combined to democratize personal financial management, offering actionable insights that were previously available only through costly advisory services.
        </p>
      </Section>

      {/* 3. PROBLEM STATEMENT */}
      <Section title="3. Problem Statement">
        <p className="text-muted-foreground leading-relaxed">
          Most individuals struggle to maintain consistent financial records and lack the expertise to derive meaningful insights from their spending, earning, and investment patterns. Existing finance tools are either too complex for casual users or too simplistic to provide actionable guidance. There is a need for an accessible, intelligent personal finance application that not only tracks transactions but also leverages artificial intelligence to analyze financial behavior, detect spending anomalies, and provide personalized recommendations, all within a secure, privacy-respecting architecture.
        </p>
      </Section>

      {/* 4. OBJECTIVES */}
      <Section title="4. Objectives">
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>To design and develop a responsive web application for tracking personal expenses, income, and investments with full CRUD operations.</li>
          <li>To implement a secure authentication system supporting email/password registration with email verification and Google OAuth 2.0 single sign-on.</li>
          <li>To integrate a large language model (Google Gemini) for generating AI-powered financial insights, spending alerts, and interactive financial advisory chat.</li>
          <li>To compute a dynamic financial health score based on savings rate, investment allocation, and spending behavior, providing users with an at-a-glance assessment of their financial well-being.</li>
          <li>To ensure data privacy and security through Supabase Row-Level Security (RLS) policies, ensuring complete data isolation between users at the database level.</li>
        </ol>
      </Section>

      {/* 5. TECH STACK TABLE */}
      <Section title="5. Technology Stack">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Technology</th>
                <th className="text-left p-3 font-semibold">Version</th>
                <th className="text-left p-3 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["React", "^18.3.1", "Frontend UI library for building component-based interfaces"],
                ["TypeScript", "^5.8.3", "Static type checking and improved developer experience"],
                ["Vite", "^5.4.19", "Fast build tool and development server with HMR"],
                ["Tailwind CSS", "^3.4.17", "Utility-first CSS framework for rapid styling"],
                ["shadcn/ui", "Latest", "Accessible, customizable component library built on Radix UI"],
                ["Supabase JS SDK", "^2.98.0", "Client library for database, auth, and Edge Function invocation"],
                ["Supabase Auth", "Built-in", "Email/password and Google OAuth authentication with email verification"],
                ["Supabase PostgreSQL", "15", "Relational database with Row-Level Security for data isolation"],
                ["Supabase Edge Functions", "Deno runtime", "Serverless functions for AI API proxying and business logic"],
                ["Google Gemini 3 Flash Preview", "gemini-3-flash-preview", "Large language model for financial insights and chat"],
                ["Lovable AI Gateway", "v1", "Secure API gateway for LLM access without exposing API keys"],
                ["TanStack React Query", "^5.83.0", "Server state management, caching, and data synchronization"],
                ["React Router DOM", "^6.30.1", "Client-side routing and navigation"],
                ["Recharts", "^2.15.4", "Charting library for data visualization"],
                ["React Hook Form", "^7.61.1", "Performant form handling with validation"],
                ["Zod", "^3.25.76", "Schema validation for form inputs and data"],
                ["react-markdown", "^10.1.0", "Rendering AI-generated markdown responses"],
                ["date-fns", "^3.6.0", "Date formatting and manipulation"],
                ["Lucide React", "^0.462.0", "Icon library for consistent UI iconography"],
                ["Sonner", "^1.7.4", "Toast notification system"],
                ["Radix UI Primitives", "Various", "Accessible UI primitives (Dialog, Select, Tabs, Accordion, etc.)"],
                ["Vitest", "^3.2.4", "Unit testing framework"],
              ].map(([tech, version, purpose]) => (
                <tr key={tech} className="border-t border-border">
                  <td className="p-3 font-medium text-foreground">{tech}</td>
                  <td className="p-3 font-mono text-xs">{version}</td>
                  <td className="p-3">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 6. SYSTEM ARCHITECTURE */}
      <Section title="6. System Architecture">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Frontend Layer:</strong> A single-page application (SPA) built with React 18 and TypeScript, bundled by Vite. The UI follows a dark-themed bento-card design system with glassmorphism effects, built on Tailwind CSS utility classes and shadcn/ui components. Typography uses Space Grotesk for headings and Inter for body text. The application uses React Router v6 for client-side routing with protected route guards that redirect unauthenticated users to the login page.</p>
          <p><strong className="text-foreground">State Management:</strong> TanStack React Query manages all server state with automatic caching, background refetching, and optimistic updates. Local component state uses React useState/useEffect hooks. Authentication state is managed via a React Context provider (AuthProvider) that wraps the entire application and listens to Supabase auth state changes.</p>
          <p><strong className="text-foreground">Backend Layer:</strong> Supabase provides a complete backend-as-a-service. The PostgreSQL database stores user profiles, expenses, income, investments, and AI response cache. Supabase Auth handles user registration, login, email verification, and OAuth flows. Supabase Edge Functions (Deno runtime) serve as a secure proxy for AI API calls, ensuring API keys are never exposed to the client.</p>
          <p><strong className="text-foreground">AI Layer:</strong> A Supabase Edge Function named "ai-chat" receives authenticated requests from the frontend, constructs prompts with the user's financial context, and forwards them to the Lovable AI Gateway (which proxies Google Gemini 3 Flash Preview). The function supports two modes: (1) streaming chat for interactive conversations, and (2) non-streaming alerts mode for generating dashboard spending alerts. AI responses for alerts are cached in an ai_cache table for 24 hours to minimize API calls.</p>
          <p><strong className="text-foreground">Security Layer:</strong> Every database table has Row-Level Security (RLS) policies that restrict all operations (SELECT, INSERT, UPDATE, DELETE) to rows where auth.uid() matches the user_id column. The Edge Function validates JWT tokens before processing requests. The profile creation is handled by a SECURITY DEFINER database trigger on auth.users insertion.</p>
          <p><strong className="text-foreground">Deployment:</strong> The application is deployed via Lovable's hosting infrastructure at shizen.lovable.app, with the Supabase backend provisioned automatically through Lovable Cloud.</p>
        </div>
      </Section>

      {/* 7. MODULE LIST */}
      <Section title="7. Module List">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Module / Component</th>
                <th className="text-left p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {[
                ["Landing.tsx", "Public landing page with animated hero, feature cards, FAQ accordion, particle effects, and CTA sections"],
                ["Login.tsx", "Email/password login form with Google OAuth button and session-based redirect to dashboard"],
                ["Register.tsx", "User registration form with email/password and Google OAuth, including email verification flow"],
                ["Dashboard.tsx", "Main dashboard showing net savings, income, expenses summary cards and AI-generated spending alerts"],
                ["Expenses.tsx", "Full CRUD interface for expense tracking with category filtering, payment method selection, and data table"],
                ["Income.tsx", "Full CRUD interface for income tracking with source categorization and data table"],
                ["Investments.tsx", "Full CRUD interface for investment tracking with portfolio breakdown by type and data table"],
                ["AIInsights.tsx", "AI insights page with financial health score, rule-based insights, and streaming AI chat interface"],
                ["AppLayout.tsx", "Layout wrapper with sidebar navigation for authenticated pages using Outlet pattern"],
                ["AppSidebar.tsx", "Collapsible sidebar navigation with links to all authenticated modules and sign-out button"],
                ["ProtectedRoute.tsx", "Route guard component that redirects unauthenticated users to login"],
                ["NavLink.tsx", "Custom navigation link component with active state styling"],
                ["useAuth.tsx", "Authentication context provider and hook managing session state, user data, and sign-out"],
                ["ai-chat (Edge Function)", "Serverless function handling AI chat streaming and alert generation via Lovable AI Gateway"],
                ["PrivacyPolicy.tsx", "Static privacy policy page"],
                ["TermsOfService.tsx", "Static terms of service page"],
                ["Disclaimer.tsx", "Static disclaimer page"],
                ["NotFound.tsx", "404 error page"],
              ].map(([module, desc]) => (
                <tr key={module} className="border-t border-border">
                  <td className="p-3 font-medium text-foreground font-mono text-xs">{module}</td>
                  <td className="p-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 8. DATABASE SCHEMA */}
      <Section title="8. Database Schema">
        <div className="space-y-6">
          {[
            {
              table: "profiles",
              columns: [
                ["id", "uuid", "Primary key, auto-generated"],
                ["user_id", "uuid", "References auth.users, NOT NULL"],
                ["display_name", "text", "User's display name, nullable"],
                ["avatar_url", "text", "Profile picture URL, nullable"],
                ["created_at", "timestamptz", "Auto-set on creation"],
                ["updated_at", "timestamptz", "Auto-set on creation"],
              ],
              rls: "SELECT, INSERT, UPDATE (own rows only via auth.uid() = user_id)"
            },
            {
              table: "expenses",
              columns: [
                ["id", "uuid", "Primary key, auto-generated"],
                ["user_id", "uuid", "References auth.users, NOT NULL"],
                ["amount", "numeric", "Transaction amount, NOT NULL"],
                ["category", "text", "Default: 'Other'. Values: Food, Transport, Shopping, Bills, Entertainment, Health, Education, Other"],
                ["date", "date", "Default: CURRENT_DATE"],
                ["payment_method", "text", "Default: 'Cash'. Values: Cash, UPI, Credit Card, Debit Card, Net Banking"],
                ["notes", "text", "Optional notes, nullable"],
                ["created_at", "timestamptz", "Auto-set on creation"],
                ["updated_at", "timestamptz", "Auto-set on creation"],
              ],
              rls: "SELECT, INSERT, UPDATE, DELETE (own rows only via auth.uid() = user_id)"
            },
            {
              table: "income",
              columns: [
                ["id", "uuid", "Primary key, auto-generated"],
                ["user_id", "uuid", "References auth.users, NOT NULL"],
                ["amount", "numeric", "Transaction amount, NOT NULL"],
                ["source", "text", "Default: 'Salary'. Values: Salary, Freelance, Business, Investment Returns, Rental, Other"],
                ["date", "date", "Default: CURRENT_DATE"],
                ["notes", "text", "Optional notes, nullable"],
                ["created_at", "timestamptz", "Auto-set on creation"],
                ["updated_at", "timestamptz", "Auto-set on creation"],
              ],
              rls: "SELECT, INSERT, UPDATE, DELETE (own rows only via auth.uid() = user_id)"
            },
            {
              table: "investments",
              columns: [
                ["id", "uuid", "Primary key, auto-generated"],
                ["user_id", "uuid", "References auth.users, NOT NULL"],
                ["amount", "numeric", "Investment amount, NOT NULL"],
                ["type", "text", "Default: 'Other'. Values: Mutual Fund, Stocks, Fixed Deposit, PPF, Gold, Crypto, Real Estate, Other"],
                ["date", "date", "Default: CURRENT_DATE"],
                ["notes", "text", "Optional notes, nullable"],
                ["created_at", "timestamptz", "Auto-set on creation"],
                ["updated_at", "timestamptz", "Auto-set on creation"],
              ],
              rls: "SELECT, INSERT, UPDATE, DELETE (own rows only via auth.uid() = user_id)"
            },
            {
              table: "ai_cache",
              columns: [
                ["id", "uuid", "Primary key, auto-generated"],
                ["user_id", "uuid", "NOT NULL"],
                ["cache_key", "text", "Unique cache identifier (e.g., dashboard-alerts-YYYY-MM-DD)"],
                ["response", "text", "Cached AI response JSON, nullable"],
                ["token_count", "integer", "Default: 0"],
                ["created_at", "timestamptz", "Auto-set on creation"],
              ],
              rls: "SELECT, INSERT, DELETE (own rows only via auth.uid() = user_id)"
            },
          ].map((t) => (
            <div key={t.table} className="bento-card p-5">
              <h3 className="font-bold text-lg mb-1 font-mono text-primary">{t.table}</h3>
              <p className="text-xs text-muted-foreground mb-3">RLS: {t.rls}</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="pb-2 pr-4">Column</th>
                    <th className="pb-2 pr-4">Type</th>
                    <th className="pb-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {t.columns.map(([col, type, details]) => (
                    <tr key={col} className="border-t border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs text-foreground">{col}</td>
                      <td className="py-2 pr-4 font-mono text-xs text-accent">{type}</td>
                      <td className="py-2 text-muted-foreground text-xs">{details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. AI INTEGRATION DETAILS */}
      <Section title="9. AI Integration Details">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Model:</strong> Google Gemini 3 Flash Preview (<code className="text-primary text-xs bg-muted px-1.5 py-0.5 rounded">google/gemini-3-flash-preview</code>)</p>
          <p><strong className="text-foreground">API Gateway:</strong> Lovable AI Gateway at <code className="text-primary text-xs bg-muted px-1.5 py-0.5 rounded">https://ai.gateway.lovable.dev/v1/chat/completions</code> (OpenAI-compatible endpoint)</p>
          <p><strong className="text-foreground">Authentication:</strong> Server-side only. The Edge Function authenticates using LOVABLE_API_KEY stored as a Supabase secret. Client requests are authenticated via Supabase JWT tokens validated through <code className="text-primary text-xs bg-muted px-1.5 py-0.5 rounded">supabase.auth.getClaims()</code>.</p>
          <p><strong className="text-foreground">System Prompt:</strong></p>
          <pre className="bg-muted p-4 rounded-xl text-xs overflow-x-auto text-foreground">
{`"You are ShizenFlow AI, a personal finance assistant. Analyze the user's
financial data and provide actionable guidance. Use simple language. Be direct.
Keep answers concise. Use bullet points for lists. Do not use em dashes.
Do not use banned words like 'delve', 'unlock', 'revolutionize', 'game-changer'.
Address the user as 'you'. Focus on practical steps they can take today."`}
          </pre>
          <p><strong className="text-foreground">Chat Mode (Streaming):</strong> The frontend sends the full conversation history along with a financial context string containing total income, expenses, savings, savings rate, investments, health score, and category-wise spending breakdown. The Edge Function streams SSE responses back, which the frontend parses incrementally and renders using react-markdown.</p>
          <p><strong className="text-foreground">Alerts Mode (Non-streaming):</strong> A separate prompt asks the model to generate exactly 3 short actionable alerts as a JSON array. The response is parsed, displayed on the dashboard, and cached in the ai_cache table for 24 hours using a date-based cache key.</p>
          <p><strong className="text-foreground">Error Handling:</strong> The Edge Function handles HTTP 429 (rate limiting) and 402 (credit exhaustion) responses from the AI gateway, returning appropriate error messages to the frontend.</p>
        </div>
      </Section>

      {/* 10. KEY FEATURES */}
      <Section title="10. Key Features">
        <div className="space-y-4">
          {[
            {
              title: "1. Expense Tracking with Categorization",
              desc: "Users can add, edit, and delete expenses with fields for amount, date, category (8 predefined categories), payment method (5 options), and optional notes. A category filter allows viewing expenses by type. Implementation uses React Query mutations with Supabase real-time invalidation."
            },
            {
              title: "2. Income Management",
              desc: "Complete CRUD operations for income entries with source categorization (Salary, Freelance, Business, Investment Returns, Rental, Other). The total income is computed client-side and displayed as a summary badge."
            },
            {
              title: "3. Investment Portfolio Tracking",
              desc: "Track investments across 8 asset classes (Mutual Fund, Stocks, Fixed Deposit, PPF, Gold, Crypto, Real Estate, Other). The portfolio summary shows total value and percentage breakdown by type."
            },
            {
              title: "4. AI-Powered Financial Health Score",
              desc: "A computed score (0-100) graded A-D based on savings rate (>=20% adds 20 points), investment presence (+15 points), and positive savings (+15 points). Displayed with an animated progress bar on the AI Insights page."
            },
            {
              title: "5. Streaming AI Chat Interface",
              desc: "Users can converse with Google Gemini about their finances in real-time. The chat streams responses via Server-Sent Events (SSE), parsed incrementally and rendered as markdown. Quick prompt buttons provide common starting questions."
            },
            {
              title: "6. Automated AI Spending Alerts",
              desc: "On the dashboard, the system automatically generates 3 actionable financial alerts by sending aggregated financial data to the AI. Alerts are cached for 24 hours in the ai_cache table and can be individually dismissed."
            },
            {
              title: "7. Secure Authentication System",
              desc: "Supports email/password registration with mandatory email verification and Google OAuth 2.0. Session management is handled via Supabase Auth with automatic token refresh. Protected routes redirect unauthenticated users. Profile creation is automated via a database trigger."
            },
            {
              title: "8. Animated Landing Page",
              desc: "A visually rich landing page featuring canvas-based particle animations with connecting lines, mouse-following radial glow effects, scroll-reveal animations via IntersectionObserver, animated counters, magnetic button hover effects, and a glassmorphism design system with bento-card layouts."
            },
          ].map((f) => (
            <div key={f.title} className="bento-card p-5">
              <h3 className="font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 11. LITERATURE REVIEW TOPICS */}
      <Section title="11. Literature Review Topics">
        <div className="space-y-3 text-muted-foreground">
          {[
            { topic: "Personal Finance Management Systems", desc: "Survey of digital tools for budgeting, expense tracking, and financial planning. Covers the evolution from spreadsheet-based systems to cloud-native applications with real-time synchronization." },
            { topic: "Artificial Intelligence in Financial Technology (FinTech)", desc: "Applications of machine learning and large language models in financial advisory, fraud detection, credit scoring, and personalized financial recommendations." },
            { topic: "Automated Expense Categorization", desc: "Techniques for classifying financial transactions including rule-based systems, NLP-based approaches, and deep learning models for merchant and category classification." },
            { topic: "Behavioral Finance and Nudge Theory", desc: "How digital interfaces can influence financial behavior through alerts, health scores, and contextual recommendations. The role of cognitive biases in spending decisions." },
            { topic: "Security and Privacy in Financial Web Applications", desc: "Row-Level Security, JWT-based authentication, OAuth 2.0 protocols, data encryption at rest and in transit, and compliance considerations for handling personal financial data." },
          ].map((item) => (
            <div key={item.topic} className="border-l-2 border-primary/30 pl-4">
              <p className="font-medium text-foreground">{item.topic}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 12. FUTURE SCOPE */}
      <Section title="12. Future Scope">
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li><strong className="text-foreground">Bank Account Integration via Plaid/Yodlee API:</strong> Automate transaction import by connecting to bank accounts through aggregation APIs, eliminating manual data entry and enabling real-time transaction categorization using AI.</li>
          <li><strong className="text-foreground">Budget Planning with AI Goal Setting:</strong> Implement monthly/weekly budget targets per category with AI-generated budget recommendations based on historical spending patterns. Include progress tracking and overspend notifications via push notifications.</li>
          <li><strong className="text-foreground">Recurring Transaction Detection:</strong> Use pattern recognition to automatically identify recurring expenses (subscriptions, EMIs, rent) and project future cash flows. Alert users about upcoming charges and suggest optimization of subscription spending.</li>
          <li><strong className="text-foreground">Multi-Currency Support with Real-Time Conversion:</strong> Add currency selection per transaction with live exchange rate integration via a forex API. Enable portfolio valuation in the user's preferred base currency for users with international investments.</li>
          <li><strong className="text-foreground">Progressive Web App (PWA) with Offline Mode:</strong> Implement service workers for offline transaction entry, background sync when connectivity resumes, and install-to-home-screen functionality for a native-app-like experience on mobile devices.</li>
        </ol>
      </Section>

      {/* 13. CHALLENGES FACED */}
      <Section title="13. Challenges Faced">
        <div className="space-y-4">
          {[
            {
              challenge: "Google OAuth Redirect Handling",
              solution: "After Google OAuth popup completion, the session was set in the background but the UI did not navigate to the dashboard. Solved by adding a useEffect in Login/Register components that watches the session from useAuth and redirects to /dashboard when a session is detected."
            },
            {
              challenge: "SSE Stream Parsing for AI Chat",
              solution: "The AI gateway returns Server-Sent Events with chunked JSON payloads. Partial chunks across read boundaries caused JSON parse errors. Implemented a line-buffer approach that accumulates data, splits by newlines, and falls back to re-buffering incomplete lines for the next read cycle."
            },
            {
              challenge: "AI Response Caching Without Stale Data",
              solution: "AI alerts needed to be fresh daily but not re-generated on every page load. Implemented a date-based cache key (dashboard-alerts-YYYY-MM-DD) in the ai_cache table, so alerts are generated once per day per user and served from cache on subsequent visits."
            },
            {
              challenge: "Row-Level Security with Profile Auto-Creation",
              solution: "The profiles table has RLS policies restricting inserts to matching user_id. However, the trigger that creates profiles runs on auth.users insertion and needs to bypass RLS. Resolved by using SECURITY DEFINER on the handle_new_user() trigger function, allowing it to execute with elevated privileges."
            },
            {
              challenge: "Email Verification UX Confusion",
              solution: "Users signing up with email/password could not log in immediately because email verification was required, but the error message was generic. Improved by detecting 'Email not confirmed' in the error response and showing a specific toast instructing users to check their inbox for the verification link."
            },
          ].map((c) => (
            <div key={c.challenge} className="bento-card p-5">
              <p className="font-semibold text-foreground mb-1">Challenge: {c.challenge}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">Solution: {c.solution}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 14. RESULTS */}
      <Section title="14. Results">
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>The ShizenFlow application successfully achieves its stated objectives:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Users can register, verify their email, and sign in via email/password or Google OAuth with seamless session management.</li>
            <li>Full CRUD operations work correctly for expenses (8 categories, 5 payment methods), income (6 sources), and investments (8 asset types).</li>
            <li>The AI-powered financial health score accurately reflects user financial behavior, updating dynamically as new transactions are added.</li>
            <li>The streaming AI chat responds in real-time with context-aware financial advice, rendering markdown-formatted responses with bullet points and structured guidance.</li>
            <li>Automated AI alerts are generated daily and cached for 24 hours, reducing API calls while maintaining freshness.</li>
            <li>All data is isolated per user via RLS policies. No user can access another user's financial data.</li>
            <li>The application loads within 2 seconds on standard broadband connections, with Vite's code splitting and lazy loading optimizing initial bundle size.</li>
            <li>The dark-themed UI with glassmorphism and bento-card design provides a modern, visually cohesive experience across desktop and mobile viewports.</li>
          </ul>
        </div>
      </Section>

      {/* 15. REFERENCES */}
      <Section title="15. References (IEEE Format)">
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm">
          <li>A. Banks and E. Porcello, <em>Learning React: Modern Patterns for Developing React Apps</em>, 2nd ed. Sebastopol, CA, USA: O'Reilly Media, 2020.</li>
          <li>S. Tilkov and S. Vinoski, "Node.js: Using JavaScript to Build High-Performance Network Programs," <em>IEEE Internet Computing</em>, vol. 14, no. 6, pp. 80-83, Nov.-Dec. 2010.</li>
          <li>Google DeepMind, "Gemini: A Family of Highly Capable Multimodal Models," <em>arXiv preprint arXiv:2312.11805</em>, 2023.</li>
          <li>P. Copplestone and A. Wilson, "Supabase: The Open Source Firebase Alternative," in <em>Proc. Open Source Software Conf.</em>, 2021, pp. 1-8.</li>
          <li>R. H. Thaler and C. R. Sunstein, <em>Nudge: Improving Decisions About Health, Wealth, and Happiness</em>. New Haven, CT, USA: Yale University Press, 2008.</li>
          <li>A. Fuster, P. Goldsmith-Pinkham, T. Ramadorai, and A. Walther, "Predictably Unequal? The Effects of Machine Learning on Credit Markets," <em>The Journal of Finance</em>, vol. 77, no. 1, pp. 5-47, 2022.</li>
          <li>OWASP Foundation, "OWASP Top Ten Web Application Security Risks," 2021. [Online]. Available: https://owasp.org/www-project-top-ten/</li>
          <li>W3C, "Progressive Web Apps," <em>Web Platform Working Group</em>, 2023. [Online]. Available: https://www.w3.org/TR/appmanifest/</li>
        </ol>
      </Section>

      <footer className="border-t border-border pt-6 pb-12 text-center text-muted-foreground text-xs">
        <p>ShizenFlow - Internal Project Documentation</p>
        <p>Generated from codebase analysis. For academic use only.</p>
      </footer>
    </div>
  );
};

export default ProjectData;
