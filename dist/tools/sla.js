"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slaTools = void 0;
exports.slaTools = [
    {
        name: 'reliant_sla_status',
        description: 'Check the current SLA status of a schema — success rate, latency, and whether targets are being met. Use this to monitor your AI pipeline health.',
        inputSchema: {
            type: 'object',
            properties: {
                schema_id: { type: 'string', description: 'The schema ID to check SLA for' },
            },
            required: ['schema_id'],
        },
        handler: async (client, args) => {
            const result = await client.get(`/sla/${args.schema_id}/evaluate?user_id=${client.userId}`);
            const statusIcon = result.status === 'healthy' ? '✅' : result.status === 'degraded' ? '⚠️' : result.status === 'breached' ? '🚨' : '❓';
            const m = result.metrics;
            const lines = [
                `${statusIcon} **SLA Status: ${result.status?.toUpperCase()}**`,
                `**Schema:** ${result.schema_id}`,
                '',
                m ? [
                    `**Metrics (last window):**`,
                    `- Total executions: ${m.total}`,
                    `- Success rate: ${m.successRate?.toFixed(1)}%`,
                    `- Avg latency: ${m.avgLatency}ms`,
                    `- P95 latency: ${m.p95Latency}ms`,
                ].join('\n') : '_(not enough data)_',
                '',
                result.breaches?.length
                    ? `**⚠️ Breaches detected:**\n${result.breaches.map((b) => `- ${b}`).join('\n')}`
                    : result.status === 'healthy' ? '✅ All targets being met.' : '',
            ].filter(s => s !== undefined && s !== null);
            return lines.join('\n');
        },
    },
    {
        name: 'reliant_sla_configure',
        description: 'Configure a Reliability SLA for a schema — set success rate and latency targets. Reliant will monitor and alert via webhook when breached.',
        inputSchema: {
            type: 'object',
            properties: {
                schema_id: { type: 'string', description: 'The schema ID to configure SLA for' },
                target_success_rate: { type: 'number', description: 'Minimum success rate % (e.g. 99.5)', default: 99 },
                target_latency_p95_ms: { type: 'number', description: 'Maximum P95 latency in milliseconds (optional)' },
                target_latency_avg_ms: { type: 'number', description: 'Maximum average latency in milliseconds (optional)' },
                alert_window_minutes: { type: 'number', description: 'Evaluate SLA over last N minutes (default: 60)', default: 60 },
                min_executions_to_alert: { type: 'number', description: 'Minimum executions needed before alerting (default: 5)', default: 5 },
                alert_webhook_url: { type: 'string', description: 'Webhook URL to notify when SLA is breached (optional)' },
            },
            required: ['schema_id'],
        },
        handler: async (client, args) => {
            const data = await client.post('/sla', {
                schema_id: args.schema_id,
                user_id: client.userId,
                target_success_rate: args.target_success_rate || 99,
                target_latency_p95_ms: args.target_latency_p95_ms || null,
                target_latency_avg_ms: args.target_latency_avg_ms || null,
                alert_window_minutes: args.alert_window_minutes || 60,
                min_executions_to_alert: args.min_executions_to_alert || 5,
                alert_webhook_url: args.alert_webhook_url || null,
            });
            return [
                `✅ **SLA configured successfully!**`,
                ``,
                `**Schema:** ${data.schema_id}`,
                `**Target success rate:** ≥ ${data.target_success_rate}%`,
                data.target_latency_p95_ms ? `**Max P95 latency:** ${data.target_latency_p95_ms}ms` : null,
                data.target_latency_avg_ms ? `**Max avg latency:** ${data.target_latency_avg_ms}ms` : null,
                `**Alert window:** last ${data.alert_window_minutes} minutes`,
                data.alert_webhook_url ? `**Webhook:** ${data.alert_webhook_url}` : null,
                ``,
                `Use reliant_sla_status to check current status anytime.`,
            ].filter(Boolean).join('\n');
        },
    },
    {
        name: 'reliant_sla_list',
        description: 'List all SLA configurations for your project and their current status.',
        inputSchema: { type: 'object', properties: {} },
        handler: async (client, _args) => {
            const data = await client.get('/sla');
            const slas = data.slas || [];
            if (slas.length === 0)
                return 'No SLAs configured. Use reliant_sla_configure to set one up.';
            const statusIcon = (s) => s === 'healthy' ? '✅' : s === 'degraded' ? '⚠️' : s === 'breached' ? '🚨' : '❓';
            const lines = slas.map((s) => `${statusIcon(s.sla_status)} **${s.schema_id}** | target: ${s.target_success_rate}% | current: ${s.current_success_rate?.toFixed(1) ?? '—'}% | ${s.sla_status}`);
            return `**SLA Configurations (${slas.length}):**\n\n${lines.join('\n')}`;
        },
    },
];
//# sourceMappingURL=sla.js.map