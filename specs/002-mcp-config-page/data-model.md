# Data Model: MCP Config

## Entities

### `ConfigPlatform`
Represents the target environment for the configuration.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (e.g., 'claude-desktop') |
| `name` | `string` | Display name (e.g., "Claude Desktop") |
| `type` | `'agent' | 'cli'` | Category of the platform |

### `ConfigSnippet`
Represents the configuration code.

| Field | Type | Description |
|-------|------|-------------|
| `platformId` | `string` | Foreign key to `ConfigPlatform` |
| `language` | `'json' | 'yaml'` | Syntax highlighting language |
| `code` | `string` | The actual configuration content |
| `description` | `string` | Brief explanation of what this config does |
