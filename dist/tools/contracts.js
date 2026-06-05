"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractTools = void 0;
exports.contractTools = [
    {
        name: 'reliant_list_contracts',
        description: 'List all Business Contracts in your project — rules that AI outputs must satisfy beyond JSON schema.',
        inputSchema: { type: 'object', properties: {} },
        handler: async (client, _args) => {
            // Contracts are stored in Supabase, fetch via a workaround using the execute endpoint
            return 'Business Contracts are managed in the Reliant dashboard at reliant.ia.br/dashboard/contracts. Use reliant_create_contract to create a new one via this MCP.';
        },
    },
    {
        name: 'reliant_create_contract',
        description: 'Create a Business Contract for a schema — define rules that the AI output must satisfy. Simple rules (field ranges, enums) run instantly. Semantic rules use Claude as a judge.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Contract name (e.g. "Invoice Quality Gate")' },
                schema_id: { type: 'string', description: 'The schema ID this contract applies to' },
                on_violation: {
                    type: 'string',
                    enum: ['flag', 'block'],
                    description: 'flag = return output + violations list. block = return safe_fallback.',
                    default: 'flag',
                },
                rules: {
                    type: 'array',
                    description: 'Simple field-level rules',
                    items: {
                        type: 'object',
                        properties: {
                            field: { type: 'string', description: 'Field path (dot notation: amount, address.city)' },
                            op: {
                                type: 'string',
                                enum: ['not_null', 'not_empty', 'eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'in', 'not_in', 'matches'],
                                description: 'Operator',
                            },
                            value: { description: 'Comparison value (not needed for not_null/not_empty)' },
                            message: { type: 'string', description: 'Custom error message (optional)' },
                        },
                        required: ['field', 'op'],
                    },
                },
                semantic_rules: {
                    type: 'array',
                    description: 'Plain English rules evaluated by Claude Haiku',
                    items: {
                        type: 'object',
                        properties: {
                            description: { type: 'string', description: 'The rule in plain English' },
                            weight: {
                                type: 'string',
                                enum: ['required', 'important', 'preferred'],
                                description: 'required = fails contract, important = flags only, preferred = logged only',
                                default: 'required',
                            },
                        },
                        required: ['description'],
                    },
                },
            },
            required: ['name', 'schema_id'],
        },
        handler: async (client, args) => {
            // Contracts are managed via Supabase directly
            const supabaseUrl = process.env.SUPABASE_URL;
            const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
            if (!supabaseUrl || !supabaseKey) {
                return [
                    `⚠️ **Direct contract creation requires SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.**`,
                    ``,
                    `You can create contracts in the dashboard: reliant.ia.br/dashboard/contracts`,
                    ``,
                    `Or add these env vars to your MCP config:`,
                    `- SUPABASE_URL`,
                    `- SUPABASE_SERVICE_KEY`,
                ].join('\n');
            }
            const res = await fetch(`${supabaseUrl}/rest/v1/business_contracts`, {
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation',
                },
                body: JSON.stringify({
                    name: args.name,
                    schema_id: args.schema_id,
                    user_id: client.userId,
                    rules: args.rules || [],
                    semantic_rules: args.semantic_rules || [],
                    on_violation: args.on_violation || 'flag',
                    is_active: true,
                }),
            });
            const data = await res.json();
            const contract = Array.isArray(data) ? data[0] : data;
            return [
                `✅ **Business Contract created!**`,
                ``,
                `**Name:** ${contract.name}`,
                `**ID:** \`${contract.id}\``,
                `**Schema:** ${contract.schema_id}`,
                `**On violation:** ${contract.on_violation}`,
                `**Simple rules:** ${(args.rules || []).length}`,
                `**Semantic rules:** ${(args.semantic_rules || []).length}`,
                ``,
                `Pass this contract ID in /execute calls: \`${contract.id}\``,
            ].join('\n');
        },
    },
];
//# sourceMappingURL=contracts.js.map