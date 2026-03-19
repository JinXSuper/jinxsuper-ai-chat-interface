'use client';

import * as React from 'react';
import { ZoomIn, Maximize2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageRendererProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
}

export function ImageRenderer({ src, alt = 'Uploaded Image', caption, className }: ImageRendererProps) {
  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false);

  return (
    <>
      <div className={cn("group relative w-fit max-w-full overflow-hidden rounded-2xl border border-white/5 bg-black/10 backdrop-blur-md shadow-2xl transition-all hover:border-white/10", className)}>
        <img 
          src={src} 
          alt={alt} 
          className="max-h-[400px] w-auto object-cover transition-transform duration-500 group-hover:scale-[1.02] cursor-zoom-in"
          onClick={() => setIsOverlayOpen(true)}
        />
        
        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-lg bg-black/40 backdrop-blur-md hover:bg-black/60 text-white"
            onClick={() => setIsOverlayOpen(true)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-lg bg-black/40 backdrop-blur-md hover:bg-black/60 text-white"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Caption */}
        {caption && (
          <div className="bg-black/40 backdrop-blur-xl border-t border-white/5 p-3">
            <p className="text-[12px] text-white/60 text-center font-medium">{caption}</p>
          </div>
        )}
      </div>

      {/* Full Screen Overlay */}
      {isOverlayOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 text-white hover:rotate-90 transition-all duration-300"
            onClick={() => setIsOverlayOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img 
            src={src} 
            alt={alt} 
            className="max-w-[90vw] max-h-[85vh] object-contain shadow-[0_0_80px_rgba(139,92,246,0.15)] animate-in zoom-in-95 duration-500" 
          />
          {caption && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl">
              <p className="text-white text-sm font-medium">{caption}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
