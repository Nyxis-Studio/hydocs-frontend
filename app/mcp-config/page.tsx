import React from 'react';
import { Metadata } from 'next';
import { ConfigViewer } from '@/components/mcp/config-viewer';

export const metadata: Metadata = {
    title: 'MCP Configuration',
    description: 'Documentation and configuration examples for Model Context Protocol agents.',
};

export default function MCPConfigPage() {
    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl space-y-12">
            <div>
                <h1 className="text-4xl font-bold mb-4">MCP Configuration</h1>
                <p className="text-lg text-muted-foreground">
                    The Model Context Protocol (MCP) standardizes how AI agents interact with external data and tools.
                    Use this guide to configure your environment.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Why use Hydocs MCP?</h2>
                <p className="leading-7">
                    Hydocs MCP connects your AI assistant directly to Hydocs documentation so answers stay grounded in
                    the official source of truth. Instead of pasting links or re-explaining the same context, the model
                    can pull validated docs, examples, and references on demand.
                </p>
                <p className="leading-7">
                    Use it to speed up onboarding, reduce guesswork, and keep guidance consistent across teams. It is
                    especially useful when you want reliable, up-to-date explanations while staying inside your editor
                    or chat client.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">HTTP-only Hydocs MCP</h2>
                <p className="leading-7">
                    Hydocs MCP runs as a hosted server over HTTP. Local MCP execution (for example via npx or stdio)
                    is not supported. All clients should point to the remote server URL below.
                </p>
                <p className="text-sm text-muted-foreground">
                    Claude users should add the server through Connectors instead of editing a local config file.
                </p>
                <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                    https://hydocs-mcp.nyxis.com.br
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Configuration Generator</h2>
                <p className="leading-7">
                    Select your platform below to generate the configuration code needed to connect to the Hydocs MCP server.
                </p>
                <ConfigViewer />
            </section>
        </div>
    );
}
