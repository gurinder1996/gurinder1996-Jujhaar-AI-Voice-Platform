# Agent Design Fields and Buttons

## Organization Settings
[IC] [ ] - Organization Name -> organizations.name (Not Connected)
[IC] [ ] - Organization ID -> organizations.id (Not Connected)

## Basic Information
[IC] [ ] - Agent Name -> agents.name (UI exists but not connected to Supabase)
[IC] [ ] - Organization -> agents.organization_id (UI exists but not connected to Supabase)
  [IC] [ ] - Organization Name -> organizations.name (Not Connected)
  [IC] [ ] - Organization ID -> organizations.id (Not Connected)
[IC] [✅] - Agent ID -> agents.id
[IC] [✅] - Created At -> agents.created_at
[IC] [✅] - Updated At -> agents.updated_at
[IC] [✅] - Status -> agents.status
[IC] [✅] - Greeting Message -> agents.greeting
[IC] [✅] - Personality Description -> agents.personality
[IC] [✅] - Agent Guidelines -> agents.guidelines
[IC] [✅] - Personality Type -> agents.personality
[IC] [✅] - Humanize Conversation -> agents.voice_config.speechNormalization

## Voice Configuration
[IC] [✅] - Provider -> agents.voice_config.provider
[IC] [✅] - Voice ID -> agents.voice_config.voiceId
[IC] [✅] - Language -> agents.voice_config.language
[IC] [✅] - Voice Settings
  [IC] [✅] - Stability -> agents.voice_config.stability
  [IC] [✅] - Similarity Boost -> agents.voice_config.similarityBoost
  [IC] [✅] - Style -> agents.voice_config.style
  [IC] [✅] - Speaker Boost -> agents.voice_config.useSpeakerBoost
  [IC] [✅] - Optimize Streaming Latency -> agents.voice_config.optimizeStreamingLatency
  [IC] [✅] - Enable SSML Parsing -> agents.voice_config.enableSsmlParsing
[IC] [✅] - Background Sound -> agents.call_config.backgroundSound
[IC] [✅] - Enable Speech Normalization -> agents.voice_config.speechNormalization
[IC] [✅] - Boosted Keywords -> agents.voice_config.boostedKeywords
[IC] [✅] - Enable Backchanneling -> agents.voice_config.backchanneling
[IC] [✅] - Interruption Sensitivity -> agents.voice_config.interruptionSensitivity
[IC] [✅] - Responsiveness -> agents.voice_config.responsiveness

## Model Configuration
[IC] [✅] - Provider -> agents.model_config.provider
  [IC] [✅] - Options: openai
[IC] [✅] - Emotion Recognition -> agents.model_config.emotionRecognition
[IC] [✅] - Fallback Models -> agents.model_config.fallbackModels
  [IC] [✅] - Options: gpt-4o-mini, gpt-4
[IC] [✅] - Model Settings
  [IC] [✅] - Max Tokens -> agents.model_config.maxTokens
  [IC] [✅] - Temperature -> agents.model_config.temperature
  [IC] [✅] - Semantic Caching -> agents.model_config.semanticCaching
  [IC] [✅] - Fast Turns Count -> agents.model_config.fastTurnsCount
[IC] [✅] - System Messages -> agents.model_config.systemMessages
[IC] [ ] - Tools Configuration
  [IC] [ ] - Tool IDs -> agents.model_config.toolIds
  [IC] [ ] - Custom Tools -> agents.model_config.customTools
[IC] [ ] - Knowledge Base
  [IC] [ ] - Knowledge Base ID -> agents.model_config.knowledgeBaseId
  [IC] [ ] - Server Settings
    [IC] [ ] - URL -> agents.model_config.knowledgeBaseUrl
    [IC] [ ] - Timeout -> agents.model_config.knowledgeBaseTimeout
    [IC] [ ] - Secret -> agents.model_config.knowledgeBaseSecret
    [IC] [ ] - Headers -> agents.model_config.knowledgeBaseHeaders

## Knowledge Base Configuration
[IC] [ ] - Data Sources -> knowledge_base table
  [IC] [ ] - Upload File -> knowledge_base.id
  [IC] [ ] - Blank Document -> knowledge_base.id
[IC] [ ] - Document Search -> knowledge_base table query
[IC] [ ] - Document List
  [IC] [ ] - Name -> knowledge_base.question
  [IC] [ ] - Last Updated By -> knowledge_base.agent_id
  [IC] [ ] - Last Updated At -> knowledge_base.created_at
  [IC] [ ] - Active Status -> knowledge_base table query

## Transcriber Configuration
[IC] [✅] - Provider -> agents.transcriber_config.provider
[IC] [✅] - Code Switching -> agents.transcriber_config.codeSwitchingEnabled
[IC] [✅] - Endpointing -> agents.transcriber_config.endpointing
[IC] [✅] - Keywords -> agents.transcriber_config.keywords
[IC] [✅] - Language -> agents.transcriber_config.language
[IC] [✅] - Smart Format -> agents.transcriber_config.smartFormat

## Call Settings
[IC] [✅] - Timeouts
  [IC] [✅] - Silence Timeout -> agents.call_config.silenceTimeoutSeconds
  [IC] [✅] - Max Duration -> agents.call_config.maxDurationSeconds
[IC] [ ] - Background Settings
  [IC] [ ] - Background Denoising -> agents.call_config.backgroundDenoising
[IC] [ ] - Model Output in Messages -> agents.call_config.includeModelOutput
[IC] [ ] - Transport Configurations -> agents.call_config.transportConfig
[IC] [ ] - End Call
  [IC] [ ] - End Call Message -> agents.call_config.endCallMessage
  [IC] [ ] - End Call Phrases -> agents.call_config.endCallPhrases
[IC] [ ] - Messages
  [IC] [ ] - Client Messages -> agents.call_config.clientMessages
  [IC] [ ] - Server Messages -> agents.call_config.serverMessages

## Voicemail Settings
[IC] [ ] - Detection Settings
  [IC] [ ] - Provider -> agents.voicemail_config.provider
  [IC] [ ] - Enable Detection -> agents.voicemail_config.enabled
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
[IC] [ ] - Custom Functions List -> agents.model_config.customFunctions
  [IC] [ ] - Function Name -> customFunctions[].name
  [IC] [ ] - Description -> customFunctions[].description
  [IC] [ ] - URL -> customFunctions[].url
  [IC] [ ] - API Timeout -> customFunctions[].apiTimeout
  [IC] [ ] - Parameters -> customFunctions[].parameters
  [IC] [ ] - Speaking Options
    [IC] [ ] - Speak During Execution -> customFunctions[].speakDuring
    [IC] [ ] - Speak After Execution -> customFunctions[].speakAfter
  [IC] [ ] - Enabled Status -> customFunctions[].enabled

## Notification Settings
[IC] [ ] - Notification Events
  [IC] [ ] - Call Start -> agents.notification_config.onCallStart
  [IC] [ ] - Call End -> agents.notification_config.onCallEnd
  [IC] [ ] - Error Occurred -> agents.notification_config.onError
  [IC] [ ] - Voicemail Detected -> agents.notification_config.onVoicemailDetected

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
