# Agent Design Fields and Buttons
IC MEANS THE FIELD IS PRESENT IN OUR CODE BASE
## Organization Settings
[IC] [] - Organization Name -> organizations.name
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Displays organization name
  - project-bolt-phonely-clone\project\components\agent-selector\new-agent-dialog.tsx - Handles organization selection
[IC] [] - Organization ID -> organizations.id
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Displays organization ID
  - project-bolt-phonely-clone\project\components\agent-selector\agent-selector.tsx - Uses organization ID for agent queries

## Basic Information
[IC] [] - Agent Name -> agents.name
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays and manages the agent name
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Shows agent name in organization context
  - project-bolt-phonely-clone\project\components\agent-selector\agent-selector.tsx - Displays agent name in selection dropdown
[IC] [] - Organization -> agents.organization_id
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Displays and manages organization association
  - project-bolt-phonely-clone\project\components\agent-selector\new-agent-dialog.tsx - Handles organization selection
  [IC] [] - Organization Name -> organizations.name
    - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Displays organization name
    - project-bolt-phonely-clone\project\components\agent-selector\new-agent-dialog.tsx - Shows organization name in dropdown
  [IC] [] - Organization ID -> organizations.id
    - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Displays organization ID
    - project-bolt-phonely-clone\project\components\agent-selector\agent-selector.tsx - Uses organization ID for agent queries
[IC] [] - Agent ID -> agents.id
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays and manages the agent ID
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Uses agentId for voice configuration
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Uses agentId for organization info
[IC] [] - Created At -> agents.created_at
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays creation timestamp
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Shows when agent was added to organization
[IC] [] - Updated At -> agents.updated_at
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays last updated timestamp
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Shows when agent was last modified
[IC] [] - Status -> agents.status
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays and manages agent status
  - project-bolt-phonely-clone\project\components\settings\organization-info.tsx - Shows agent status within organization
[IC] [] - Greeting Message -> agents.greeting
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures greeting message for voice interactions
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays and manages greeting message
[IC] [] - Personality Description -> agents.personality
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Manages and displays personality description
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Uses personality for voice tone configuration
[IC] [] - Agent Guidelines -> agents.guidelines
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Manages and displays agent guidelines
  - project-bolt-phonely-clone\project\components\settings\tabs\knowledge-base.tsx - Uses guidelines for knowledge interactions
[IC] [] - Personality Type -> agents.personality
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Manages and displays personality type
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Uses personality type for voice configuration
[IC] [] - Humanize Conversation -> agents.voice_config.speechNormalization
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures humanization of voice interactions
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays and manages humanization setting

## Voice Configuration
[IC] [] - Provider -> agents.voice_config.provider
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages voice provider selection
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current voice provider setting
[IC] [] - Voice ID -> agents.voice_config.voiceId
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages voice selection
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current voice ID setting
[IC] [] - Language -> agents.voice_config.language
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages language selection
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current language setting
[IC] [] - Voice Settings
  [IC] [] - Stability -> agents.voice_config.stability
    - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages voice stability
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current stability setting
  [IC] [] - Similarity Boost -> agents.voice_config.similarityBoost
    - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages voice similarity
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current similarity boost setting
  [IC] [] - Style -> agents.voice_config.style
    - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages voice style
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current style setting
  [IC] [] - Speaker Boost -> agents.voice_config.useSpeakerBoost
    - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages speaker boost
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current speaker boost setting
  [IC] [] - Optimize Streaming Latency -> agents.voice_config.optimizeStreamingLatency
    - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages streaming latency optimization
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current streaming latency setting
  [IC] [] - Enable SSML Parsing -> agents.voice_config.enableSsmlParsing
    - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages SSML parsing
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current SSML parsing setting
[IC] [] - Background Sound -> agents.call_config.backgroundSound
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages background sound
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current background sound setting
[IC] [] - Enable Speech Normalization -> agents.voice_config.speechNormalization
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages speech normalization
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current speech normalization setting
[IC] [] - Boosted Keywords -> agents.voice_config.boostedKeywords
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages boosted keywords
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current boosted keywords setting
[IC] [] - Enable Backchanneling -> agents.voice_config.backchanneling
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages backchanneling
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current backchanneling setting
[IC] [] - Interruption Sensitivity -> agents.voice_config.interruptionSensitivity
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages interruption sensitivity
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current interruption sensitivity setting
[IC] [] - Responsiveness -> agents.voice_config.responsiveness
  - project-bolt-phonely-clone\project\components\settings\tabs\voice-engine-settings.tsx - Configures and manages responsiveness
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current responsiveness setting

## Model Configuration
[IC] [] - Provider -> agents.model_config.provider
  - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures and manages model provider selection
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current model provider setting
  [IC] [] - Options: openai
