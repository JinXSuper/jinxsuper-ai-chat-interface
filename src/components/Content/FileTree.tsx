'use client';

import * as React from 'react';
import { Folder, FolderOpen, FileCode, FileJson, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FileNode } from '@/types/message';

interface FileTreeProps {
  root: FileNode;
  className?: string;
}

export function FileTree({ root, className }: FileTreeProps) {
  return (
    <div className={cn("w-full bg-[#0d0d0d] p-4 rounded-3xl border border-border/40 shadow-xl animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-500 ease-out fill-mode-both delay-75", className)}>
      <div className="flex items-center gap-2 mb-6 px-2">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Folder className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight">Project Structure</span>
          <span className="text-[9px] text-muted-foreground/60 uppercase tracking-widest font-bold">Files & Directories</span>
        </div>
      </div>
      
      <div className="space-y-0.5">
        <TreeNode node={root} depth={0} />
      </div>
    </div>
  );
}

function TreeNode({ node, depth }: { node: FileNode; depth: number }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const isFolder = node.type === 'folder';

  const toggle = () => {
    if (isFolder) setIsOpen(!isOpen);
  };

  const getIcon = () => {
    if (isFolder) {
      return isOpen ? <FolderOpen className="h-4 w-4 text-primary/80" /> : <Folder className="h-4 w-4 text-primary/60" />;
    }
    
    // File icons based on extension/language
    const name = node.name.toLowerCase();
    if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('.js') || name.endsWith('.jsx')) {
      return <FileCode className="h-4 w-4 text-blue-400/80" />;
    }
    if (name.endsWith('.json')) {
      return <FileJson className="h-4 w-4 text-amber-400/80" />;
    }
    return <FileText className="h-4 w-4 text-muted-foreground/60" />;
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={toggle}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all hover:bg-white/5 group animate-in fade-in slide-in-from-left-2 duration-300 fill-mode-both",
          depth === 0 && "font-bold text-foreground"
        )}
        style={{ paddingLeft: `${depth * 1.2 + 0.5}rem`, animationDelay: `${depth * 50 + 50}ms` }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {isFolder && (
            <div className="text-muted-foreground/40 group-hover:text-primary transition-colors">
              {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </div>
          )}
          {!isFolder && <div className="w-3" />}
          {getIcon()}
          <span className={cn(
            "text-[13px] truncate tracking-tight transition-colors",
            isFolder ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {node.name}
          </span>
        </div>
      </div>
      
      {isFolder && node.children && (
        <div 
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden flex flex-col">
            {node.children.map((child, idx) => (
              <TreeNode key={`${child.name}-${idx}`} node={child} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
