'use client';

import * as React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism-tomorrow.css';
import { Copy, Check, Terminal, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const isCollapsible = code.split('\n').length > 15;

  React.useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-300 shadow-sm animate-in fade-in slide-in-from-bottom-2 zoom-in-[0.98] duration-500 ease-out fill-mode-both delay-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-[11px] font-medium text-white/50 flex items-center gap-1.5">
            <Terminal className="h-3 w-3" />
            {language}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10 transition-colors rounded-md"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 stroke-[1.5]" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10 transition-colors rounded-md"
          >
            <ExternalLink className="h-3.5 w-3.5 stroke-[1.5]" />
          </Button>
        </div>
      </div>
      
      {/* Body */}
      <div className={cn(
        "relative transition-all duration-500 ease-in-out",
        isCollapsible && !expanded ? "max-h-[300px]" : "max-h-none"
      )}>
        <pre className={cn(
          `language-${language} !bg-transparent !m-0 !p-4 !font-mono text-[13px] leading-relaxed selection:bg-white/20`,
          "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
        )}>
          <code>{code}</code>
        </pre>
        
        {isCollapsible && !expanded && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent flex items-end justify-center pb-2 pointer-events-none">
             <div className="pointer-events-auto">
               <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setExpanded(true)}
                className="h-8 px-4 bg-[#0a0a0a]/90 backdrop-blur-md border-white/10 rounded-full text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/10"
               >
                 <ChevronDown className="h-3 w-3 mr-1.5 stroke-[1.5]" />
                 Show more lines
               </Button>
             </div>
          </div>
        )}
      </div>

       {isCollapsible && expanded && (
          <div className="flex justify-center py-2 border-t border-border/10 bg-muted/5">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-7 px-4 rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary"
            >
              <ChevronUp className="h-3 w-3 mr-1.5" />
              Collapse code
            </Button>
          </div>
       )}
    </div>
  );
}
