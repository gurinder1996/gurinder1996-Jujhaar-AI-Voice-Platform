"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Agent {
  id: string
  name: string
  organization_id: string
}

export function AgentSelector() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string>("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchAgents() {
      const { data: agents, error } = await supabase
        .from("agents")
        .select("id, name, organization_id")
        .order("name")

      if (error) {
        console.error("Error fetching agents:", error)
        return
      }

      setAgents(agents || [])
      // Select the first agent by default if none is selected
      if (agents?.length && !selectedAgent) {
        setSelectedAgent(agents[0].id)
      }
    }

    fetchAgents()
  }, [supabase, selectedAgent])

  return (
    <Select
      value={selectedAgent}
      onValueChange={setSelectedAgent}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select an agent..." />
      </SelectTrigger>
      <SelectContent>
        {agents.map((agent) => (
          <SelectItem key={agent.id} value={agent.id}>
            <div className="flex items-center">
              <span>{agent.name}</span>
              {selectedAgent === agent.id && (
                <Check className="ml-2 h-4 w-4" />
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
