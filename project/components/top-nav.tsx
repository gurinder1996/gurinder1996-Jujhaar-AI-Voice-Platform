'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const agentDesignPaths = [
  '/agents/design',
  '/agents/knowledge-base',
  '/agents/workflows',
  '/agents/settings',
  '/agents/functions'
];

const tabs = [
  {
    label: "Agent Design",
    href: "/agents/design",
  },
  {
    label: "Knowledge Base",
    href: "/agents/knowledge-base",
  },
  {
    label: "Workflows",
    href: "/agents/workflows",
  },
  {
    label: "Functions",
    href: "/agents/functions",
  },
  {
    label: "Settings",
    href: "/agents/settings",
  },
];

export function TopNav() {
  const pathname = usePathname();

  // Only show tabs on agent design related pages
  const showTabs = agentDesignPaths.some(path => pathname?.startsWith(path));

  if (!showTabs) {
    return null;
  }

  return (
    <div className="flex h-14 items-center justify-between border-b bg-[#F8F9FC] px-6">
      <div className="w-[240px]">
        {/* AgentSelector temporarily hidden
        <AgentSelector />
        */}
      </div>
      <nav className="flex items-center space-x-4">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname?.startsWith(tab.href)
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      <div className="w-[240px]" />
    </div>
  );
}