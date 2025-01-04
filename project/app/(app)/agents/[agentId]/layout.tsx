"use client"

import { AgentProvider } from "@/contexts/agent-context"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()

  const tabs = [
    {
      label: "Agent Design",
      href: `/agents/${params.agentId}/design`,
    },
    {
      label: "Knowledge Base",
      href: `/agents/${params.agentId}/knowledge-base`,
    },
    {
      label: "Workflows",
      href: `/agents/${params.agentId}/workflows`,
    },
    {
      label: "Functions",
      href: `/agents/${params.agentId}/functions`,
    },
    {
      label: "Settings",
      href: `/agents/${params.agentId}/settings`,
    },
  ]

  return (
    <AgentProvider>
      <div className="flex h-14 items-center justify-center border-b bg-[#F8F9FC]">
        <nav className="flex items-center space-x-4">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === tab.href
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-6">
        {children}
      </div>
    </AgentProvider>
  )
}
