"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { AgentInfo } from "./agent-info"
import { OrganizationInfo } from "./organization-info"
import { SettingsTabs } from "./settings-tabs"
import { SettingsTabContent } from "./tabs/settings-tab-content"
import { useAgent } from "@/contexts/agent-context"
import { useParams } from "next/navigation"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const params = useParams()
  const { fetchAgent, setSelectedAgent } = useAgent()
  
  useEffect(() => {
    const agentId = params?.agentId as string
    if (agentId) {
      fetchAgent(agentId).then(agent => {
        if (agent) {
          setSelectedAgent(agent)
        }
      })
    }
  }, [params?.agentId, fetchAgent, setSelectedAgent])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <AgentInfo />
      </Card>

      <Card className="p-6">
        <OrganizationInfo />
      </Card>

      <Card className="space-y-6 p-6">
        <SettingsTabs activeTab={activeTab} onChange={setActiveTab} />
        <SettingsTabContent activeTab={activeTab} />
      </Card>
    </div>
  )
}