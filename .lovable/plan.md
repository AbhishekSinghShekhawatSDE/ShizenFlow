

## Issue Analysis

**Problem 1: Login fails after signup** - Auth logs show `"Email not confirmed"` error. Users sign up, get redirected to login, but cannot sign in because email verification is pending. The confirmation email hook runs successfully but the user has no way to confirm in time.

**Problem 2: Google OAuth** - The code looks correct (uses `lovable.auth.signInWithOAuth`). The auth logs show the existing user (abhisheksinghshekhawat63@gmail.com) successfully using Google OAuth. This likely works. If it fails for the user, it may be a redirect URL issue.

## Fix Plan

### 1. Enable auto-confirm email signups
Use the configure-auth tool to enable auto-confirm so new users can log in immediately after registration. This is the root cause of the login failure.

### 2. Improve Register.tsx post-signup flow
After successful signup with auto-confirm enabled, navigate directly to `/dashboard` instead of `/login` with a "check your email" message (since there's no email to check anymore).

### 3. Improve Login error handling
Update the login error handler to show a more helpful message when the error is "Email not confirmed", telling the user to check their email inbox.

### 4. Fix console warnings
- Wrap `AnimatedCounter` and `MagneticButton` components in `React.forwardRef()` to fix the ref warnings in Landing.tsx.

