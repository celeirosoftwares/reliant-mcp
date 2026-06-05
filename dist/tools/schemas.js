"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaTools = void 0;
exports.schemaTools = [
    {
        name: 'reliant_list_schemas',
        description: 'List all schemas in your Reliant project. Shows schema names, versions, and fallback providers.',
        inputSchema: { type: 'object', properties: {} },
        handler: async (client, _args) => {
            const data = await client.get('/schemas');
            const schemas = data.schemas || [];
            if (schemas.length === 0)
                return 'No schemas found. Create your first schema with reliant_create_schema.';
            const lines = schemas.map((s) => `- **${s.name}** (ID: \`${s.id}\`) | v${s.version} | fallbacks: ${s.fallbackProviders?.join(', ') || 'none'}`);
            return `**Schemas (${schemas.length}):**\n\n${lines.join('\n')}`;
        },
    },
    {
        name: 'reliant_create_schema',
        description: 'Create a new schema in Reliant. Describe the structure of data you want to extract and Reliant will set it up. Use this to create new output contracts for your AI pipelines.',
        inputSchema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Schema name (e.g. "invoice-extraction", "lead-scoring")' },
                description: { type: 'string', description: 'What this schema extracts or generates' },
                fields: {
                    type: 'array',
                    description: 'List of fields the schema should have',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            type: { type: 'string', enum: ['string', 'number', 'boolean', 'array', 'object'] },
                            description: { type: 'string' },
                            required: { type: 'boolean', default: true },
                        },
                        required: ['name', 'type'],
                    },
                },
                system_prompt: { type: 'string', description: 'Custom system prompt for this schema (optional)' },
                fallback_providers: {
                    type: 'array',
                    items: { type: 'string', enum: ['anthropic', 'openai', 'gemini', 'groq', 'mistral'] },
                    description: 'Fallback providers if primary fails (optional)',
                },
            },
            required: ['name', 'fields'],
        },
        handler: async (client, args) => {
            // Build JSON schema from fields
            const properties = {};
            const required = [];
            for (const field of args.fields) {
                properties[field.name] = {
                    type: field.type,
                    description: field.description || field.name,
                };
                if (field.required !== false)
                    required.push(field.name);
            }
            const definition = {
                type: 'object',
                properties,
                required,
                additionalProperties: false,
            };
            const data = await client.post('/schemas', {
                name: args.name,
                definition,
                systemPrompt: args.system_prompt || null,
                fallbackProviders: args.fallback_providers || [],
                safeFallback: Object.fromEntries(args.fields.map((f) => [f.name, null])),
            });
            return [
                `✅ **Schema created successfully!**`,
                ``,
                `**Name:** ${data.name}`,
                `**ID:** \`${data.id}\``,
                `**Version:** ${data.version}`,
                `**Fields:** ${Object.keys(definition.properties).join(', ')}`,
                ``,
                `Use this schema ID in your executions: \`${data.id}\``,
            ].join('\n');
        },
    },
    {
        name: 'reliant_get_schema',
        description: 'Get details of a specific schema including its JSON definition, version history, and configuration.',
        inputSchema: {
            type: 'object',
            properties: {
                schema_id: { type: 'string', description: 'The schema ID to retrieve' },
            },
            required: ['schema_id'],
        },
        handler: async (client, args) => {
            const data = await client.get(`/schemas/${args.schema_id}`);
            return [
                `**Schema: ${data.name}**`,
                `**ID:** \`${data.id}\``,
                `**Version:** ${data.version}`,
                `**Fallbacks:** ${data.fallbackProviders?.join(', ') || 'none'}`,
                `**Quality criteria:** ${data.qualityCriteria || 'not set'}`,
                ``,
                `**Definition:**`,
                '```json',
                JSON.stringify(data.definition, null, 2),
                '```',
            ].join('\n');
        },
    },
];
//# sourceMappingURL=schemas.js.map