export type ConfigPlatformType = 'agent' | 'cli';

export interface ConfigPlatform {
    id: string;
    name: string;
    type: ConfigPlatformType;
}

export interface ConfigSnippet {
    platformId: string;
    language: 'json' | 'yaml' | 'text';
    code: string;
    description: string;
}

export const MCP_PLATFORMS: ConfigPlatform[] = [
    { id: 'claude-desktop', name: 'Claude (Connectors)', type: 'agent' },
    { id: 'cursor', name: 'Cursor', type: 'cli' },
    { id: 'vscode', name: 'VS Code', type: 'cli' },
    { id: 'zed', name: 'Zed', type: 'cli' }
];

export const MCP_SNIPPETS: ConfigSnippet[] = [
    {
        platformId: 'claude-desktop',
        language: 'text',
        code: `https://hydocs-mcp.nyxis.com.br`,
        description: 'Claude Web: Settings → Connectors → Add custom connector'
    },
    {
        platformId: 'cursor',
        language: 'json',
        code: `{
  "mcpServers": {
    "hydocs": {
      "url": "https://hydocs-mcp.nyxis.com.br"
    }
  }
}`,
        description: 'Add this to ~/.cursor/mcp.json or .cursor/mcp.json'
    },
    {
        platformId: 'vscode',
        language: 'json',
        code: `{
  "servers": {
    "hydocs": {
      "type": "http",
      "url": "https://hydocs-mcp.nyxis.com.br"
    }
  }
}`,
        description: 'Add this to .vscode/mcp.json or user mcp.json'
    },
    {
        platformId: 'zed',
        language: 'json',
        code: `{
  "context_servers": {
    "hydocs": {
      "url": "https://hydocs-mcp.nyxis.com.br"
    }
  }
}`,
        description: 'Add this to your settings.json'
    }
];
