'use client';

import * as React from 'react';
import type { Message, ContentBlock } from '@/types/message';
import { cn } from '@/lib/utils';
import { Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, ChevronDown, ChevronUp, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarkdownRenderer } from '../Content/MarkdownRenderer';
import { ChartRenderer } from '../Content/ChartRenderer';
import { FileTree } from '../Content/FileTree';
import { CodeBlock } from '../Content/CodeBlock';
import { SandboxPreview } from '../Content/SandboxPreview';
import { ImageRenderer } from '../Content/ImageRenderer';

function TypewriterText({ content, isTyping }: { content: string, isTyping: boolean }) {
  const [displayedContent, setDisplayedContent] = React.useState(isTyping ? '' : content);
  
  React.useEffect(() => {
    if (!isTyping) {
      setDisplayedContent(content);
      return;
    }
    
    let i = 0;
    const interval = setInterval(() => {
      i += 4;
      if (i >= content.length) {
        setDisplayedContent(content);
        clearInterval(interval);
      } else {
        setDisplayedContent(content.slice(0, i));
      }
    }, 10);
    return () => clearInterval(interval);
  }, [content, isTyping]);

  return <MarkdownRenderer content={displayedContent + (displayedContent.length < content.length ? '▍' : '')} />;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAI = message.role === 'assistant';
  const [thinkingExpanded, setThinkingExpanded] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    const age = Date.now() - new Date(message.timestamp).getTime();
    if (isAI && age < 3000) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), Math.min(message.content.length * 10, 5000));
      return () => clearTimeout(timer);
    }
  }, [message.timestamp, isAI, message.content.length]);

  return (
    <div
      className={cn(
        'group flex w-full flex-col gap-2 animate-in slide-in-from-bottom-4 fade-in duration-500 ease-out fill-mode-both',
        isAI ? 'items-start py-6' : 'items-end py-2'
      )}
    >
      <div className={cn(
        'flex w-full gap-4',
        isAI ? 'flex-row' : 'flex-row-reverse'
      )}>
        {/* Message Content */}
        <div className={cn(
          'flex flex-col gap-1.5 w-full',
          isAI ? 'max-w-full items-start px-4' : 'max-w-[75%] items-end'
        )}>
          {/* Thinking State */}
          {isAI && message.thinking && (
            <div className="flex flex-col gap-2 mb-2 w-full">
              <button 
                onClick={() => setThinkingExpanded(!thinkingExpanded)}
                className="flex items-center gap-2 text-[11px] font-medium text-white/50 hover:text-white transition-colors h-6 px-2 rounded-md w-fit group/think"
              >
                <Sparkles className="h-3.5 w-3.5 animate-pulse-subtle stroke-[1.5]" />
                <span>Thinking ({message.thinking.duration.toFixed(1)}s)</span>
                {thinkingExpanded ? <ChevronUp className="h-3 w-3 stroke-[1.5]" /> : <ChevronDown className="h-3 w-3 stroke-[1.5]" />}
              </button>
              {thinkingExpanded && (
                <div className="text-[13px] text-white/50 leading-relaxed pl-3 border-l-2 border-white/10 py-1 animate-fade-in mb-4">
                   {message.thinking.content}
                </div>
              )}
            </div>
          )}

          {/* Actual Message Blocks */}
          <div className={cn(
            'flex flex-col gap-6 w-full relative',
            isAI 
              ? 'bg-transparent border-none py-2 px-0 select-text' // Claude Style: Naked content + selectable
              : 'bg-white/[0.05] backdrop-blur-3xl border border-white/10 py-3 px-5 rounded-3xl rounded-tr-lg shadow-2xl w-fit specular-shine select-text'
          )}>
            {message.content.map((block, idx) => (
              <ContentBlockRenderer key={idx} block={block} isAI={isAI} isTyping={isTyping} />
            ))}
          </div>

          {/* Model Badge & Action Buttons Row for AI */}
          {isAI && (
            <div className="flex items-center gap-4 mt-4">
               <span className="text-[11px] text-white/30 font-medium tracking-wide">
                 {message.model === 'claude-opus' ? 'JinXSuper Pro' : 'JinXSuper Mini'}
               </span>
               <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ActionButton icon={<Copy className="h-3.5 w-3.5 stroke-[1.5]" />} title="Copy" />
                  <ActionButton icon={<ThumbsUp className="h-3.5 w-3.5 stroke-[1.5]" />} title="Good" />
                  <ActionButton icon={<ThumbsDown className="h-3.5 w-3.5 stroke-[1.5]" />} title="Bad" />
                  <ActionButton icon={<RotateCcw className="h-3.5 w-3.5 stroke-[1.5]" />} title="Retry" />
               </div>
            </div>
          )}
        </div>
      </div>

      {/* User Actions (Hover) */}
      {!isAI && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-end mr-2">
          <ActionButton icon={<Copy className="h-3.5 w-3.5 stroke-[1.5]" />} title="Copy" />
        </div>
      )}
    </div>
  );
}

function ContentBlockRenderer({ block, isAI, isTyping }: { block: ContentBlock; isAI: boolean; isTyping: boolean }) {
  switch (block.type) {
    case 'text':
      return (
        <div className={cn(
          "text-[15.5px] leading-relaxed",
          isAI ? "text-[#ededed]" : "text-[#ededed]"
        )}>
           {isAI ? <TypewriterText content={block.value} isTyping={isTyping} /> : <MarkdownRenderer content={block.value} />}
        </div>
      );
    case 'image':
      return <ImageRenderer src={block.src} alt={block.alt} caption={block.caption} />;
    case 'code':
      if (block.language === 'html' || block.language === 'sandbox') {
        return (
          <div className="flex flex-col gap-2 w-full">
            <SandboxPreview code={block.code} />
            <CodeBlock code={block.code} language={block.language} />
          </div>
        );
      }
      return (
        <CodeBlock code={block.code} language={block.language} />
      );
    case 'chart':
      return (
        <div className="w-full h-full min-h-[300px] overflow-hidden rounded-xl border border-white/10 bg-black/10 backdrop-blur-md shadow-sm">
          <ChartRenderer 
            type={block.chartType} 
            data={block.data} 
            title={block.title} 
            config={block.config}
          />
        </div>
      );
    case 'filetree':
      return (
        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md shadow-sm">
           <FileTree root={block.root} />
        </div>
      );
    case 'file':
      return <FileBubble block={block} />;
    default:
      return null;
  }
}

function FileBubble({ block }: { block: any }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl w-fit min-w-[200px] group/file hover:bg-white/10 transition-colors">
      <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex flex-col min-w-0 pr-4">
        <span className="text-[13px] font-medium text-white truncate">{block.name || 'document.pdf'}</span>
        <span className="text-[11px] text-white/40 uppercase font-bold tracking-tight">{block.size || '1.2 MB'}</span>
      </div>
      <Button size="icon" variant="ghost" className="h-8 w-8 ml-auto rounded-lg text-white/40 hover:text-white hover:bg-white/20">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ActionButton({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors"
      title={title}
    >
      {icon}
    </Button>
  );
}
