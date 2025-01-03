# Current Database Schema

## Agents Table
- `id` text NOT NULL
- `organization_id` text NOT NULL
- `name` text NOT NULL
- `created_at` timestamp with time zone DEFAULT now()
- `updated_at` timestamp with time zone
- `greeting` text
- `personality` text
- `first_message` text
- `first_message_mode` text
- `hipaa_enabled` boolean DEFAULT false
- `voice_config` jsonb DEFAULT {
  - provider: '11labs'
  - voiceId: 'joseph'
  - language: ''
  - stability: 0
  - similarityBoost: 0
  - style: 0
  - useSpeakerBoost: false
  - optimizeStreamingLatency: 0
  - chunkPlan: {}
  - enableSsmlParsing: false
  - fallbackPlan: { voices: [{ provider: 'rime-ai', voiceId: 'allison' }] }
  - speechNormalization: false
  - boostedKeywords: []
  - backchanneling: false
  - interruptionSensitivity: 0.5
  - responsiveness: 0.5
}
- `model_config` jsonb DEFAULT {
  - provider: 'openai'
  - emotionRecognitionEnabled: false
  - fallbackModels: ['gpt-4o-mini', 'gpt-4']
  - maxTokens: 0
  - temperature: 0
  - semanticCachingEnabled: false
  - numFastTurns: 0
  - messages: []
  - tools: []
  - toolIds: []
  - knowledgeBaseId: ''
  - knowledgeBase: { server: { url: '', timeoutSeconds: 0, secret: '', headers: {} } }
  - customFunctions: []
}
- `transcriber_config` jsonb DEFAULT {
  - provider: 'deepgram'
  - codeSwitchingEnabled: false
  - endpointing: 0
  - keywords: []
  - language: null
  - model: null
  - smartFormat: false
}
- `call_config` jsonb DEFAULT {
  - silenceTimeoutSeconds: 0
  - maxDurationSeconds: 0
  - backgroundSound: null
  - backgroundDenoisingEnabled: false
  - modelOutputInMessagesEnabled: false
  - transportConfigurations: []
  - endCallMessage: ''
  - endCallPhrases: []
  - clientMessages: []
  - serverMessages: []
}
- `voicemail_config` jsonb DEFAULT {
  - detection: {
    - provider: 'twilio'
    - enabled: false
    - voicemailDetectionTypes: []
    - machineDetectionTimeout: 0
    - machineDetectionSpeechThreshold: 0
    - machineDetectionSpeechEndThreshold: 0
    - machineDetectionSilenceTimeout: 0
  }
  - message: ''
}
- `analysis_config` jsonb DEFAULT {
  - summaryPlan: {
    - messages: []
    - enabled: false
    - timeoutSeconds: 0
  }
  - structuredDataPlan: {
    - messages: []
    - enabled: false
    - schema: { items: {}, properties: {}, description: '', required: [] }
    - timeoutSeconds: 0
  }
  - successEvaluationPlan: {
    - rubric: null
    - messages: []
    - enabled: false
    - timeoutSeconds: 0
  }
}
- `artifact_config` jsonb DEFAULT {
  - recordingEnabled: false
  - videoRecordingEnabled: false
  - transcriptPlan: {
    - enabled: false
    - assistantName: ''
    - userName: ''
  }
  - recordingPath: ''
}
- `message_config` jsonb DEFAULT {
  - idleMessages: []
  - idleMessageMaxSpokenCount: 0
  - idleTimeoutSeconds: 0
}
- `speaking_config` jsonb DEFAULT {
  - startPlan: {
    - waitSeconds: 0
    - smartEndpointingEnabled: false
    - customEndpointingRules: []
    - transcriptionEndpointingPlan: {
      - onPunctuationSeconds: 0
      - onNoPunctuationSeconds: 0
      - onNumberSeconds: 0
    }
  }
  - stopPlan: {
    - numWords: 0
    - voiceSeconds: 0
    - backoffSeconds: 0
  }
}
- `monitor_config` jsonb DEFAULT {
  - listenEnabled: false
  - controlEnabled: false
}
- `server_config` jsonb DEFAULT {
  - url: ''
  - timeoutSeconds: 0
  - secret: ''
  - headers: {}
}
- `metadata` jsonb DEFAULT {}
- `credential_ids` text[] DEFAULT ARRAY[]::text[]
- `guidelines` text
- `status` text DEFAULT 'active'
- `notification_config` jsonb DEFAULT {
  - emailSummary: 'never'
  - contactInfo: {
    - email: ''
    - phoneNumber: ''
  }
  - notificationEvents: {
    - everyCall: false
    - liveActionError: false
    - unhappyCustomer: false
    - requiredInformation: false
    - humanFollowUp: false
  }
}

## Knowledge Base Table
- `id` text NOT NULL
- `agent_id` text NOT NULL
- `question` text NOT NULL
- `answer` text NOT NULL
- `created_at` timestamp with time zone DEFAULT now()

## Organizations Table
- `id` text NOT NULL
- `name` text NOT NULL
- `owner_id` uuid NOT NULL
- `created_at` timestamp with time zone DEFAULT now()

## Workflows Table
- `id` text NOT NULL
- `agent_id` text NOT NULL
- `title` text NOT NULL
- `definition_json` jsonb NOT NULL
- `created_at` timestamp with time zone DEFAULT now()

## Calls Table
- `id` text NOT NULL
- `assistantid` text
- `phonenumberid` text
- `type` text
- `startedat` timestamp with time zone
- `endedat` timestamp with time zone
- `transcript` text
- `recordingurl` text
- `summary` text
- `createdat` timestamp with time zone
- `updatedat` timestamp with time zone
- `orgid` text
- `cost` numeric
- `assistant` jsonb
- `customer` jsonb
- `status` text
- `endedreason` text
- `messages` jsonb
- `stereorecordingurl` text
- `costbreakdown` jsonb
- `phonecallprovider` text
- `phonecallproviderid` text
- `phonecalltransport` text
- `analysis` jsonb
- `artifact` jsonb
- `costs` jsonb
- `monitor` jsonb
- `transport` jsonb
- `webcallurl` text
- `assistantoverrides` jsonb
