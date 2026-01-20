'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MCP_PLATFORMS, MCP_SNIPPETS } from '@/lib/mcp-data';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from './copy-button';

export function ConfigViewer() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Configuration Generator</CardTitle>
                <CardDescription>Select your platform to generate the configuration.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="claude-desktop" className="w-full">
                    <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-1 mb-4 w-full justify-start">
                        {MCP_PLATFORMS.map((platform) => (
                            <TabsTrigger
                                key={platform.id}
                                value={platform.id}
                                className="flex-1 min-w-[120px]"
                            >
                                {platform.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {MCP_SNIPPETS.map((snippet) => (
                        <TabsContent key={snippet.platformId} value={snippet.platformId} className="space-y-4">
                            <div className="text-sm text-muted-foreground">
                                {snippet.description}
                            </div>
                            <div className="relative group">
                                <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <CopyButton text={snippet.code} />
                                </div>
                                <pre className="p-4 rounded-lg bg-slate-950 text-slate-50 overflow-x-auto text-sm font-mono leading-relaxed">
                                    <code>{snippet.code}</code>
                                </pre>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}
