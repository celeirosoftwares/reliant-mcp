# Reliant MCP

Control your Reliant AI reliability layer by voice or chat — directly from Claude Desktop, Claude Code, or any MCP-compatible client.

## What it does

Once installed, you can talk to Claude and say things like:

- *"Check the health of my Reliant project"*
- *"Create a guard for my WhatsApp bot that can only talk about our products, and limits each user to 50 messages per day"*
- *"Run this invoice text through my extraction schema"*
- *"What's the SLA status of my invoice-extraction schema?"*
- *"Show me the last 20 executions that failed"*
- *"Create a business contract that ensures the extracted amount is always positive"*

## Installation

### 1. Install the package

```bash
npm install -g reliant-mcp
```

### 2. Configure Claude Desktop

Open your Claude Desktop config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add the Reliant MCP server:

```json
{
  "mcpServers": {
    "reliant": {
      "command": "reliant-mcp",
      "env": {
        "RELIANT_API_KEY": "rel_your_api_key_here",
        "RELIANT_API_URL": "https://reliant-production.up.railway.app",
        "RELIANT_USER_ID": "your-supabase-user-id"
      }
    }
  }
}
```

### 3. Get your credentials

- **RELIANT_API_KEY** — Dashboard → Settings → API Key
- **RELIANT_API_URL** — Dashboard → Settings → API URL  
- **RELIANT_USER_ID** — Dashboard → Settings → User ID

### 4. Restart Claude Desktop

The Reliant tools will appear automatically.

---

## Available tools

| Tool | Description |
|------|-------------|
| `reliant_health_check` | Quick health check of your entire setup |
| `reliant_metrics` | Summary metrics — executions, success rate, latency |
| `reliant_analytics` | Analytics by schema and provider |
| `reliant_execute` | Run a prompt through a schema |
| `reliant_list_executions` | List recent executions |
| `reliant_inspect_execution` | Inspect a specific execution in detail |
| `reliant_list_schemas` | List all schemas |
| `reliant_create_schema` | Create a new schema by describing its fields |
| `reliant_get_schema` | Get schema definition and config |
| `reliant_guard_chat` | Send a message through a Guard |
| `reliant_list_guards` | List all Guard configs |
| `reliant_create_guard` | Create a Guard by describing its rules |
| `reliant_guard_usage` | Check Guard usage stats |
| `reliant_audit_recent` | Recent events from the Audit Trail |
| `reliant_inspect_execution` | Inspect a specific execution |
| `reliant_sla_status` | Check SLA status of a schema |
| `reliant_sla_configure` | Set up SLA targets for a schema |
| `reliant_sla_list` | List all SLAs |
| `reliant_create_contract` | Create a Business Contract |

---

## Example conversations

### Health check
> *"How is my Reliant setup doing?"*

Claude will call `reliant_health_check` and show API status, schema count, today's success rate, and any SLA breaches.

### Create a guard
> *"Create a guard for my customer support bot. It should only talk about our products, never mention competitors, and always be professional. Limit each user to 100 messages per day."*

Claude will call `reliant_create_guard` with the appropriate config and return the guard ID.

### Check SLA
> *"Check the SLA for my invoice extraction schema"*

Claude will call `reliant_sla_status` and show current success rate, latency, and whether targets are being met.

### Run an extraction
> *"Extract the invoice data from this text: 'Invoice #4521, amount $12,500, client: Acme Corp, due date: 2026-06-15' using my invoice-extraction schema"*

Claude will call `reliant_execute` and return the structured JSON output.

---

## Use with Claude Code

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "reliant": {
      "command": "reliant-mcp",
      "env": {
        "RELIANT_API_KEY": "rel_...",
        "RELIANT_USER_ID": "..."
      }
    }
  }
}
```

---

## License

MIT — Celeiro Softwares · reliant.ia.br
