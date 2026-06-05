#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const index_js_2 = require("./tools/index.js");
const client_js_1 = require("./client.js");
const RELIANT_API_KEY = process.env.RELIANT_API_KEY;
const RELIANT_API_URL = process.env.RELIANT_API_URL || 'https://reliant-production.up.railway.app';
const RELIANT_USER_ID = process.env.RELIANT_USER_ID || '';
if (!RELIANT_API_KEY) {
    console.error('❌ RELIANT_API_KEY environment variable is required');
    process.exit(1);
}
const client = new client_js_1.ReliantClient(RELIANT_API_KEY, RELIANT_API_URL, RELIANT_USER_ID);
const server = new index_js_1.Server({
    name: 'reliant-mcp',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
    },
});
// List all available tools
server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
    return {
        tools: index_js_2.tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
        })),
    };
});
// Handle tool calls
server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const tool = index_js_2.tools.find(t => t.name === name);
    if (!tool) {
        throw new types_js_1.McpError(types_js_1.ErrorCode.MethodNotFound, `Tool not found: ${name}`);
    }
    try {
        const result = await tool.handler(client, args || {});
        return {
            content: [
                {
                    type: 'text',
                    text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
                },
            ],
        };
    }
    catch (error) {
        throw new types_js_1.McpError(types_js_1.ErrorCode.InternalError, `Tool execution failed: ${error.message}`);
    }
});
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error('✅ Reliant MCP server running');
    console.error(`   API: ${RELIANT_API_URL}`);
    console.error(`   User: ${RELIANT_USER_ID || '(not set)'}`);
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map