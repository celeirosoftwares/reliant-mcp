import { ReliantClient } from '../client.js'

export const metricsTools = [
  {
    name: 'reliant_metrics',
    description: 'Get a summary of your Reliant project metrics — total executions, success rate, average latency, and token usage. Use this to get a quick health check of your AI pipelines.',
    inputSchema: {
      type: 'object',
      properties: {
        days: { type: 'number', description: 'Number of days to look back (default: 30)', default: 30 },
      },
    },
    handler: async (client: ReliantClient, args: any) => {
      const days = args.days || 30
      const data = await client.get(`/metrics/summary?days=${days}`)

      const successRate = data.success_rate ?? 0
      const statusIcon = successRate >= 99 ? '✅' : successRate >= 95 ? '⚠️' : '🚨'

      return [
        `${statusIcon} **Reliant Metrics — last ${days} days**`,
        ``,
        `**Total executions:** ${data.total_executions?.toLocaleString()}`,
        `**Success rate:** ${successRate}%`,
        `**Average latency:** ${data.avg_latency_ms}ms`,
        `**Total tokens used:** ${data.total_tokens?.toLocaleString()}`,
        `**Avg attempts per execution:** ${data.avg_attempts}`,
        ``,
        `**By status:**`,
        `- ✅ Success: ${data.status_breakdown?.success?.toLocaleString() || 0}`,
        `- ⚠️ Fallback: ${data.status_breakdown?.fallback?.toLocaleString() || 0}`,
        `- ❌ Failed: ${data.status_breakdown?.failed?.toLocaleString() || 0}`,
      ].join('\n')
    },
  },

  {
    name: 'reliant_analytics',
    description: 'Get detailed analytics broken down by schema and provider — see which schemas are performing best and where failures are happening.',
    inputSchema: {
      type: 'object',
      properties: {
        days: { type: 'number', description: 'Number of days to look back (default: 7)', default: 7 },
      },
    },
    handler: async (client: ReliantClient, args: any) => {
      const days = args.days || 7
      const data = await client.get(`/analytics/summary?days=${days}`)

      const lines = [`**Analytics — last ${days} days**`, '']

      if (data.by_schema?.length) {
        lines.push('**By schema:**')
        for (const s of data.by_schema.slice(0, 10)) {
          lines.push(`- **${s.schema_id}**: ${s.total} executions | ${s.success_rate?.toFixed(1)}% success | ${s.avg_latency_ms}ms avg`)
        }
        lines.push('')
      }

      if (data.by_provider?.length) {
        lines.push('**By provider:**')
        for (const p of data.by_provider) {
          lines.push(`- **${p.provider}**: ${p.total} executions | ${p.success_rate?.toFixed(1)}% success`)
        }
      }

      return lines.join('\n')
    },
  },

  {
    name: 'reliant_health_check',
    description: 'Quick health check of your entire Reliant setup — API status, schema count, recent execution success rate, and any active SLA breaches.',
    inputSchema: { type: 'object', properties: {} },
    handler: async (client: ReliantClient, _args: any) => {
      const results = await Promise.allSettled([
        client.get('/health'),
        client.get('/schemas'),
        client.get('/metrics/summary?days=1'),
        client.get('/sla'),
      ])

      const health = results[0].status === 'fulfilled' ? results[0].value : null
      const schemas = results[1].status === 'fulfilled' ? results[1].value : null
      const metrics = results[2].status === 'fulfilled' ? results[2].value : null
      const slas = results[3].status === 'fulfilled' ? results[3].value : null

      const slaBreaches = (slas?.slas || []).filter((s: any) => s.sla_status === 'breached')

      const lines = [
        `🛡️ **Reliant Health Check**`,
        ``,
        `**API:** ${health ? '✅ Online' : '❌ Offline'}`,
        `**Schemas:** ${schemas?.schemas?.length ?? 0}`,
        `**Today's executions:** ${metrics?.total_executions ?? 0}`,
        `**Today's success rate:** ${metrics?.success_rate ?? '—'}%`,
        `**SLA breaches:** ${slaBreaches.length > 0 ? `🚨 ${slaBreaches.length} breach(es): ${slaBreaches.map((s: any) => s.schema_id).join(', ')}` : '✅ None'}`,
      ]

      return lines.join('\n')
    },
  },
]
