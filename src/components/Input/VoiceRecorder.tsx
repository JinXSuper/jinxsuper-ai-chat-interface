'use client';

import * as React from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  onStateChange?: (isRecording: boolean) => void;
  isRecording?: boolean;
  className?: string;
}

export function VoiceRecorder({ onTranscript, onStateChange, isRecording: externalIsRecording, className }: VoiceRecorderProps) {
  const [internalIsRecording, setInternalIsRecording] = React.useState(false);
  const isRecording = externalIsRecording ?? internalIsRecording;
  const [isProcessing, setIsProcessing] = React.useState(false);

  const startRecording = () => {
    if (onStateChange) onStateChange(true);
    else setInternalIsRecording(true);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    if (onStateChange) onStateChange(false);
    else setInternalIsRecording(false);
    setIsProcessing(true);
    // Simulate transcription
    setTimeout(() => {
      setIsProcessing(false);
      onTranscript("This is a mock transcript of your voice input.");
    }, 1500);
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {isRecording && (
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      )}
      
      <Button
        variant="ghost"
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className={cn(
          "h-9 w-9 shrink-0 rounded-xl transition-all duration-300 relative z-10",
          isRecording ? "bg-red-500/10 text-red-500" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
        )}
        title={isRecording ? "Stop Recording" : "Voice Input"}
      >
        {isProcessing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isRecording ? (
          <Square className="h-4 w-4 fill-current" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
