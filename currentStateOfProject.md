# Voice Platform Phonely Clone - Current State Documentation

## Project Overview
A Next.js-based platform for creating, managing, and deploying AI-powered voice agents with sophisticated conversation capabilities and personality customization.

## Technical Architecture

### Core Technologies
- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript (Strict Mode)
- **Authentication**: Supabase Auth + NextAuth.js
- **Database**: Supabase (Planned)
- **State Management**: React Context + Hooks
- **Styling**: Tailwind CSS + Radix UI components

### Key Dependencies
```json
{
  "@hookform/resolvers": "^3.9.0",
  "@radix-ui/*": "Various UI components v1.x-2.x",
  "@supabase/auth-helpers-nextjs": "^0.10.0",
  "@supabase/supabase-js": "^2.47.10",
  "class-variance-authority": "^0.7.0",
  "date-fns": "^3.6.0",
  "next": "13.5.1",
  "react-hook-form": "^7.49.3",
  "d3-sankey": "^0.12.3"
}
```

## Application Structure

### 1. Authentication System
- **Implementation**: Complete
- **Files**:
  ```typescript
  // app/api/auth/[...nextauth]/route.ts
  export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        // Supabase email/password authentication
      })
    ],
    callbacks: {
      jwt, session
    },
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60
    }
  }
  ```
- **Features**:
  - Supabase Auth integration
  - Protected routes
  - Session management
  - Auth middleware

### 2. Agent Management System
- **Status**: Partially Implemented
- **Current Implementation**:
  ```typescript
  // lib/data/agents.ts
  export interface Agent {
    id: string
    name: string
    type: "Multi Prompt" | "Single Prompt"
    voice: string
    phone: string | null
    editedAt: string
  }
  ```
- **Components**:
  - AgentsList: Table view with search
  - Agent Settings: Configuration interface
  - Knowledge Base: Document management

### 3. Knowledge Base System
- **Status**: UI Implementation Complete
- **Features**:
  ```typescript
  // app/(app)/agents/knowledge-base/page.tsx
  export default function KnowledgeBasePage() {
    return (
      <div>
        <Card>
          <h2>Data Sources</h2>
          <Button>Upload File</Button>
          <Button>Blank Document</Button>
          <Table>
            {/* Document listing */}
          </Table>
        </Card>
      </div>
    )
  }
  ```
- **Capabilities**:
  - File upload interface
  - Document management
  - Search functionality
  - Active status tracking

### 4. Settings Module
- **Status**: UI Implementation Complete
- **Components**:
  ```typescript
  // components/settings/settings-page.tsx
  export function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general")
    return (
      <div>
        <AgentInfo />
        <OrganizationInfo />
        <SettingsTabs />
      </div>
    )
  }
  ```
- **Features**:
  - Agent information management
  - Organization settings
  - Tab-based navigation
  - Form validation

### 5. Voice System
- **Status**: Planned
- **Features Planned**:
  - Voice selection
  - Preview capability
  - Speed adjustment
  - Accent configuration

## Complete Project Structure (Including Sub-Components and Fields)

```
project/
├── app/
│   ├── (app)/                   # Protected routes (require authentication)
│   │   ├── agents/
│   │   │   ├── design/         # Agent Design Page
│   │   │   │   ├── page.tsx    # Contains:
│   │   │   │   │               # - AI Greeting
│   │   │   │   │               # - Personality and Guidelines Tab
│   │   │   │   │               # - FAQ Tab
│   │   │   │   └── [agentId]/
│   │   │   │       └── page.tsx
│   │   │   ├── functions/
│   │   │   │   └── page.tsx
│   │   │   ├── knowledge-base/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   ├── workflows/
│   │   │   │   └── page.tsx
│   │   │   ├── call-history/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── calls/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── simulation/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── agent-design/
│   │   ├── sections/           # Sections for Personality & Guidelines
│   │   │   ├── agent-guidelines.tsx     # Contains:
│   │   │   │                            # - Guidelines Text Area
│   │   │   │                            # - Connected to agents.guidelines
│   │   │   ├── personality-settings.tsx # Contains:
│   │   │   │                            # - Personality Type Select
│   │   │   │                            # - Options: Casual, Professional, Friendly, Formal
│   │   │   └── humanize-settings.tsx    # Contains:
│   │   │                                # - Humanize Toggle Switch
│   │   │                                # - Connected to voice_config.speechNormalization
│   │   ├── tabs/
│   │   │   └── tab-button.tsx
│   │   ├── ai-greeting.tsx              # Contains:
│   │   │                                # - Greeting Message Text Area
│   │   │                                # - Connected to agents.greeting
│   │   ├── frequently-asked-questions.tsx
│   │   └── personality-guidelines.tsx    # Parent component that contains:
│   │                                     # - AgentGuidelines
│   │                                     # - PersonalitySettings
│   │                                     # - HumanizeSettings
│   ├── settings/
│   │   └── tabs/
│   │       ├── advanced-settings.tsx
│   │       ├── general-settings.tsx      # Contains:
│   │       │                             # - Agent Name
│   │       │                             # - Organization Settings
│   │       ├── notification-settings.tsx
│   │       ├── settings-tab-content.tsx
│   │       ├── transcriber-settings.tsx
│   │       └── voice-engine/
│   │           ├── language-selection.tsx # Contains:
│   │           │                         # - Language Select
│   │           │                         # - Connected to voice_config.language
│   │           ├── voice-advanced-settings.tsx  # Contains:
│   │           │                               # - Stability Slider
│   │           │                               # - Similarity Boost Slider
│   │           │                               # - Style Select
│   │           │                               # - Speaker Boost Toggle
│   │           │                               # - Optimize Latency Toggle
│   │           │                               # - SSML Parsing Toggle
│   │           ├── voice-selection.tsx         # Contains:
│   │           │                               # - Voice Provider Select
│   │           │                               # - Voice ID Select
│   │           ├── switch-setting.tsx          # Reusable switch component
│   │           └── voice-engine-settings.tsx   # Parent component for voice settings
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── sidebar.tsx
│   ├── theme-provider.tsx
│   ├── top-nav-tabs.tsx
│   └── top-nav.tsx
├── hooks/
│   ├── use-agent-field.ts
│   ├── use-agent.ts
│   ├── use-supabase.ts
│   ├── use-theme.ts
│   └── use-toast.ts
├── lib/
│   ├── data/
│   │   └── agents.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── types.ts
│   └── utils/
│       ├── auth.ts
│       ├── date.ts
│       └── validation.ts
├── providers/
│   └── supabase-provider.tsx
└── types/
    ├── agent.ts
    └── supabase.ts
```

