import { ReliantClient } from '../client.js'

export const guardTools = [
  {
    name: 'reliant_guard_chat',
    description: 'Send a user message through a Reliant Guard — validates topic, PII, and tone before returning the AI response. Use this to safely handle user messages in your AI chatbots.',
    inputSchema: {
      type: 'object',
      properties: {
        user_message: { type: 'string', description: 'The message from the end user' },
        guard_id: { type: 'string', description: 'The Guard config ID to use' },
        end_user_id: { type: 'string', description: 'End user identifier for per-user limits (e.g. phone number, user ID)' },
      },
      required: ['user_message', 'guard_id'],
    },
    handler: async (client: ReliantClient, args: any) => {
      const result = await client.post('/guard/chat', {
        user_message: args.user_message,
        guard_id: args.guard_id,
        user_id: client.userId,
        end_user_id: args.end_user_id,
      })

      const icon = result.allowed ? '✅' : '🚫'
      const lines = [
        `${icon} **Allowed:** ${result.allowed}`,
        `**Response:** ${result.response}`,
        result.blocked_by ? `**Blocked by:** ${result.blocked_by}` : null,
        result.block_reason ? `**Reason:** ${result.block_reason}` : null,
        `**Latency:** ${result.latency_ms}ms`,
      ].filter(Boolean)

      return lines.join('\n')
    },
  },

  {
    name: 'reliant_list_guards',
    description: 'List all Guard configurations in your project. Shows name, provider, model, and active status.',
    inputSchema: { type: 'object', properties: {} },
    handler: async (client: ReliantClient, _args: any) => {
      const data = await client.get('/guard/configs')
      const configs = data.configs || []
      if (configs.length === 0) return 'No Guard configs found. Create one with reliant_create_guard.'

      const lines = configs.map((g: any) =>
        `- **${g.name}** (ID: \`${g.id}\`) | ${g.provider}/${g.model} | ${g.is_active ? '🟢 active' : '🔴 inactive'}`
      )
      return `**Guard configs (${configs.length}):**\n\n${lines.join('\n')}`
    },
  },

  {
    name: 'reliant_create_guard',
    description: 'Create a new Guard configuration. Describe what topics the bot can discuss, what to block, and the tone requirements — Reliant sets up the safety layer automatically.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Guard config name (e.g. "Customer Support Bot")' },
        provider: {
          type: 'string',
          enum: ['anthropic', 'openai', 'groq'],
          description: 'LLM provider for the guard',
          default: 'anthropic',
        },
        model: { type: 'string', description: 'Model for the guard', default: 'claude-haiku-4-5-20251001' },
        allowed_topics: {
          type: 'array',
          items: { type: 'string' },
          description: 'Topics the bot is ALLOWED to discuss (whitelist). Leave empty to allow all.',
        },
        blocked_topics: {
          type: 'array',
          items: { type: 'string' },
          description: 'Topics the bot must NEVER discuss (blacklist)',
        },
        blocked_keywords: {
          type: 'array',
          items: { type: 'string' },
          description: 'Exact keywords that trigger Data Shield blocking',
        },
        tone_rules: { type: 'string', description: 'Plain English description of required tone (e.g. "Always be professional and empathetic. Never use aggressive language.")' },
        safe_response: { type: 'string', description: 'Default response when any rule is violated', default: "I'm sorry, I can't help with that." },
        max_executions_per_user: { type: 'number', description: 'Max executions per end-user per period (optional)' },
        user_period_type: { type: 'string', enum: ['hourly', 'daily', 'monthly'], description: 'Period for per-user limit', default: 'daily' },
      },
      required: ['name'],
    },
    handler: async (client: ReliantClient, args: any) => {
      const data = await client.post('/guard/configs', {
        name: args.name,
        user_id: client.userId,
        provider: args.provider || 'anthropic',
        model: args.model || 'claude-haiku-4-5-20251001',
        allowed_topics: args.allowed_topics || [],
        blocked_topics: args.blocked_topics || [],
        blocked_keywords: args.blocked_keywords || [],
        tone_rules: args.tone_rules || null,
        safe_response: args.safe_response || "I'm sorry, I can't help with that.",
        max_executions_per_user: args.max_executions_per_user || null,
        user_period_type: args.user_period_type || 'daily',
        is_active: true,
      })

      return [
        `✅ **Guard created successfully!**`,
        ``,
        `**Name:** ${data.name}`,
        `**ID:** \`${data.id}\``,
        `**Provider:** ${data.provider} / ${data.model}`,
        args.allowed_topics?.length ? `**Allowed topics:** ${data.allowed_topics.join(', ')}` : null,
        args.blocked_topics?.length ? `**Blocked topics:** ${data.blocked_topics.join(', ')}` : null,
        args.max_executions_per_user ? `**Per-user limit:** ${data.max_executions_per_user}/${data.user_period_type}` : null,
        ``,
        `Use this Guard ID in /guard/chat calls: \`${data.id}\``,
      ].filter(Boolean).join('\n')
    },
  },

  {
    name: 'reliant_guard_usage',
    description: 'Check usage statistics for a Guard — how many executions this month, and top end-users by volume.',
    inputSchema: {
      type: 'object',
      properties: {
        guard_id: { type: 'string', description: 'The Guard ID to check' },
      },
      required: ['guard_id'],
    },
    handler: async (client: ReliantClient, args: any) => {
      const data = await client.get(`/guard/usage/${args.guard_id}`)
      const lines = [
        `**Guard usage — ${data.period}**`,
        `**Total executions:** ${data.project_total}`,
        '',
        '**Top end-users:**',
        ...(data.top_users || []).slice(0, 10).map((u: any) =>
          `- \`${u.end_user_id}\`: ${u.count} executions`
        ),
      ]
      return lines.join('\n')
    },
  },
]
