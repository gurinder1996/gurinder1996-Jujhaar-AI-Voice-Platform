"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Workflows</h2>
        <p className="text-muted-foreground">Configure your agent's conversation workflows here.</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Conversation Flow</h3>
          <div className="flex gap-2">
            <Button>New Workflow</Button>
            <Button variant="outline">Import</Button>
          </div>
        </div>

        <div className="h-[400px] border rounded-lg flex items-center justify-center bg-muted/10">
          <div className="text-center text-muted-foreground">
            <p>No workflows created yet</p>
            <p className="text-sm">Create a new workflow to get started</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
