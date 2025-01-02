# Agent Connection and Settings Implementation Plan

## 1. Database Schema (Supabase)

### Agents Table
```sql
create table agents (
  id text primary key,
  organization_id text not null,
  name text not null,
  created_at timestamptz default now(),
  updated_at timestamptz,
  greeting text,
  personality text,
  first_message text,
  first_message_mode text,
  hipaa_enabled boolean default false,
  voice_config jsonb default '{}',
  model_config jsonb default '{}',
  transcriber_config jsonb default '{}',
  call_config jsonb default '{}',
  voicemail_config jsonb default '{}',
  analysis_config jsonb default '{}',
  artifact_config jsonb default '{}',
  message_config jsonb default '{}',
  speaking_config jsonb default '{}',
  monitor_config jsonb default '{}',
  server_config jsonb default '{}',
  metadata jsonb default '{}',
  credential_ids text[]
);
```

### Voice Configuration Schema
```json
{
  "provider": "11labs",
  "voiceId": "joseph",
  "language": "",
  "stability": 0,
  "similarityBoost": 0,
  "style": 0,
  "useSpeakerBoost": false,
  "optimizeStreamingLatency": 0,
  "chunkPlan": {},
  "enableSsmlParsing": false,
  "fallbackPlan": {
    "voices": [
      {
        "provider": "rime-ai",
        "voiceId": "allison"
      }
    ]
  }
}
```

### Model Configuration Schema
```json
{
  "provider": "openai",
  "emotionRecognitionEnabled": false,
  "fallbackModels": ["gpt-4o-mini", "gpt-4"],
  "maxTokens": 0,
  "temperature": 0,
  "semanticCachingEnabled": false,
  "numFastTurns": 0,
  "messages": [],
  "tools": [],
  "toolIds": [],
  "knowledgeBaseId": "",
  "knowledgeBase": {
    "server": {
      "url": "",
      "timeoutSeconds": 0,
      "secret": "",
      "headers": {}
    }
  }
}
```

### Knowledge Base Table
```sql
create table knowledge_base (
  id text primary key,
  agent_id text not null references agents(id),
  question text not null,
  answer text not null,
  created_at timestamptz default now()
);
```

### Organizations Table
```sql
create table organizations (
  id text primary key,
  name text not null,
  owner_id uuid not null,
  created_at timestamptz default now()
);
```

### Workflows Table
```sql
create table workflows (
  id text primary key,
  agent_id text not null references agents(id),
  title text not null,
  definition_json jsonb not null,
  created_at timestamptz default now()
);
```

## 2. Implementation Steps

### Phase 1: Supabase Integration (Current Progress)
✅ **Completed**:
- Supabase client setup
- Environment variables configuration
- Basic authentication flow

🔄 **In Progress**:
- Row Level Security implementation
- Organization management
- Agent configuration setup

### Phase 2: Agent Management

1. **Agent Service Implementation**
   ```typescript
   // lib/services/agentService.ts
   export const agentService = {
     create: async (data: CreateAgentDTO) => {
       const { data: agent, error } = await supabase
         .from('agents')
         .insert({
           ...data,
           voice_config: defaultVoiceConfig,
           model_config: defaultModelConfig,
           // Other default configurations
         })
         .single()
       // Handle response
     },
     
     update: async (id: string, data: UpdateAgentDTO) => {
       const { data: agent, error } = await supabase
         .from('agents')
         .update(data)
         .match({ id })
       // Handle response
     }
   }
   ```

2. **Configuration Management**
   ```typescript
   // lib/services/configService.ts
   export const configService = {
     updateVoiceConfig: async (agentId: string, config: VoiceConfig) => {
       return await supabase
         .from('agents')
         .update({ voice_config: config })
         .match({ id: agentId })
     },
     
     updateModelConfig: async (agentId: string, config: ModelConfig) => {
       return await supabase
         .from('agents')
         .update({ model_config: config })
         .match({ id: agentId })
     }
   }
   ```

### Phase 3: Knowledge Base Integration

1. **Knowledge Base Service**
   ```typescript
   // lib/services/knowledgeBaseService.ts
   export const knowledgeBaseService = {
     addQA: async (agentId: string, question: string, answer: string) => {
       return await supabase
         .from('knowledge_base')
         .insert({
           agent_id: agentId,
           question,
           answer
         })
     },
     
     getQA: async (agentId: string) => {
       const { data, error } = await supabase
         .from('knowledge_base')
         .select('*')
         .match({ agent_id: agentId })
       return { data, error }
     }
   }
   ```

2. **UI Components**
   ```typescript
   // components/knowledge-base/qa-form.tsx
   export function QAForm({ agentId }: { agentId: string }) {
     const [question, setQuestion] = useState('')
     const [answer, setAnswer] = useState('')
     
     const handleSubmit = async () => {
       await knowledgeBaseService.addQA(agentId, question, answer)
     }
     
     return (
       <form onSubmit={handleSubmit}>
         {/* Form implementation */}
       </form>
     )
   }
   ```

### Phase 4: Workflow Management

1. **Workflow Service**
   ```typescript
   // lib/services/workflowService.ts
   export const workflowService = {
     create: async (agentId: string, title: string, definition: any) => {
       return await supabase
         .from('workflows')
         .insert({
           agent_id: agentId,
           title,
           definition_json: definition
         })
     },
     
     getWorkflows: async (agentId: string) => {
       return await supabase
         .from('workflows')
         .select('*')
         .match({ agent_id: agentId })
     }
   }
   ```

## 3. Security Implementation

### Row Level Security
```sql
-- Agents table RLS
create policy "Users can access organization agents"
on agents for all
using (
  organization_id in (
    select id from organizations
    where owner_id = auth.uid()
  )
);

-- Knowledge base RLS
create policy "Users can access organization knowledge base"
on knowledge_base for all
using (
  agent_id in (
    select id from agents
    where organization_id in (
      select id from organizations
      where owner_id = auth.uid()
    )
  )
);

-- Workflows RLS
create policy "Users can access organization workflows"
on workflows for all
using (
  agent_id in (
    select id from agents
    where organization_id in (
      select id from organizations
      where owner_id = auth.uid()
    )
  )
);
```

## 4. Testing Strategy

### Unit Tests
```typescript
// __tests__/services/agentService.test.ts
describe('AgentService', () => {
  test('creates agent with default configurations', async () => {
    // Test implementation
  })
  
  test('updates voice configuration', async () => {
    // Test implementation
  })
})
```

### Integration Tests
```typescript
// __tests__/integration/agentFlow.test.ts
describe('Agent Management Flow', () => {
  test('complete agent lifecycle', async () => {
    // Create organization
    // Create agent
    // Update configurations
    // Add knowledge base items
    // Create workflow
    // Delete workflow
    // Delete agent
  })
})
```

## 5. Implementation Priorities

### Immediate Tasks
1. ✅ Complete Supabase setup
2. 🔄 Implement organization management
3. 🔄 Create agent configurations
4. ⏳ Add knowledge base
5. ⏳ Implement workflows

### Short-term Goals
1. Voice configuration management
2. Model configuration testing
3. Knowledge base integration
4. Workflow designer

### Long-term Goals
1. Advanced analytics
2. Batch operations
3. Configuration templates
4. Multi-organization support

## 6. Monitoring and Maintenance

### Performance Monitoring
- Track configuration update times
- Monitor knowledge base query performance
- Log workflow execution metrics

### Error Tracking
- Configuration validation errors
- Knowledge base sync issues
- Workflow execution failures

This implementation plan will be updated as we progress with the development and discover new requirements or challenges.
