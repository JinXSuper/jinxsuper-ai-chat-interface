'use client';

import * as React from 'react';
import type { Message } from '@/types/message';
import { MessageBubble } from './MessageBubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hexagon } from 'lucide-react';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  currentConversationId: string | null;
}

export function ChatContainer({
  messages,
  isLoading,
}: ChatContainerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 h-full w-full min-h-0 flex flex-col pointer-events-auto overflow-hidden">
      <ScrollArea ref={scrollRef} className="flex-1 w-full bg-transparent pointer-events-auto touch-pan-y h-full">
        <div className="mx-auto max-w-4xl space-y-2 pb-32 pt-4 px-4">
          {messages.map((message, index) => (
            <MessageBubble key={message.id || index} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out fill-mode-both">
              <div className="flex-shrink-0 pt-1">
                <div className="h-7 w-7 rounded-md border border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-sm">
                  <Hexagon className="h-4 w-4 fill-white text-white animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-1.5">
                <div className="flex items-center gap-2 text-[13px] font-medium text-white/50">
                  JinXSuper is thinking
                  <span className="flex gap-1 ml-1">
                    <span className="h-1 w-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1 w-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1 w-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
