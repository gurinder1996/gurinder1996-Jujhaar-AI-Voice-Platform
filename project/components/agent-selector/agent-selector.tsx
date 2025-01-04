"use client"

import { useCallback, useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAgent } from "@/contexts/agent-context"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter, useParams } from "next/navigation"

type Agent = {
  id: string
  name: string
}

export function AgentSelector() {
  const [open, setOpen] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])
  const { selectedAgent, setSelectedAgent } = useAgent()
  const supabase = createClientComponentClient()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("id, name")
        .order("name")

      if (data && !error) {
        console.log('Fetched agents:', data)
        setAgents(data)
      }
    }

    fetchAgents()
  }, [supabase])

  const handleAgentSelect = async (agent: Agent) => {
    console.log('Selected agent:', agent)
    
    // Set the selected agent immediately with basic data
    setSelectedAgent({
      id: agent.id,
      name: agent.name,
      organization: null,
      owner: null
    })
    
    setOpen(false)
    
    // Get the current path segments
    const pathSegments = window.location.pathname.split('/')
    const currentPage = pathSegments[pathSegments.length - 1]
    
    // Determine the new path
    let newPath = `/agents/${agent.id}`
    if (currentPage === 'settings' || currentPage === 'design') {
      newPath += `/${currentPage}`
    } else {
      newPath += '/design' // Default to design page
    }
    
    console.log('Navigating to:', newPath)
    router.push(newPath)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedAgent?.name || "Select agent..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search agents..." />
          <CommandEmpty>No agent found.</CommandEmpty>
          <CommandGroup>
            {agents.map((agent) => (
              <CommandItem
                key={agent.id}
                value={agent.name}
                onSelect={() => handleAgentSelect(agent)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedAgent?.id === agent.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {agent.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