### Component Field Mappings

1. **Agent Design**
   - `ai-greeting.tsx` -> `agents.greeting`
   - `sections/agent-guidelines.tsx` -> `agents.guidelines`
   - `sections/personality-settings.tsx` -> `agents.personality`
   - `sections/humanize-settings.tsx` -> `agents.voice_config.speechNormalization`

2. **Voice Engine**
   - `voice-selection.tsx` -> `agents.voice_config.provider`, `agents.voice_config.voiceId`
   - `language-selection.tsx` -> `agents.voice_config.language`
   - `voice-advanced-settings.tsx` contains:
     - Stability -> `agents.voice_config.stability`
     - Similarity Boost -> `agents.voice_config.similarityBoost`
     - Style -> `agents.voice_config.style`
     - Speaker Boost -> `agents.voice_config.useSpeakerBoost`
     - Optimize Latency -> `agents.voice_config.optimizeStreamingLatency`
     - SSML Parsing -> `agents.voice_config.enableSsmlParsing`

3. **General Settings**
   - Agent Name -> `agents.name`
   - Organization -> `agents.organization_id`

4. **Transcriber Settings**
   - Provider -> `agents.transcriber_config.provider`
   - Language -> `agents.transcriber_config.language`
   - Model -> `agents.transcriber_config.model`

## Key Notes About Structure:

1. **App Router Pages**
   - Protected routes in `app/(app)/*`
   - Auth routes in `app/(auth)/*` and `app/auth/*`
   - API routes in `app/api/*`

2. **Components Organization**
   - Agent-related components in `components/agent-design/` and `components/agents/`
   - Common UI components in `components/ui/`
   - Feature-specific components in dedicated directories
   - Each major feature has its own directory with sub-components

3. **State Management & Utilities**
   - Custom hooks in `hooks/` for state management and common functionality
   - Utility functions in `lib/utils/`
   - Type definitions in `types/`

4. **Potential Duplicates**
   - Auth-related pages in both `app/(auth)` and `app/auth`
   - Some components might have duplicates due to the auth migration
   - These should be consolidated in future updates

## Database Schema (Planned)

### Users
```sql
create table users (
  id uuid references auth.users primary key,
  email text unique,
  name text,
  settings jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Agents
```sql
create table agents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  name text not null,
  type text check (type in ('Single Prompt', 'Multi Prompt')),
  voice text not null,
  phone text,
  greeting text,
  guidelines text,
  settings jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Knowledge Base
```sql
create table knowledge_base (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid references agents(id),
  name text not null,
  content text not null,
  type text not null,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  updated_by uuid references users(id)
);
```

## UI Components
- **Base**: Radix UI Primitives
- **Custom Components**:
  - AgentCard
  - KnowledgeBaseUploader
  - SettingsTabs
  - AgentInfo
- **Theme System**:
  - Dark/Light modes
  - CSS variables
  - Tailwind configuration

## Security Implementation

### 1. Authentication
```typescript
// middleware.ts
export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      return isPublicPath(pathname) || !!token;
    },
  },
});
```

### 2. Data Protection
- Supabase RLS policies
- Input validation
- CORS configuration
- Rate limiting (planned)

## Current Limitations

### 1. Features
- No real document upload
- No voice testing
- No data persistence
- Limited error handling

### 2. Technical
- No caching strategy
- No real-time updates
- No proper loading states
- Limited type safety

### 3. Testing
- No unit tests
- No E2E tests
- No integration tests
- No test utilities

## Next Steps

### 1. Immediate Priorities
1. Implement Supabase integration
2. Add document upload functionality
3. Connect settings to database
4. Add proper error handling

### 2. Short-term Goals
1. Add testing framework
2. Implement voice testing
3. Add real-time updates
4. Improve type safety

### 3. Long-term Vision
1. Analytics dashboard
2. Batch operations
3. Advanced voice features
4. Multi-tenant support

## Development Guidelines

### 1. Code Organization
- Feature-based structure
- Shared components in ui/
- Type definitions in types/
- Utils in lib/

### 2. State Management
- Context for global state
- Local state for components
- Form state with react-hook-form
- API state (planned)

### 3. Error Handling
- Custom error boundaries
- API error handling
- Form validation
- User feedback

### 4. Performance
- Code splitting
- Image optimization
- Lazy loading
- Cache management

## Deployment Strategy

### 1. Environments
- Development: Local
- Staging: Vercel (planned)
- Production: Vercel (planned)

### 2. CI/CD
- GitHub Actions (planned)
- Automated testing
- Preview deployments
- Production safeguards

This documentation will be updated as new features are implemented or existing ones are modified.
