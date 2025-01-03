```markdown
# Phonely.ai Clone: Detailed Plan for Supabase Tables & UI Integration

This document provides a **detailed plan** for setting up **Supabase tables** to store all relevant data for the Phonely.ai clone. We will also outline how to connect these tables to your **Next.js** frontend so that when users click certain buttons (e.g., creating an agent, updating a call, etc.), the database updates accordingly.

---

## Table of Contents

1. [Overview](#overview)  
2. [Supabase Project & Initial Setup](#supabase-project--initial-setup)  
3. [Database Schema & Design](#database-schema--design)  
   - [Users](#1-users)  
   - [Organizations](#2-organizations)  
   - [Agents](#3-agents)  
   - [Calls](#4-calls)  
   - [Knowledge Base](#5-knowledge-base)  
   - [Workflows](#6-workflows)  
4. [Creating the Tables in Supabase](#creating-the-tables-in-supabase)  
   - [Using the Dashboard](#using-the-dashboard)  
   - [Using SQL Scripts](#using-sql-scripts)  
5. [Row-Level Security (RLS) & Policies](#row-level-security-rls--policies)  
6. [Connecting Supabase to Next.js](#connecting-supabase-to-nextjs)  
   - [Environment Variables](#environment-variables)  
   - [Creating a Supabase Client](#creating-a-supabase-client)  
7. [Example: Button Click -> Database Update](#example-button-click---database-update)  
   - [Frontend Code (Next.js)](#frontend-code-nextjs)  
   - [Server-Side / API Route (Optional)](#server-side--api-route-optional)  
8. [Testing & Verification](#testing--verification)  
9. [Next Steps](#next-steps)  

---

## 1. Overview

We assume you already have:

- A **Next.js** frontend set up.  
- A **Supabase** project created (with your unique Supabase URL and API keys).

The goal now is to:

1. **Create the core tables** (users, organizations, agents, calls, knowledge_base, workflows).  
2. **Implement row-level security (RLS)** so users/organizations can only view or modify their own data.  
3. **Integrate** these tables with your Next.js UI so that on button clicks (e.g., “Create Agent”), records are written to Supabase.

---

## 2. Supabase Project & Initial Setup

1. **Create a New Supabase Project** (if you haven’t already)  
   - Go to [app.supabase.com](https://app.supabase.com/), create or select a project.
   - Under “Settings” → “API”, you’ll find your Project URL and public `anon` key.

2. **Set Environment Variables** in your Next.js project:  
   - In `.env.local`:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT.supabase.co"
     NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR-PUBLIC-ANON-KEY"
     SUPABASE_SERVICE_KEY="YOUR-SERVICE-ROLE-KEY"
     ```
   - Keep the **service key** private (used only on the server side).

---

## 3. Database Schema & Design

Below is a suggested schema for the Phonely.ai clone. Adapt fields as needed.

### 1) **users**
- **Description**: Manages user authentication (will rely on Supabase Auth).  
- **Schema**: By default, Supabase Auth populates `auth.users` with:
  - `id (UUID)`  
  - `email`  
  - `created_at`  
  - etc.  
- You can optionally create a **profile** table that references `auth.users.id` if you need extra fields for each user.

### 2) **organizations**
- **Fields**:
  - `id` (UUID) — Primary key  
  - `name` (text)  
  - `owner_id` (UUID) — references `auth.users.id`  
  - `created_at` (timestamp with time zone) — default `now()`  

### 3) **agents**
- **Fields**:
  - `id` (UUID) — Primary key  
  - `organization_id` (UUID) — references `organizations.id`  
  - `agent_name` (text)  
  - `greeting` (text)  
  - `personality` (text)  
  - `created_at` (timestamp with time zone)  
  - `updated_at` (timestamp with time zone)  

### 4) **calls**
- **Fields**:
  - `id` (UUID) — Primary key  
  - `agent_id` (UUID) — references `agents.id`  
  - `started_at` (timestamp with time zone)  
  - `ended_at` (timestamp with time zone)  
  - `duration` (integer)  
  - `phone_number` (text)  
  - `outcome` (text)  
  - `sentiment` (text)  
  - `recording_url` (text)  
  - `transcript` (text)  
  - `created_at` (timestamp with time zone) — default `now()`  

### 5) **knowledge_base**
- **Fields**:
  - `id` (UUID) — Primary key  
  - `agent_id` (UUID) — references `agents.id`  
  - `question` (text)  
  - `answer` (text)  
  - `created_at` (timestamp with time zone)  

### 6) **workflows**
- **Fields**:
  - `id` (UUID) — Primary key  
  - `agent_id` (UUID) — references `agents.id`  
  - `title` (text)  
  - `definition_json` (jsonb) — store workflow steps in JSON  
  - `created_at` (timestamp with time zone)  

> **Note**: You can store conversation logic in `definition_json` or in additional columns as needed.

---

## 4. Creating the Tables in Supabase

### Using the Dashboard

1. **Open** your Supabase project and go to the “Table editor” in the left navigation.  
2. **Create a Table** → Fill in the details (table name, columns, data types).  
3. **Add columns** for each field above.  
4. **Relationships**: If referencing another table, choose the `foreign key` constraint.  
5. **Save** each table.

### Using SQL Scripts

Alternatively, you can run SQL in the “SQL Editor”:

```sql
-- Example creation of organizations table
create table if not exists organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Example creation of agents table
create table if not exists agents (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid not null references organizations (id) on delete cascade,
  agent_name text not null,
  greeting text,
  personality text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone
);
```

