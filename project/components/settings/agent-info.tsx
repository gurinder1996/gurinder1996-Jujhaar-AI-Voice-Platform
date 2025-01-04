"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { useAgent } from "@/contexts/agent-context"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"

const agentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long")
})

export function AgentInfo() {
  const params = useParams()
  const { selectedAgent, updateSelectedAgent, isLoading } = useAgent()
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const [isUpdating, setIsUpdating] = useState(false)
  // Initialize localName with selectedAgent.name if it exists
  const [localName, setLocalName] = useState(selectedAgent?.name || "")

  // Get agentId from URL params
  const agentId = params?.agentId as string

  // Update local name when selected agent changes
  useEffect(() => {
    if (selectedAgent?.name) {
      setLocalName(selectedAgent.name)
    }
  }, [selectedAgent?.name])

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value)
  }, [])

  const handleNameBlur = useCallback(async (e: React.FocusEvent<HTMLInputElement>) => {
    const newName = e.target.value.trim()
    
    if (!newName || !agentId || isUpdating) {
      return
    }

    if (newName === selectedAgent?.name) {
      return
    }

    setIsUpdating(true)

    try {
      // Validate the new name
      agentSchema.parse({ name: newName })

      const { data, error } = await supabase
        .from('agents')
        .update({ name: newName })
        .eq('id', agentId)
        .select()
        .single()

      if (error) throw error

      if (data) {
        updateSelectedAgent(data)
        toast({
          title: "Success",
          description: "Agent name has been updated",
          duration: 2000,
        })
      }
    } catch (error) {
      console.error('Error updating name:', error)
      
      // Reset to current name on error
      setLocalName(selectedAgent?.name || "")
      
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid name",
          description: error.errors[0].message,
          variant: "destructive",
          duration: 3000,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update agent name",
          variant: "destructive",
          duration: 3000,
        })
      }
    } finally {
      setIsUpdating(false)
    }
  }, [agentId, selectedAgent?.name, isUpdating, supabase, updateSelectedAgent, toast])

  const handleCopyId = useCallback(async () => {
    if (selectedAgent?.id) {
      await navigator.clipboard.writeText(selectedAgent.id)
      toast({
        title: "Copied",
        description: "Agent ID has been copied to clipboard",
        duration: 2000,
      })
    }
  }, [selectedAgent?.id, toast])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Agent Info</h2>
        <p className="text-sm text-muted-foreground">
          Basic information about your agent
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="agent-name" className="text-sm font-medium">
            Agent Name
          </label>
          <Input
            id="agent-name"
            value={localName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder={isLoading ? "Loading..." : "Enter agent name"}
            disabled={isLoading || isUpdating}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Agent ID</label>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-background border px-2 py-1">
              {selectedAgent?.id || "Loading..."}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyId}
              disabled={!selectedAgent?.id}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}