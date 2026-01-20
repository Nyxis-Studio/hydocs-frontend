'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SidebarItem } from './sidebar';
import type { FileNode } from '@/lib/docs';
import { SearchDialog } from './search-dialog';
import { ModeToggle } from '@/components/mode-toggle';

interface MobileNavProps {
    tree: FileNode[];
}

export function MobileNav({ tree }: MobileNavProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <header className="flex md:hidden items-center border-b p-4 bg-background h-14 bg-white/50 backdrop-blur sticky top-0 z-40 w-full justify-between">
            <div className="flex items-center">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-4">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle className="mb-2 text-left">Hytale Docs</SheetTitle>
                            <SearchDialog tree={tree} />
                        </SheetHeader>
                        <div className="flex-1 overflow-y-auto p-2">
                            <div onClick={() => setOpen(false)}>
                                {tree.map(node => <SidebarItem key={node.path} node={node} />)}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="font-semibold">Hytale Docs</div>
            </div>
            <ModeToggle />
        </header>
    );
}
