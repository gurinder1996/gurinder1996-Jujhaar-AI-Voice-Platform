({
    "transcriber": {
      "provider": "deepgram",
      "codeSwitchingEnabled": false,
      "endpointing": 0,
      "keywords": [
        ""
      ],
      "language": null,
      "model": null,
      "smartFormat": false
    },
    "model": {
      "provider": "openai",
      "emotionRecognitionEnabled": false,
      "fallbackModels": [
        "gpt-4o-mini",
        "gpt-4"
      ],
      "knowledgeBase": {
        "server": {
          "url": "",
          "timeoutSeconds": 0,
          "secret": "",
          "headers": {}
        }
      },
      "knowledgeBaseId": "",
      "maxTokens": 0,
      "messages": [],
      "numFastTurns": 0,
      "semanticCachingEnabled": false,
      "temperature": 0,
      "toolIds": [],
      "tools": []
    },
    "voice": {
      "provider": "11labs",
      "voiceId": "joseph",
      "chunkPlan": {},
      "enableSsmlParsing": false,
      "fallbackPlan": {
        "voices": [
          {
            "provider": "rime-ai",
            "voiceId": "allison",
            "chunkPlan": {
              "enabled": false,
              "minCharacters": 0,
              "punctuationBoundaries": [],
              "formatPlan": {
                "enabled": false,
                "numberToDigitsCutoff": 0,
                "replacements": []
              }
            },
            "model": null,
            "speed": 0
          }
        ]
      },
      "language": "",
      "model": null,
      "optimizeStreamingLatency": 0,
      "similarityBoost": 0,
      "stability": 0,
      "style": 0,
      "useSpeakerBoost": false
    },
    "firstMessage": "",
    "firstMessageMode": null,
    "hipaaEnabled": false,
    "clientMessages": [
      null
    ],
    "serverMessages": [
      null
    ],
    "silenceTimeoutSeconds": 0,
    "maxDurationSeconds": 0,
    "backgroundSound": null,
    "backgroundDenoisingEnabled": false,
    "modelOutputInMessagesEnabled": false,
    "transportConfigurations": [],
    "name": "",
    "voicemailDetection": {
      "provider": "twilio",
      "voicemailDetectionTypes": [],
      "enabled": false,
      "machineDetectionTimeout": 0,
      "machineDetectionSpeechThreshold": 0,
      "machineDetectionSpeechEndThreshold": 0,
      "machineDetectionSilenceTimeout": 0
    },
    "voicemailMessage": "",
    "endCallMessage": "",
    "endCallPhrases": [],
    "metadata": {},
    "analysisPlan": {
      "summaryPlan": {
        "messages": [],
        "enabled": false,
        "timeoutSeconds": 0
      },
      "structuredDataPlan": {
        "messages": [],
        "enabled": false,
        "schema": {
          "items": {},
          "properties": {},
          "description": "",
          "required": []
        },
        "timeoutSeconds": 0
      },
      "successEvaluationPlan": {
        "rubric": null,
        "messages": [],
        "enabled": false,
        "timeoutSeconds": 0
      }
    },
    "artifactPlan": {
      "recordingEnabled": false,
      "videoRecordingEnabled": false,
      "transcriptPlan": {
        "enabled": false,
        "assistantName": "",
        "userName": ""
      },
      "recordingPath": ""
    },
    "messagePlan": {
      "idleMessages": [],
      "idleMessageMaxSpokenCount": 0,
      "idleTimeoutSeconds": 0
    },
    "startSpeakingPlan": {
      "waitSeconds": 0,
      "smartEndpointingEnabled": false,
      "customEndpointingRules": [],
      "transcriptionEndpointingPlan": {
        "onPunctuationSeconds": 0,
        "onNoPunctuationSeconds": 0,
        "onNumberSeconds": 0
      }
    },
    "stopSpeakingPlan": {
      "numWords": 0,
      "voiceSeconds": 0,
      "backoffSeconds": 0
    },
    "monitorPlan": {
      "listenEnabled": false,
      "controlEnabled": false
    },
    "credentialIds": [],
    "server": {
      "url": "",
      "timeoutSeconds": 0,
      "secret": "",
      "headers": {}
    }
  }),
;