[IC] [] - Emotion Recognition -> agents.model_config.emotionRecognition
  - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures emotion recognition settings
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current emotion recognition setting
[IC] [] - Fallback Models -> agents.model_config.fallbackModels
  - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures fallback model selection
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current fallback models
  [IC] [] - Options: gpt-4o-mini, gpt-4
[IC] [] - Model Settings
  [IC] [] - Max Tokens -> agents.model_config.maxTokens
    - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures max tokens setting
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current max tokens value
  [IC] [] - Temperature -> agents.model_config.temperature
    - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures temperature setting
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current temperature value
  [IC] [] - Semantic Caching -> agents.model_config.semanticCaching
    - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures semantic caching
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current semantic caching setting
  [IC] [] - Fast Turns Count -> agents.model_config.fastTurnsCount
    - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures fast turns count
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current fast turns count
[IC] [] - System Messages -> agents.model_config.systemMessages
  - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Manages system messages configuration
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current system messages
[IC] [] - Tools Configuration
  [IC] [] - Tool IDs -> agents.model_config.toolIds
    - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures and manages tool IDs
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current tool IDs
  [IC] [] - Custom Tools -> agents.model_config.customTools
    - project-bolt-phonely-clone\project\components\settings\tabs\model-settings.tsx - Configures and manages custom tools
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current custom tools
[IC] [] - Knowledge Base
  [IC] [] - Knowledge Base ID -> agents.model_config.knowledgeBaseId
    - project-bolt-phonely-clone\project\components\settings\tabs\knowledge-base-settings.tsx - Configures knowledge base ID
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current knowledge base ID
  [IC] [] - Server Settings
    [IC] [] - URL -> agents.model_config.knowledgeBaseUrl
      - project-bolt-phonely-clone\project\components\settings\tabs\knowledge-base-settings.tsx - Configures knowledge base URL
      - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current knowledge base URL
    [IC] [] - Timeout -> agents.model_config.knowledgeBaseTimeout
      - project-bolt-phonely-clone\project\components\settings\tabs\knowledge-base-settings.tsx - Configures knowledge base timeout
      - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current timeout setting
    [IC] [] - Secret -> agents.model_config.knowledgeBaseSecret
      - project-bolt-phonely-clone\project\components\settings\tabs\knowledge-base-settings.tsx - Configures knowledge base secret
      - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays secret status (hidden)
    [IC] [] - Headers -> agents.model_config.knowledgeBaseHeaders
      - project-bolt-phonely-clone\project\components\settings\tabs\knowledge-base-settings.tsx - Configures knowledge base headers
      - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays headers status

## Knowledge Base Configuration
[IC] [] - Data Sources -> knowledge_base table
  - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Manages document upload and display
  [IC] [] - Upload File -> knowledge_base.id
    - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Handles file upload functionality
  [IC] [] - Blank Document -> knowledge_base.id
    - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Handles blank document creation
[IC] [] - Document Search -> knowledge_base table query
  - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Implements document search functionality
[IC] [] - Document List
  [IC] [] - Name -> knowledge_base.question
    - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Displays document names in table
  [IC] [] - Last Updated By -> knowledge_base.agent_id
    - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Shows last updated by in table
  [IC] [] - Last Updated At -> knowledge_base.created_at
    - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Shows last updated timestamp in table
  [IC] [] - Active Status -> knowledge_base table query
    - project-bolt-phonely-clone/project/app/(app)/agents/knowledge-base/page.tsx - Manages active status in table

## Transcriber Configuration
[IC] [] - Provider -> agents.transcriber_config.provider
  - project-bolt-phonely-clone\project\components\settings\tabs\transcriber-settings.tsx - Configures and manages transcriber provider
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current transcriber provider
[IC] [] - Code Switching -> agents.transcriber_config.codeSwitchingEnabled
  - project-bolt-phonely-clone\project\components\settings\tabs\transcriber-settings.tsx - Configures code switching setting
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current code switching status
[IC] [] - Endpointing -> agents.transcriber_config.endpointing
  - project-bolt-phonely-clone\project\components\settings\tabs\transcriber-settings.tsx - Configures endpointing settings
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current endpointing configuration
[IC] [] - Keywords -> agents.transcriber_config.keywords
  - project-bolt-phonely-clone\project\components\settings\tabs\transcriber-settings.tsx - Manages keyword configuration
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current keyword settings
[IC] [] - Language -> agents.transcriber_config.language
  - project-bolt-phonely-clone\project\components\settings\tabs\transcriber-settings.tsx - Configures transcriber language
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current transcriber language
[IC] [] - Smart Format -> agents.transcriber_config.smartFormat
  - project-bolt-phonely-clone\project\components\settings\tabs\transcriber-settings.tsx - Configures smart formatting
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current smart format setting

