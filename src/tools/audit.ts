import { ReliantClient } from '../client.js'

export const auditTools = [
  {
    name: 'reliant_audit_recent',
    description: 'Show recent events from the Reliant Audit Trail — executions, guard checks, contract violations, and limit events. Use this to investigate what happened with your AI system.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of events to return (default: 20)', default: 20 },
        status: {
          type: 'string',
          enum: ['success', 'failed', 'blocked', 'flagged', 'fallback', 'limit'],
          description: 'Filter by event status (optional)',
        },
        schema_id: { type: 'string', description: 'Filter by schema ID (optional)' },
      },
    },
    handler: async (client: ReliantClient, args: any) => {
      const params = new URLSearchParams()
      params.set('limit', String(args.limit || 20))
      if (args.status) params.set('status', args.status)
      if (args.schema_id) params.set('schema_id', args.schema_id)

      const data = await client.get(`/executions?${params}`)
      const executions = data.executions || []

      if (executions.length === 0) return 'No audit events found for the given filters.'

      const lines = executions.map((e: any) => {
        const statusIcon = e.status === 'SUCCESS' ? '✅' : e.status === 'FALLBACK' ? '⚠️' : '❌'
        const ago = getTimeAgo(e.created_at)
        return `${statusIcon} **${e.status}** | ${e.schema_id} | ${e.provider} | ${e.latency_ms}ms | ${ago}`
      })

      const summary = {
        total: executions.length,
        success: executions.filter((e: any) => e.status === 'SUCCESS').length,
        fallback: executions.filter((e: any) => e.status === 'FALLBACK').length,
        failed: executions.filter((e: any) => e.status === 'FAILED').length,
      }

      return [
        `**Audit Trail — last ${executions.length} events**`,
        `Summary: ✅ ${summary.success} success | ⚠️ ${summary.fallback} fallback | ❌ ${summary.failed} failed`,
        '',
        lines.join('\n'),
      ].join('\n')
    },
  },

  {
    name: 'reliant_inspect_execution',
    description: 'Inspect a specific execution in detail — shows full output, input prompt, validation errors, and all metadata.',
    inputSchema: {
      type: 'object',
      properties: {
        execution_id: { type: 'string', description: 'The execution ID to inspect' },
      },
      required: ['execution_id'],
    },
    handler: async (client: ReliantClient, args: any) => {
      const data = await client.get(`/executions/${args.execution_id}`)
      const e = data.execution || data

      const lines = [
        `**Execution: ${e.id}**`,
        `**Status:** ${e.status}`,
        `**Schema:** ${e.schema_id} v${e.schema_version}`,
        `**Provider:** ${e.provider} / ${e.model}`,
        `**Attempts:** ${e.attempts}`,
        `**Latency:** ${e.latency_ms}ms`,
        `**Tokens:** ${e.tokens_used}`,
        `**Time:** ${new Date(e.created_at).toLocaleString()}`,
        e.quality_score != null ? `**Quality:** ${(e.quality_score * 100).toFixed(0)}%` : null,
        e.contract_violated ? `**⚠️ Contract violated:** yes` : null,
        '',
        '**Output:**',
        '```json',
        JSON.stringify(e.output, null, 2),
        '```',
        e.input_prompt ? `\n**Input prompt:**\n${e.input_prompt.substring(0, 500)}...` : null,
        e.validation_errors?.length
          ? `\n**Validation errors:**\n${e.validation_errors.map((v: string) => `- ${v}`).join('\n')}`
          : null,
      ].filter(Boolean)

      return lines.join('\n')
    },
  },
]

function getTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}
