

# ShizenFlow: Complete Overhaul Plan

This is a large scope covering rebrand, content rewrite, SEO, UI/UX upgrade, and AI integration. I recommend splitting into 3 implementation rounds. Here is Round 1 (the biggest chunk).

---

## 1. Rebrand: Lotus Finance to ShizenFlow

Update all references across the entire app:
- `index.html`: title, meta tags, OG tags, Twitter tags
- `Landing.tsx`: navbar brand, hero copy, features, CTA, footer, disclaimer
- `AppSidebar.tsx`: sidebar brand name
- `Login.tsx` / `Register.tsx`: card descriptions
- `Dashboard.tsx`: welcome text
- `AIInsights.tsx`: page references

"Shizen" means "nature/natural" in Japanese. The brand identity shifts to a clean, natural flow of money.

## 2. Full SEO Implementation

Inspired by the SayItForYou SEO structure:

- **index.html**: Add comprehensive meta tags (robots, googlebot, bingbot, geo, AEO, speakable, revisit-after), canonical URL, hreflang, theme-color, apple-mobile-web-app tags
- **JSON-LD structured data**: Organization, WebSite, WebApplication, FAQPage, BreadcrumbList schemas
- **OG/Twitter meta**: Complete with image dimensions, alt text, locale, site_name
- **robots.txt**: Already exists, enhance with Sitemap reference
- **public/sitemap.xml**: Create with all public routes (/, /login, /register) and app routes
- **Per-page SEO**: Add `document.title` updates via `useEffect` on each page (Dashboard, Expenses, Income, Investments, AI Insights)

## 3. UI/UX Overhaul (SayItForYou-inspired)

Taking design patterns from the uploaded HTML:

**Color palette update**: Shift from green/gold to a deeper, more modern palette. Dark background (`#0a0a0f`), gradient accent system, refined glassmorphism with stronger blur and subtler borders.

**Landing page redesign**:
- Larger hero headline with italic gradient emphasis (like "Say what you couldn't say")
- Floating tag with live dot animation
- Stats row chips (like "500+ Delivered")
- Bento grid for "How It Works" section (replacing simple feature cards)
- Mission/statement block with radial gradient background
- FAQ accordion section
- Stronger CTA section with gradient button and shadow
- Refined footer with two-column layout

**App pages polish**:
- Bento card style for summary cards (darker backgrounds, subtle borders, hover lift)
- Scroll-reveal animations (opacity + translateY on intersection)
- Refined typography (tighter letter-spacing on headings, lighter body text)

**Global CSS updates**:
- Add scroll-reveal utility classes
- Add bento card styles
- Refine glass-card with more opacity control
- Add gradient button variant
- Tighter spacing and typography tokens

## 4. Content Rewrite (Following Writing Rules)

Rewrite ALL user-facing copy following the strict rules:
- No em dashes, no banned words, no rhetorical questions
- Short sentences. Active voice. Direct address with "you/your"
- Practical and actionable language

Pages to rewrite: Landing (hero, features, CTA, footer), Login, Register, Dashboard, Expenses, Income, Investments, AI Insights (all headings, descriptions, empty states, tooltips)

## 5. AI Integration (Lovable AI via Edge Function)

**Edge function**: `supabase/functions/ai-chat/index.ts`
- Uses Lovable AI gateway with `google/gemini-3-flash-preview`
- System prompt: "You are ShizenFlow AI, a personal finance assistant. Analyze the user's financial data and provide actionable guidance. Use simple language. Be direct."
- Accepts user messages + financial context (totals, categories, savings rate)
- Streaming SSE response
- Handles 429/402 errors

**AI Insights page upgrade**:
- Add AI chat interface below the health score and insights cards
- Predefined prompt buttons: "How do I cut spending?", "Is my savings rate healthy?", "Where should I invest?"
- Streaming response display with markdown rendering
- Send user's financial summary as context with each message

**AI Smart Alerts on Dashboard**:
- Fetch AI-generated alerts on dashboard load
- Non-streaming call to edge function with alert-generation prompt
- Cache results in `ai_cache` table (24h TTL)
- Display as dismissible alert cards

**Update config.toml** to register the edge function with `verify_jwt = false`.

## 6. Mobile Responsive Polish

- Collapsible sidebar (already handled by SidebarProvider)
- Stack landing page stats row on mobile
- Full-width bento cards on mobile
- Touch-friendly form inputs (min 44px tap targets)

---

## Technical Details

**Files to create:**
- `public/sitemap.xml`
- `supabase/functions/ai-chat/index.ts`

**Files to modify:**
- `index.html` (SEO meta, title, brand)
- `src/index.css` (color tokens, new utility classes, animations)
- `src/pages/Landing.tsx` (full redesign + content)
- `src/pages/Login.tsx` (rebrand + content)
- `src/pages/Register.tsx` (rebrand + content)
- `src/pages/Dashboard.tsx` (rebrand + AI alerts + content)
- `src/pages/Expenses.tsx` (content + UI polish)
- `src/pages/Income.tsx` (content + UI polish)
- `src/pages/Investments.tsx` (content + UI polish)
- `src/pages/AIInsights.tsx` (AI chat + content + UI polish)
- `src/components/AppSidebar.tsx` (rebrand)
- `src/components/AppLayout.tsx` (minor polish)
- `public/robots.txt` (add sitemap reference)
- `supabase/config.toml` (edge function registration)

**Dependencies to add:**
- `react-markdown` (for AI chat response rendering)

