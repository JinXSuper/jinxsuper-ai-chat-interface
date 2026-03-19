'use client';

import * as React from 'react';
import {
  Home,
  LayoutGrid,
  Menu,
  Palette,
  FileCode,
  Search,
  ChevronDown,
  CircleDashed,
  MoreHorizontal,
  LogOut,
  Hexagon,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Conversation } from '@/types/chat';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  activeView?: 'chat' | 'design-system' | 'projects' | 'templates';
  onViewChange?: (view: 'chat' | 'design-system' | 'projects' | 'templates') => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  activeView = 'chat',
  onViewChange = () => {},
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentConversations = filteredConversations.filter((c) => !c.pinned);

  return (
    <div className="flex h-full w-full flex-col bg-transparent text-white border-r border-white/5 font-sans selection:bg-white/10 overflow-hidden specular-shine">
      
      {/* Workspace Header */}
      <div className="flex h-14 items-center justify-between px-4 animate-in fade-in slide-in-from-top-4 duration-500 fill-mode-both">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-white/5 p-1.5 rounded-lg transition-colors outline-none cursor-pointer group">
            <div className="flex items-center justify-center">
               <Hexagon className="h-4 w-4 fill-white text-white group-hover:scale-105 transition-transform" />
            </div>
            <span className="text-sm font-semibold tracking-tight">JinXSuper</span>
            <span className="text-white/30 text-xs px-1">/</span>
            <div className="flex items-center gap-1.5 focus:outline-none">
              <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300" />
              <span className="text-sm text-white/80">Personal</span>
              <ChevronDown className="h-3 w-3 text-white/40" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass bg-[#0a0a0a] border-white/10" align="start">
            <DropdownMenuItem className="text-xs cursor-pointer focus:bg-white/10">Team Workspace</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-xs cursor-pointer focus:bg-white/10">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-xs cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500">
              <LogOut className="h-3 w-3 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* New Chat Button */}
      <div className="px-3 py-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-75 fill-mode-both">
        <Button
          onClick={() => {
            onViewChange('chat');
            onNewChat();
          }}
          variant="ghost"
          className="w-full justify-between h-8 px-3 text-xs font-medium bg-white/5 hover:bg-white/10 text-white transition-colors rounded-md"
        >
          <div className="flex items-center gap-2">
            <Plus className="h-3.5 w-3.5" />
            <span>New Chat</span>
          </div>
          <kbd className="hidden sm:inline-flex h-4 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[9px] font-medium text-white/40">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both text-white/100">
        <div className="relative group">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40 group-focus-within:text-white/80 transition-colors" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full bg-transparent pl-8 border-none focus-visible:ring-0 placeholder:text-white/30 text-xs text-white"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
          {/* Main Nav */}
          <div className="space-y-0.5 mb-6">
            <NavButton 
              icon={<Home className="h-3.5 w-3.5" />} 
              label="Home" 
              active={activeView === 'chat' && !currentConversationId} 
              onClick={() => {
                onViewChange('chat');
                onNewChat();
              }}
            />
            <NavButton 
              icon={<LayoutGrid className="h-3.5 w-3.5" />} 
              label="Projects" 
              active={activeView === 'projects'}
              onClick={() => onViewChange('projects')}
            />
            <NavButton 
              icon={<Palette className="h-3.5 w-3.5" />} 
              label="Design System" 
              active={activeView === 'design-system'}
              onClick={() => onViewChange('design-system')}
            />
            <NavButton 
              icon={<FileCode className="h-3.5 w-3.5" />} 
              label="Templates" 
              active={activeView === 'templates'}
              onClick={() => onViewChange('templates')}
            />
          </div>

          {/* Favorites */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 py-1.5 group cursor-pointer hover:bg-white/5 rounded-md transition-colors luminous-hover">
              <span className="text-[11px] font-medium text-white/50 underline underline-offset-4 decoration-white/10">Favorites</span>
              <ChevronRight className="h-3 w-3 text-white/30 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Recent Chats */}
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 py-1.5 group cursor-pointer hover:bg-white/5 rounded-md transition-colors mb-1">
              <span className="text-[11px] font-medium text-white/50">Recent Chats</span>
              <ChevronDown className="h-3 w-3 text-white/30" />
            </div>
          <div className="space-y-0.5">
            {recentConversations.map((conv) => (
              <HistoryItem
                key={conv.id}
                conversation={conv}
                active={currentConversationId === conv.id && activeView === 'chat'}
                onSelect={() => {
                  onViewChange('chat');
                  onSelectConversation(conv.id);
                }}
                onDelete={() => onDeleteConversation(conv.id)}
              />
            ))}
          </div>
        </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function NavButton({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'w-full justify-start gap-2.5 h-8 px-2 text-[13px] font-medium transition-colors rounded-md group',
        active 
          ? 'bg-white/10 text-white specular-shine' 
          : 'text-white/60 hover:bg-white/5 hover:text-white luminous-hover'
      )}
    >
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
        className: cn('h-4 w-4 stroke-[1.5] transition-transform group-hover:scale-110', active ? 'text-primary' : '') 
      })}
      <span>{label}</span>
      {active && <div className="ml-auto w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]" />}
    </Button>
  );
}

function HistoryItem({
  conversation,
  active,
  onSelect,
  onDelete,
}: {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-left transition-colors',
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0 pr-2">
        <CircleDashed className={cn("h-3.5 w-3.5 shrink-0 transition-colors stroke-[1.5]", active ? "text-primary" : "text-white/30 group-hover:text-white/60")} />
        <span className="truncate text-[13px] leading-tight font-medium select-none">{conversation.title}</span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
          <MoreHorizontal className="h-3.5 w-3.5 text-white/60" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass bg-[#0a0a0a] border-white/10 min-w-[120px]" align="end">
          <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-500 focus:bg-red-500/10 focus:text-red-500 gap-2 cursor-pointer text-xs"
          >
            Delete Chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
