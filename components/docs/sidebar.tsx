'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown, FileText, Folder, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FileNode } from '@/lib/docs';
import { SearchDialog } from './search-dialog';
import { ModeToggle } from '@/components/mode-toggle';

interface SidebarProps {
    tree: FileNode[];
}

export function Sidebar({ tree }: SidebarProps) {
    const [width, setWidth] = useState(256);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = React.useRef<HTMLElement>(null);
    const pathname = usePathname();

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsResizing(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsResizing(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isResizing) return;

        if (sidebarRef.current) {
            const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
            if (newWidth > 160 && newWidth < 600) {
                setWidth(newWidth);
            }
        }
    };

    return (
        <aside
            ref={sidebarRef}
            className="hidden md:flex flex-col bg-background border-r h-full overflow-hidden shrink-0 relative group"
            style={{ width: `${width}px` }}
        >
            <div className="p-4 border-b">
                <div className="font-bold text-xl mb-4">Hytale Docs</div>
                <SearchDialog tree={tree} />
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
                <Link
                    href="/mcp-config"
                    className={cn(
                        "flex items-center p-2 mb-2 text-sm font-medium rounded-md hover:bg-muted/50",
                        pathname === "/mcp-config" && "bg-muted text-primary"
                    )}
                >
                    <Settings className="w-4 h-4 mr-2" />
                    MCP Config
                </Link>
                <div className="mx-2 mb-2 border-b" />
                {tree.map((node) => (
                    <SidebarItem key={node.path} node={node} />
                ))}
            </nav>
            <div className="p-4 border-t flex justify-end">
                <ModeToggle />
            </div>
            <div
                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors opacity-0 group-hover:opacity-100 z-50"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
            />
        </aside>
    );
}

export function SidebarItem({ node }: { node: FileNode }) {
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();

    // Clean path for comparison (remove .md, ensure leading slash)
    const nodePath = '/' + node.path.replace(/\.md$/, '');
    const isActive = pathname === nodePath;

    if (node.type === 'directory') {
        return (
            <div className="ml-2">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={cn(
                        "flex items-center w-full p-2 text-sm font-medium rounded-md hover:bg-muted/50 text-left"
                    )}
                >
                    {expanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                    <Folder className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="truncate">{node.name}</span>
                </button>
                {expanded && node.children && (
                    <div className="border-l ml-3 pl-1">
                        {node.children.map((child) => (
                            <SidebarItem key={child.path} node={child} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={nodePath}
            className={cn(
                "flex items-center p-2 ml-2 text-sm rounded-md hover:bg-muted/50",
                isActive && "bg-muted font-medium text-primary"
            )}
        >
            <FileText className="w-4 h-4 mr-2 text-gray-500" />
            <span className="truncate">{node.metadata?.title || node.name}</span>
        </Link>
    );
}