## Call Settings
[IC] [] - Timeouts
  [IC] [] - Silence Timeout -> agents.call_config.silenceTimeoutSeconds
    - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Configures silence timeout duration
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current silence timeout setting
  [IC] [] - Max Duration -> agents.call_config.maxDurationSeconds
    - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Configures maximum call duration
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current max duration setting
[IC] [] - Background Settings
  [IC] [] - Background Denoising -> agents.call_config.backgroundDenoising
    - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Configures background noise reduction
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current denoising setting
[IC] [] - Model Output in Messages -> agents.call_config.includeModelOutput
  - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Configures model output inclusion
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current model output setting
[IC] [] - Transport Configurations -> agents.call_config.transportConfig
  - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Manages transport layer configurations
  - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current transport configuration
[IC] [] - End Call
  [IC] [] - End Call Message -> agents.call_config.endCallMessage
    - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Configures end call message
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current end call message
  [IC] [] - End Call Phrases -> agents.call_config.endCallPhrases
    - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Manages end call phrases
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current end call phrases
[IC] [] - Messages
  [IC] [] - Client Messages -> agents.call_config.clientMessages
    - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Configures client message handling
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current client message settings
  [IC] [] - Server Messages -> agents.call_config.serverMessages
    - project-bolt-phonely-clone\project\components\settings\tabs\call-settings.tsx - Configures server message handling
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current server message settings

## Voicemail Settings
[IC] [] - Detection Settings
  [IC] [] - Provider -> agents.voicemail_config.provider
    - project-bolt-phonely-clone\project\components\settings\tabs\voicemail-settings.tsx - Configures voicemail detection provider
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current voicemail provider
  [IC] [] - Enable Detection -> agents.voicemail_config.enabled
    - project-bolt-phonely-clone\project\components\settings\tabs\voicemail-settings.tsx - Configures voicemail detection
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current voicemail detection status
[ ] - Detection Types (multi-select)
[ ] - Machine Detection Settings
  [ ] - Timeout (ms)
  [ ] - Speech Threshold (ms)
  [ ] - Speech End Threshold (ms)
  [ ] - Silence Timeout (ms)
[ ] - Voicemail Message (text input)

## Webhook Configurations
[ ] - Enable Webhooks (toggle)
[ ] - Webhook URLs
  [ ] - Call Start URL (text input)
  [ ] - Call End URL (text input)
  [ ] - Error URL (text input)
[ ] - Webhook Headers (key-value editor)
[ ] - Webhook Timeout (number input, seconds)
[ ] - Retry Configuration
  [ ] - Max Retries (number input)
  [ ] - Retry Interval (number input, seconds)

## Email Notifications
[ ] - Enable Email Notifications (toggle)
[ ] - Notification Recipients
  [ ] - Primary Email (text input)
  [ ] - CC Emails (tag input)
  [ ] - BCC Emails (tag input)
[ ] - Email Templates
  [ ] - Custom Subject Template (text input)
  [ ] - Custom Body Template (textarea)

## Analysis Configuration
[ ] - Summary Settings
  [ ] - Enable Summary (toggle)
  [ ] - Timeout (seconds)
  [ ] - Summary Messages (list editor)
[ ] - Structured Data
  [ ] - Enable Structured Data (toggle)
  [ ] - Timeout (seconds)
  [ ] - Schema Editor
    [ ] - Description (text input)
    [ ] - Required Fields (tag input)
    [ ] - Properties (JSON editor)
[ ] - Success Evaluation
  [ ] - Enable Evaluation (toggle)
  [ ] - Timeout (seconds)
  [ ] - Rubric (JSON editor)
  [ ] - Evaluation Messages (list editor)

## Recording Settings
[ ] - Enable Recording (toggle)
[ ] - Enable Video Recording (toggle)
[ ] - Transcript Settings
  [ ] - Enable Transcript (toggle)
  [ ] - Assistant Name (text input)
  [ ] - User Name (text input)
[ ] - Recording Path (text input)

## Message Handling
[ ] - Idle Messages
  [ ] - Message List (list editor)
  [ ] - Max Spoken Count (number input)
  [ ] - Idle Timeout (seconds)

## Speaking Behavior
[ ] - Start Speaking
  [ ] - Wait Time (seconds)
  [ ] - Smart Endpointing (toggle)
  [ ] - Custom Endpointing Rules (list editor)
  [ ] - Transcription Endpointing
    [ ] - On Punctuation (seconds)
    [ ] - No Punctuation (seconds)
    [ ] - On Number (seconds)
[ ] - Stop Speaking
  [ ] - Word Limit (number)
  [ ] - Voice Duration (seconds)
  [ ] - Backoff Time (seconds)

