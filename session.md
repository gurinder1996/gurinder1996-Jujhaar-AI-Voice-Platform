```markdown
# Phonely.ai Clone: Supabase + NextAuth Integration Plan

This document extends our **Supabase** backend setup by adding **user session** management with **NextAuth**. We’ll cover:

1. How to **store and manage users** in Supabase (for sign up, sign in).  
2. How to **configure NextAuth** to seamlessly integrate with Supabase.  
3. How to **protect pages and API routes** based on user authentication.  

---

## Table of Contents

1. [Overview](#overview)  
2. [Why NextAuth + Supabase](#why-nextauth--supabase)  
3. [High-Level Flow](#high-level-flow)  
4. [Step 1: Supabase Tables & Auth Setup](#step-1-supabase-tables--auth-setup)  
   - [Enable Supabase Auth](#enable-supabase-auth)  
   - [Create / Configure Tables](#create--configure-tables)  
5. [Step 2: Installing & Configuring NextAuth](#step-2-installing--configuring-nextauth)  
   - [Installation](#installation)  
   - [Configuring the `/[...nextauth].js` File](#configuring-the-nextauthjs-file)  
   - [Adapter Options](#adapter-options)  
6. [Step 3: Protecting Pages & API Routes](#step-3-protecting-pages--api-routes)  
7. [Step 4: Sign Up & Sign In Flows](#step-4-sign-up--sign-in-flows)  
   - [Option A: Use Supabase Auth (Email/Password)](#option-a-use-supabase-auth-emailpassword)  
   - [Option B: Use NextAuth Credentials Provider + Supabase Validation](#option-b-use-nextauth-credentials-provider--supabase-validation)  
8. [Bonus: RLS Policies & Organization-Based Access](#bonus-rls-policies--organization-based-access)  
9. [Example Code Snippets](#example-code-snippets)  
10. [Next Steps](#next-steps)  

---

## 1. Overview

- **Next.js**: Already set up for our Phonely.ai clone’s frontend.  
- **Supabase**: Handling our database (PostgreSQL) and potentially user authentication.  
- **NextAuth**: A popular authentication library for Next.js that provides a flexible way to manage sessions, user sign in/sign out, and protect routes.

The goal:  
- Users can **create accounts (sign up)** or **log in** using email and password.  
- **NextAuth** maintains the user’s session.  
- **Supabase** is the single source of truth for user data (and any additional user fields).  

---

## 2. Why NextAuth + Supabase

1. **NextAuth**:
   - Easy to configure with **Providers** (Credentials, OAuth, etc.).  
   - Built-in support for sessions (JWT or database sessions).  
   - Simple hooks for controlling access to pages (`getServerSideProps`, client-side, etc.).

2. **Supabase**:
   - Provides **Auth** features (email/password, OAuth) out of the box.  
   - Integrates naturally with Postgres-based user tables.  
   - Row-Level Security (RLS) to protect data.

By pairing NextAuth + Supabase, we get the best of both worlds—**NextAuth** for session handling in Next.js, and **Supabase** for robust data storage and management.

---

## 3. High-Level Flow

```ascii
[ User ] -- (Sign Up / Sign In) --> [ Next.js App ]
                                  |
                                  | NextAuth checks credentials (or calls Supabase Auth)
                                  v
                         [ NextAuth Session Management ]
                                  |
                                  v
               [ Supabase Database / Auth / Policies / RLS ]
