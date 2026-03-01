

## Root Causes

**Email login fails**: Expected behavior. New users haven't confirmed their email yet. You want to keep verification, so the fix is better error messaging telling users to check their inbox.

**Google OAuth "does nothing"**: The OAuth popup flow actually completes and sets the session, BUT neither Login.tsx nor Register.tsx listen for session changes or redirect authenticated users. After Google OAuth sets the session via `supabase.auth.setSession()`, the user just stays on `/login` or `/register` with no navigation.

## Fixes

### 1. Add authenticated-user redirect to Login.tsx and Register.tsx
Import `useAuth` hook. If `session` exists, redirect to `/dashboard`. This handles:
- Post-Google-OAuth redirect (session gets set in background, component re-renders, detects session, navigates)
- Users who are already logged in visiting `/login` or `/register`

### 2. Improve login error message for unconfirmed email
In `handleLogin`, check if `error.message` contains "Email not confirmed". Show a specific toast: "Please verify your email first. Check your inbox for the confirmation link."

### 3. Add navigation after successful Google OAuth
Update the Google OAuth button click handlers in both Login.tsx and Register.tsx to explicitly navigate to `/dashboard` after a successful sign-in (as a fallback alongside the session-based redirect).

---

**Files to modify:**
- `src/pages/Login.tsx` — add `useAuth` + redirect when session exists, improve error message
- `src/pages/Register.tsx` — add `useAuth` + redirect when session exists