## Debug Settings
[ ] - Debug Mode (toggle)
[ ] - Log Level (dropdown)
  [ ] - Options: error, warn, info, debug, trace
[ ] - Enable Request Logging (toggle)
[ ] - Enable Response Logging (toggle)
[ ] - Log Retention Period (number input, days)
[ ] - Debug Webhook URL (text input)

## API Configuration
[ ] - API Version (dropdown)
[ ] - Rate Limiting
  [ ] - Requests per Second (number input)
  [ ] - Burst Limit (number input)
[ ] - Timeout Settings
  [ ] - Connection Timeout (number input, seconds)
  [ ] - Read Timeout (number input, seconds)
  [ ] - Write Timeout (number input, seconds)
[ ] - API Keys
  [ ] - Primary Key (password input)
  [ ] - Secondary Key (password input)
[ ] - CORS Settings
  [ ] - Allowed Origins (tag input)
  [ ] - Allowed Methods (multi-select)
  [ ] - Allowed Headers (tag input)

## Monitoring
[ ] - Enable Listening (toggle)
[ ] - Enable Control (toggle)

## Server Configuration
[ ] - Server URL (text input)
[ ] - Timeout (seconds)
[ ] - Secret (password input)
[ ] - Headers (key-value editor)

## Additional Settings
[ ] - Metadata (JSON editor)
[ ] - Credential IDs (tag input)

## Functions Configuration
[IC] [] - Custom Functions List -> agents.model_config.customFunctions
  [IC] [] - Function Name -> customFunctions[].name
    - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures and manages function names
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current function names
  [IC] [] - Description -> customFunctions[].description
    - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures and manages function descriptions
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current function descriptions
  [IC] [] - URL -> customFunctions[].url
    - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures and manages function URLs
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current function URLs
  [IC] [] - API Timeout -> customFunctions[].apiTimeout
    - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures and manages API timeouts
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current API timeout settings
  [IC] [] - Parameters -> customFunctions[].parameters
    - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures and manages function parameters
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current function parameters
  [IC] [] - Speaking Options
    [IC] [] - Speak During Execution -> customFunctions[].speakDuring
      - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures speak during execution
      - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current speak during setting
    [IC] [] - Speak After Execution -> customFunctions[].speakAfter
      - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures speak after execution
      - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current speak after setting
  [IC] [] - Enabled Status -> customFunctions[].enabled
    - project-bolt-phonely-clone\project\components\settings\tabs\function-settings.tsx - Configures and manages function enabled status
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current function enabled status

## Notification Settings
[IC] [] - Notification Events
  [IC] [] - Call Start -> agents.notification_config.onCallStart
    - project-bolt-phonely-clone\project\components\settings\tabs\notification-settings.tsx - Configures call start notifications
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current call start notification setting
  [IC] [] - Call End -> agents.notification_config.onCallEnd
    - project-bolt-phonely-clone\project\components\settings\tabs\notification-settings.tsx - Configures call end notifications
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current call end notification setting
  [IC] [] - Error Occurred -> agents.notification_config.onError
    - project-bolt-phonely-clone\project\components\settings\tabs\notification-settings.tsx - Configures error notifications
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current error notification setting
  [IC] [] - Voicemail Detected -> agents.notification_config.onVoicemailDetected
    - project-bolt-phonely-clone\project\components\settings\tabs\notification-settings.tsx - Configures voicemail detection notifications
    - project-bolt-phonely-clone\project\components\settings\agent-info.tsx - Displays current voicemail detection setting

## Field Types and Validation
- String fields (name, greeting, etc): max 1000-5000 chars, nullable
- Boolean fields (toggles): default false
- Number fields (sliders): min 0, max 1
- Array fields (keywords, phrases): string arrays
- Object fields (configs): partial validation
- Enum fields (status): predefined values
- UUID fields (ids): valid UUID format
- Timestamp fields: ISO format
- JSON fields (headers, tools): valid JSON

## Database Tables
- agents: Main configuration
- organizations: Organization data
- knowledge_base: Knowledge base entries

## Personality and Guidelines Tab
[ ] - Personality Dropdown (select)
  - Options:
    [ ] - 😊 Casual
    [ ] - 👔 Professional
    [ ] - 🤗 Friendly
    [ ] - 📝 Formal

[ ] - Humanize Conversation (switch/toggle)
  - Description: "Add vocal ticks such as hmm, umm etc. to your conversation"

## FAQ Tab
[ ] - Frequently Asked Questions Section (content TBD)

## Navigation
[ ] - Tab Buttons
  - Personality and Guidelines
  - Frequently Asked Questions

## Action Buttons
[ ] - Save Changes
[ ] - Test Agent
[ ] - Reset to Default
