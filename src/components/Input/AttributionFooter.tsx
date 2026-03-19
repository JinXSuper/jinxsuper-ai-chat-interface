'use client';

import * as React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { config } from '@/utils/config';

export function AttributionFooter() {
  return (
    <div className="flex flex-col items-center justify-center py-4 gap-2 text-[10px] md:text-xs">
      <div className="flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-muted-foreground duration-300">
        <span>Built with</span>
        <Heart className="h-3 w-3 text-primary animate-pulse-subtle" />
        <span>By</span>
        <a 
          href={config.CREATOR_WEBSITE} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1 group"
        >
          {config.CREATOR_NAME}
          <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" />
        </a>
      </div>
      <p className="text-[10px] text-muted-foreground/40 text-center max-w-[400px]">
        This is an open-source project focused on UI/UX demonstration with mock data. 
        No sensitive information is sent to any server.
      </p>
    </div>
  );
}
