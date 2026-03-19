'use client';

import { Menu, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({
  sidebarOpen,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between bg-transparent px-4">
      <div className="flex items-center gap-3">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="hover:bg-white/10 text-white/70 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {/* Mobile-only trigger that shows even if sidebarOpen is true in some states, 
            but for consistency with the desktop logic, let's just make it one button.
            The user said "2 tombol uncollapse", which means when it is CLOSED, 2 show up. */}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs font-medium bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-white transition-colors"
        >
          <Share className="h-3 w-3 mr-2" />
          Share
        </Button>
      </div>
    </header>
  );
}
