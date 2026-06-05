import { ReliantClient } from '../client.js'

export const executionTools = [
  {
    name: 'reliant_execute',
    description: 'Execute a prompt through a Reliant schema — guaranteed structured JSON output with automatic retry and fallback. Use this to run any AI task that must return structured data.',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: { type: 'string', description: 'The prompt or text to process' },
        schema_id: { type: 'string', description: 'The schema ID to use for structured output' },
        provider: {
          type: 'string',
          enum: ['anthropic', 'openai', 'gemini', 'groq', 'mistral'],
          description: 'LLM provider to use',
          default: 'anthropic',
        },
        model: { type: 'string', description: 'Model name (e.g. claude-sonnet-4-20250514)', default: 'claude-sonnet-4-20250514' },
        contract_id: { type: 'string', description: 'Optional business contract ID to validate the output' },
        max_retries: { type: 'number', description: 'Max retries on invalid output (default: 3)', default: 3 },
      },
      required: ['prompt', 'schema_id'],
    },
    handler: async (client: ReliantClient, args: any) => {
      const result = await client.post('/execute', {
        prompt: args.prompt,
        schema_id: args.schema_id,
        provider: args.provider || 'anthropic',
        model: args.model || 'claude-sonnet-4-20250514',
        user_id: client.userId,
        contract_id: args.contract_id,
        options: { max_retries: args.max_retries || 3 },
      })

      const lines = [
        `**Status:** ${result.status}`,
        `**Success:** ${result.success}`,
        `**Provider:** ${result.metadata?.provider} / ${result.metadata?.model}`,
        `**Attempts:** ${result.metadata?.attempts}`,
        `**Latency:** ${result.metadata?.latency_ms}ms`,
        `**Tokens:** ${result.metadata?.tokens_used}`,
        result.metadata?.quality_score != null
          ? `**Quality score:** ${(result.metadata.quality_score * 100).toFixed(0)}%`
          : null,
        result.contract_violated
          ? `**⚠️ Contract violated:** ${JSON.stringify(result.contract_violations)}`
          : null,
        '',
        '**Output:**',
        '```json',
        JSON.stringify(result.output, null, 2),
        '```',
      ].filter(Boolean).join('\n')

      return lines
    },
  },

  {
    name: 'reliant_list_executions',
    description: 'List recent executions from your Reliant project. Shows status, provider, latency, and schema for each execution.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of executions to return (default: 10)', default: 10 },
        schema_id: { type: 'string', description: 'Filter by schema ID (optional)' },
        status: { type: 'string', enum: ['SUCCESS', 'FALLBACK', 'FAILED'], description: 'Filter by status (optional)' },
      },
    },
    handler: async (client: ReliantClient, args: any) => {
      const params = new URLSearchParams()
      if (args.limit) params.set('limit', String(args.limit))
      if (args.schema_id) params.set('schema_id', args.schema_id)
      if (args.status) params.set('status', args.status)

      const data = await client.get(`/executions?${params}`)
      const executions = data.executions || []

      if (executions.length === 0) return 'No executions found.'

      const lines = executions.map((e: any) =>
        `- **${e.id.substring(0, 16)}...** | ${e.status} | ${e.schema_id} | ${e.provider} | ${e.latency_ms}ms | ${new Date(e.created_at).toLocaleString()}`
      )

      return `**Recent executions (${executions.length}):**\n\n${lines.join('\n')}`
    },
  },
]
