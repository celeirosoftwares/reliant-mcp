#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js'
import { tools } from './tools/index.js'
import { ReliantClient } from './client.js'

const RELIANT_API_KEY = process.env.RELIANT_API_KEY
const RELIANT_API_URL = process.env.RELIANT_API_URL || 'https://reliant-production.up.railway.app'
const RELIANT_USER_ID = process.env.RELIANT_USER_ID || ''

if (!RELIANT_API_KEY) {
  console.error('❌ RELIANT_API_KEY environment variable is required')
  process.exit(1)
}

const client = new ReliantClient(RELIANT_API_KEY, RELIANT_API_URL, RELIANT_USER_ID)

const server = new Server(
  {
    name: 'reliant-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// List all available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }
})

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  const tool = tools.find(t => t.name === name)
  if (!tool) {
    throw new McpError(ErrorCode.MethodNotFound, `Tool not found: ${name}`)
  }

  try {
    const result = await tool.handler(client, args || {})
    return {
      content: [
        {
          type: 'text',
          text: typeof result === 'string' ? result : JSON.stringify(result, null, 2),
        },
      ],
    }
  } catch (error: any) {
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error.message}`
    )
  }
})

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('✅ Reliant MCP server running')
  console.error(`   API: ${RELIANT_API_URL}`)
  console.error(`   User: ${RELIANT_USER_ID || '(not set)'}`)
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
