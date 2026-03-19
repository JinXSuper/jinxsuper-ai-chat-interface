'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpeechBlobProps {
  isListening: boolean;
  isResponding: boolean;
  className?: string;
}

export function SpeechBlob({ isListening, isResponding, className }: SpeechBlobProps) {
  if (!isListening && !isResponding) return null;

  return (
    <div className={cn("relative flex items-center justify-center w-24 h-24", className)}>
      {/* Background Glow */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full blur-2xl opacity-40",
          isResponding ? "bg-gradient-to-tr from-purple-500 via-blue-500 to-emerald-400" : "bg-white/20"
        )}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Blob */}
      <motion.div
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl backdrop-blur-3xl",
          isResponding ? "bg-transparent" : "bg-white/5"
        )}
        animate={{
          scale: isListening ? [1, 1.1, 1] : 1,
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          rotate: isResponding ? 360 : 0
        }}
        transition={{
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          borderRadius: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "linear" }
        }}
      >
        {isResponding && (
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/80 via-blue-500/80 to-emerald-400/80 mix-blend-overlay animate-pulse" />
        )}
        
        {/* Inner core */}
        <div className={cn(
          "w-4 h-4 rounded-full",
          isResponding ? "bg-white animate-pulse" : "bg-white/40"
        )} />
      </motion.div>

      {/* Chroma Rings */}
      {isResponding && (
        <>
          <motion.div
            className="absolute inset-[-10px] rounded-full border border-purple-500/30 blur-sm"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-[-20px] rounded-full border border-blue-500/20 blur-md"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </div>
  );
}