```

1. User **signs up** or **logs in** through NextAuth.  
2. NextAuth **verifies** the user via Supabase (or Supabase Auth).  
3. A **session** is created—on subsequent page visits, NextAuth recognizes the user as logged in.  
4. Any protected database calls use the user’s **JWT** or the user ID from the session for RLS enforcement.

---

## 4. Step 1: Supabase Tables & Auth Setup

### Enable Supabase Auth

1. In your Supabase project dashboard, under **Authentication**:  
   - Enable **Email/Password** signups (optional to also enable other providers like Google, GitHub, etc.).  
2. By default, Supabase will store users in the `auth.users` table.  
3. You can also create a **profile** table that references `auth.users.id` if you need extra fields per user.

### Create / Configure Tables

Ensure your **organizations**, **agents**, **calls**, etc. are set up as described in previous documentation. For user-specific data, you can link rows to `auth.users.id` or a separate `profiles` table:

```sql
-- Example "profiles" table
create table if not exists profiles (
  id uuid references auth.users (id) on delete cascade primary key,
  full_name text,
  organization_id uuid references organizations (id),
  created_at timestamp with time zone default now()
);
```

---

## 5. Step 2: Installing & Configuring NextAuth

### Installation

In your Next.js project:

```bash
npm install next-auth
```

### Configuring the `/[...nextauth].js` File

1. Create a file:  
   ```bash
   # If using the new app router in Next.js 13+, it's under app/api/auth/[...nextauth]/route.js
   # For Next.js 12 or earlier, it's pages/api/auth/[...nextauth].js

   # Example in pages/api/auth/[...nextauth].js:
   ```

2. **Basic Setup**:

   ```js
   import NextAuth from "next-auth";

   export default NextAuth({
     providers: [
       // We'll define how we authenticate (see next section).
     ],
     // Additional options: callbacks, pages, session, etc.
   });
   ```

### Adapter Options

- **Option A: Use the official Supabase Auth** as your provider. Then NextAuth basically just keeps track of your session.  
- **Option B: Use a NextAuth Credentials Provider** that queries the `auth.users` table (or a custom user table) to validate email/password.  
- **Option C: Use a “NextAuth-Supabase-Adapter”** which stores NextAuth sessions directly in Supabase. (Community-driven solutions exist, e.g., [next-auth-supabase-adapter](https://github.com/tmm/next-auth-supabase-adapter).)

For simplicity, many developers rely on Supabase’s built-in email/password plus **supabase-js** on the client side. However, since we want NextAuth’s features (session, SSR protection, etc.), we can connect the dots via credentials or an OAuth flow.

---

## 6. Step 3: Protecting Pages & API Routes

NextAuth provides multiple ways to protect content:

1. **Client-Side**:  
   - Use the React hook `useSession()` from `next-auth/react`.  
   - If no session, redirect to `/auth/signin`.

2. **Server-Side**:  
   - Use `getServerSideProps` or `getServerSideAuthSession` to check if a user is authenticated.  
   - If not, redirect before rendering the page.

3. **API Routes**:  
   - Use `import { getSession } from "next-auth/react"` or `getServerSession` in your route to verify the user token.

---

## 7. Step 4: Sign Up & Sign In Flows

You can structure sign-up and sign-in in multiple ways:

### Option A: Use Supabase Auth (Email/Password)

1. On your **sign up** page, call `supabase.auth.signUp({ email, password })`.  
2. On your **sign in** page, call `supabase.auth.signInWithPassword({ email, password })`.  
3. If successful, store the returned session in a **NextAuth** session.  
   - Some developers skip NextAuth altogether here and rely purely on the `supabase.auth` session. However, that can complicate SSR-based protection unless you do custom logic.

### Option B: Use NextAuth Credentials Provider + Supabase Validation

1. In `providers` within `[...nextauth].js`:

   ```js
   import CredentialsProvider from "next-auth/providers/credentials";
   import { supabase } from "../../../lib/supabaseClient"; // Or a server-side instance

   export default NextAuth({
     providers: [
       CredentialsProvider({
         name: "Credentials",
         credentials: {
           email: { label: "Email", type: "email" },
           password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
           // 1) Try to sign in with Supabase Auth
           const { data, error } = await supabase.auth.signInWithPassword({
             email: credentials.email,
             password: credentials.password,
           });

           // 2) If error, return null => Not authorized
           if (error) {
             return null;
           }

           // 3) If success, return the user object
           return data.user;
         },
       }),
     ],
     callbacks: {
       async jwt({ token, user }) {
         if (user) {
           token.id = user.id;
           token.email = user.email;
         }
         return token;
       },
       async session({ session, token }) {
         if (token) {
           session.user.id = token.id;
           session.user.email = token.email;
         }
         return session;
       },
     },
     // ...
   });
   ```

2. **Sign Up** can be a separate custom page where you do a `supabase.auth.signUp(...)` call, then redirect the user to sign in with NextAuth credentials. Or you can define a second credentials provider for sign-up.

3. **Session** is stored in a secure **HttpOnly cookie** by NextAuth. This enables SSR page protection and easy session checking.

---

## 8. Bonus: RLS Policies & Organization-Based Access

Once users are logged in:

- Their user ID is available in the **NextAuth session**.  
- For each Supabase query, you can pass the user’s Supabase access token (if you want Supabase’s Realtime or RLS). Alternatively, you can do your own RLS logic on the server side (using the user ID from the session to limit queries).

**Example**: If your `agents` table has RLS requiring `organization_id` to match the user’s organization, ensure you store the user’s `organization_id` in the `profiles` table. Then your RLS policy can check `auth.uid()` against that `organization_id`.

---

## 9. Example Code Snippets

### 9.1 Protecting a Page with `getServerSideProps`

```js
// pages/dashboard.js
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin", // or a custom sign in page
        permanent: false,
      },
    };
  }

  // Fetch user-related data from Supabase, etc.

  return {
    props: {
      user: session.user,
    },
  };
}

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      {/* Render data, etc. */}
    </div>
  );
}
```

### 9.2 Checking Session Client-Side

```jsx
// components/SomeProtectedComponent.jsx
import { useSession } from "next-auth/react";

export function SomeProtectedComponent() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Please log in to view this content.</p>;
  }

  return <p>You have access!</p>;
}
```

### 9.3 Sign Up Page (Manual Flow)

```jsx
// pages/auth/signup.js
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Sign up successful! Please check your email to confirm.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>{msg}</p>
    </div>
  );
}
```

Then the user can **sign in** using the NextAuth **Credentials** provider.

---

## 10. Next Steps

1. **Decide** on your approach for user management:
   - If you want to rely on **Supabase Auth** natively or use **NextAuth** credentials for everything.  
2. **Configure** RLS policies:
   - So that each user sees only data from their own organization.  
3. **Protect** your Next.js pages and API routes:
   - Use NextAuth session checks (client or server side).  
4. **Sync** user data:
   - Possibly store extended user info in a `profiles` table referencing `auth.users.id`.  
5. **Testing**:
   - Attempt sign up, sign in, sign out flows.  
   - Attempt unauthorized data access (should fail with RLS).  

---

## Conclusion

By integrating **NextAuth** and **Supabase**, you achieve:

- **Simple session management** with Next.js (auto cookies, SSR protection).  
- **Robust user data** in a Postgres database, plus optional RLS.  
- **Scalable architecture** for your Phonely.ai clone—easy to expand to more providers, advanced org-based access, etc.

Use this plan as a **roadmap** to implement a production-grade sign up & login flow, ensure only logged-in users can access your application, and keep your data secure in Supabase with RLS. Once in place, your Phonely.ai clone will be ready to handle real users with confidence. 
```