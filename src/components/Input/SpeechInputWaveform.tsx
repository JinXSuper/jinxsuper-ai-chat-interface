'use client';

import * as React from 'react';

export function SpeechInputWaveform({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="flex items-center gap-0.5 h-4 transition-all duration-500 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="w-1 bg-primary rounded-full animate-bounce"
          style={{ 
            height: '100%',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
}
