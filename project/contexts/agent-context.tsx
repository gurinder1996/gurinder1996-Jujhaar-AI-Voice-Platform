"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { createClientComponentClient, type RealtimeChannel } from "@supabase/auth-helpers-nextjs"
import { useParams } from "next/navigation"

type Agent = {
  id: string
  name: string
  organization: {
    id: string
    name: string | null
  } | null
  owner: {
    id: string
    email: string
  } | null
}

type AgentContextType = {
  selectedAgent: Agent | null
  setSelectedAgent: (agent: Agent | null) => void
  isLoading: boolean
  fetchAgent: (agentId: string) => Promise<Agent | null>
  updateSelectedAgent: (data: Partial<Agent>) => void
}

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()
  const params = useParams()
  const agentId = params?.agentId as string

  const fetchAgent = useCallback(async (agentId: string) => {
    console.log('AgentContext: Fetching agent:', agentId)
    try {
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .select('id, name, organization_id')
        .eq('id', agentId)
        .single()

      if (agentError) {
        console.error('Error fetching agent:', agentError)
        return null
      }

      console.log('AgentContext: Raw agent data:', agentData)

      if (!agentData) {
        console.log('AgentContext: No agent data found')
        return null
      }

      // Create organization object from the agent data
      const organization = agentData.organization_id ? {
        id: agentData.organization_id,
        name: null
      } : null

      // If we have an organization, fetch its name
      if (organization) {
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('name')
          .eq('id', organization.id)
          .single()

        if (!orgError && orgData) {
          organization.name = orgData.name
        }
      }

      const finalAgentData: Agent = {
        id: agentData.id,
        name: agentData.name,
        organization,
        owner: null // We'll add owner data if needed
      }

      console.log('AgentContext: Final agent data:', finalAgentData)
      return finalAgentData
    } catch (error) {
      console.error('Error in fetchAgent:', error)
      return null
    }
  }, [supabase])

  const updateSelectedAgent = useCallback((data: Partial<Agent>) => {
    console.log('AgentContext: Updating selected agent with:', data)
    setSelectedAgent(prev => {
      const updated = prev ? { ...prev, ...data } : null
      console.log('AgentContext: Updated agent state:', updated)
      return updated
    })
  }, [])

  // Initial agent fetch
  useEffect(() => {
    console.log('AgentContext: Initial load effect - agentId:', agentId)
    
    if (!agentId) {
      console.log('AgentContext: No agentId, setting loading false')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    fetchAgent(agentId).then(agent => {
      console.log('AgentContext: Setting initial agent:', agent)
      setSelectedAgent(agent)
      setIsLoading(false)
    })
  }, [agentId, fetchAgent])

  // Set up subscriptions
  useEffect(() => {
    if (!agentId) return

    console.log('AgentContext: Setting up subscription for agent:', agentId)
    const agentSubscription = supabase
      .channel(`agent-${agentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agents',
          filter: `id=eq.${agentId}`
        },
        async (payload) => {
          console.log('AgentContext: Received agent change:', payload)
          if (payload.eventType === 'UPDATE') {
            const agent = await fetchAgent(agentId)
            console.log('AgentContext: Updated agent data:', agent)
            setSelectedAgent(agent)
          }
        }
      )
      .subscribe()

    return () => {
      console.log('AgentContext: Cleaning up subscription')
      agentSubscription.unsubscribe()
    }
  }, [agentId, fetchAgent, supabase])

  const value = {
    selectedAgent,
    setSelectedAgent,
    isLoading,
    fetchAgent,
    updateSelectedAgent
  }

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent() {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error("useAgent must be used within an AgentProvider")
  }
  return context
}