Repeat for the other tables.

---

## 5. Row-Level Security (RLS) & Policies

1. **Enable RLS** on each table:
   ```sql
   alter table organizations enable row level security;
   alter table agents enable row level security;
   ...
   ```
2. **Create Policies** to ensure users can only access data from their own organization. Example for `agents`:

   ```sql
   create policy "Allow read agents" on agents
   for select
   using ( organization_id in (
     select id from organizations 
     where owner_id = auth.uid()
   ));

   create policy "Allow insert agents" on agents
   for insert
   with check ( organization_id in (
     select id from organizations 
     where owner_id = auth.uid()
   ));
   ```

   Adapt these for your specific ownership structure (e.g., if a user can belong to multiple organizations, or if you store user-org relationships in a separate table).

---

## 6. Connecting Supabase to Next.js

1. **Install** the Supabase JS library:
   ```bash
   npm install @supabase/supabase-js
   ```
2. **Create a Supabase Client**: For example, in `lib/supabaseClient.js`:
   ```js
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```
3. **Use the client** in your Next.js pages or API routes to read/write to the database. For more secure operations (like upserts with service_role), you can use server-side code or Edge Functions.

---

## 7. Example: Button Click -> Database Update

Below is a simple demonstration of how you might create a new **Agent** when a user clicks a button.

### Frontend Code (Next.js)

1. **Page or Component** (e.g., `/pages/agent-design/new.js`):

   ```jsx
   import { useState } from 'react';
   import { supabase } from '../../lib/supabaseClient';

   export default function NewAgentPage() {
     const [agentName, setAgentName] = useState('');
     const [greeting, setGreeting] = useState('');
     const [message, setMessage] = useState('');

     const createAgent = async () => {
       // Example: Suppose we already know the organization ID is stored in local storage or from user context
       const organization_id = '00000000-1111-2222-3333-444444444444';

       const { data, error } = await supabase
         .from('agents')
         .insert([
           {
             organization_id,
             agent_name: agentName,
             greeting,
           },
         ]);

       if (error) {
         console.error(error);
         setMessage('Error creating agent: ' + error.message);
       } else {
         setMessage('Agent created! ID: ' + data[0].id);
         // Optionally redirect or update UI
       }
     };

     return (
       <div className="p-4">
         <h1>Create a New Agent</h1>

         <input
           type="text"
           placeholder="Agent Name"
           value={agentName}
           onChange={(e) => setAgentName(e.target.value)}
           className="border p-2 my-2"
         />
         <br />

         <textarea
           placeholder="Greeting"
           value={greeting}
           onChange={(e) => setGreeting(e.target.value)}
           className="border p-2 my-2"
         />
         <br />

         <button onClick={createAgent} className="bg-blue-500 text-white p-2">
           Create Agent
         </button>

         {message && <p className="mt-4">{message}</p>}
       </div>
     );
   }
   ```

2. **Explanation**:
   - The user enters **Agent Name** and **Greeting**.
   - On clicking **Create Agent**, we call `supabase.from('agents').insert()`.
   - If successful, we show a success message and the new agent’s ID.

### Server-Side / API Route (Optional)

Alternatively, you might create a Next.js **API route** (e.g., `/pages/api/agents/create.js`) to handle inserts:

```js
// pages/api/agents/create.js
import { supabase } from '../../../lib/supabaseServerClient'; 
// Note: supabaseServerClient might use the service_role key

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { agentName, greeting, organization_id } = req.body;

  const { data, error } = await supabase
    .from('agents')
    .insert({ 
      organization_id,
      agent_name: agentName,
      greeting 
    })
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ data });
}
```

- Then, from the frontend, you’d do a `fetch('/api/agents/create', { method: 'POST', body: JSON.stringify(...) })`.

---

## 8. Testing & Verification

1. **Open** your Supabase dashboard → **Table Editor** → **agents** table.  
2. **Create** a new agent from your Next.js page by clicking the button.  
3. **Refresh** your table in Supabase to confirm the new agent row is inserted.  
4. **Check** if the row-level security policies are working properly (try to insert or select data from a user that isn’t associated with that organization, and confirm access is denied).

---

## 9. Next Steps

1. **Build out Additional CRUD**  
   - Implement read, update, and delete operations for agents, calls, knowledge base, etc.
2. **Attach RLS Policies**  
   - Ensure users can only see data for their own organizations.
3. **Enhance UI**  
   - Show a list of existing agents, allow editing/deleting them with real-time updates.
4. **Add Authentication**  
   - Use [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs) in Next.js to protect your pages and automatically manage the user’s JWT.
5. **Production Hardening**  
   - Ensure environment variables are in a secure store (e.g., Vercel secrets).  
   - Apply further RLS policies for calls, knowledge base, and workflows.  
   - Add triggers or Edge Functions if more complex server-side logic is needed (e.g., logging calls, processing transcripts).

---

## Conclusion

By following these steps:

1. **Create** the schema in Supabase (tables for organizations, agents, calls, etc.).  
2. **Enable** row-level security (RLS) and write suitable policies.  
3. **Integrate** with your Next.js app through either direct client calls (`supabase.js`) or server-side routes.  
4. **Test** that when a button is clicked on your UI, the database is updated accordingly.

You will have a solid, production-ready foundation for your Phonely.ai clone, enabling you to store and manage data reliably and securely. From here, you can continue to build out the rest of the backend logic (e.g., call flow, telephony integrations, real-time updates) while leveraging Supabase’s powerful tools.
```