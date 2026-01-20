'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, Calendar, CreditCard, Settings, Smile, User, FileText, Search } from 'lucide-react';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import type { FileNode } from '@/lib/docs';

interface SearchDialogProps {
    tree: FileNode[];
}

export function SearchDialog({ tree }: SearchDialogProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const flatFiles = React.useMemo(() => {
        const files: { name: string; path: string; title: string }[] = [];
        const traverse = (nodes: FileNode[]) => {
            nodes.forEach((node) => {
                if (node.type === 'file') {
                    // Ensure path starts with /
                    const safePath = node.path.startsWith('/') ? node.path : '/' + node.path;
                    const cleanPath = safePath.replace(/\.md$/, '');
                    files.push({
                        name: node.name,
                        path: cleanPath,
                        title: node.metadata?.title || node.name
                    });
                }
                if (node.children) traverse(node.children);
            });
        };
        traverse(tree);
        return files;
    }, [tree]);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center w-full px-4 py-2 text-sm text-muted-foreground border rounded-md hover:bg-muted/50 transition-colors"
            >
                <Search className="w-4 h-4 mr-2" />
                <span>Search documentation...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Files">
                        {flatFiles.map((file) => (
                            <CommandItem
                                key={file.path}
                                value={`${file.title} ${file.name}`} // Allow searching by title or filename
                                onSelect={() => {
                                    runCommand(() => router.push(file.path));
                                }}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>{file.title}</span>
                                {file.title !== file.name && <span className="ml-2 text-muted-foreground text-xs">({file.name})</span>}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
