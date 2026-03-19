'use client';

import * as React from 'react';
import { RefreshCcw, ExternalLink, Monitor, Smartphone, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SandboxPreviewProps {
  code: string;
}

export function SandboxPreview({ code }: SandboxPreviewProps) {
  const [key, setKey] = React.useState(0);
  const [view, setView] = React.useState<'desktop'|'mobile'>('desktop');

  const refresh = () => setKey(k => k + 1);

  // Wrap HTML with basic styling if it's just a snippet. 
  // If it's full HTML, just use it.
  const fullHtml = code.toLowerCase().includes('<html') ? code : `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem; color: #111; background: #fff; }
        </style>
      </head>
      <body>
        ${code}
      </body>
    </html>
  `;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-xl my-4 animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[11px] font-medium text-white/50 flex items-center gap-1.5 uppercase tracking-wider">
            <Terminal className="h-3 w-3" />
            Live Preview
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <div className="mr-3 flex items-center bg-white/5 rounded-md p-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('desktop')}
              className={cn("h-6 w-6 rounded-sm transition-colors", view === 'desktop' ? "bg-white/10 text-white" : "text-white/40 hover:text-white")}
            >
              <Monitor className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('mobile')}
              className={cn("h-6 w-6 rounded-sm transition-colors", view === 'mobile' ? "bg-white/10 text-white" : "text-white/40 hover:text-white")}
            >
              <Smartphone className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={refresh}
            className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10 transition-colors rounded-md"
          >
            <RefreshCcw className="h-3.5 w-3.5 stroke-[1.5]" />
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
      
      {/* Iframe Container */}
      <div className={cn(
        "bg-white transition-all duration-300 ease-in-out mx-auto",
        view === 'desktop' ? "w-full aspect-video" : "w-[375px] h-[667px] border-x border-b border-white/20 shadow-2xl"
      )}>
        <iframe
          key={key}
          srcDoc={fullHtml}
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts allow-modals"
          title="Sandbox Preview"
        />
      </div>
    </div>
  );
}
