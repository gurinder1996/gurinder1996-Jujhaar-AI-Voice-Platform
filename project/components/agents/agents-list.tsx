"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Agent = {
  id: string
  name: string
  status: string
  created_at: string
  updated_at: string
  organization_id: string | null
  personality: string
  voice_config: {
    provider: string
    voice: string
  } | null
  phone_number: string | null
}

export function AgentsList() {
  const [agents, setAgents] = useState<Agent[]>([])
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("created_at", { ascending: false })

      if (data && !error) {
        setAgents(data)
      }
    }

    fetchAgents()
  }, [supabase])

  const handleAgentClick = (agentId: string) => {
    router.push(`/agents/${agentId}/design`)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Voice</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow 
              key={agent.id} 
              className="cursor-pointer"
              onClick={() => handleAgentClick(agent.id)}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8" />
                  {agent.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {agent.personality || "General"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6" />
                  {agent.voice_config?.voice || "Default"}
                </div>
              </TableCell>
              <TableCell>{agent.phone_number || "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{new Date(agent.updated_at).toLocaleDateString()}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add menu actions here
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}