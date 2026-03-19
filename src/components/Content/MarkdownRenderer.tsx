'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { CodeBlock } from './CodeBlock';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
        code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : 'text';
          
          if (!inline && match) {
            return (
              <CodeBlock
                code={String(children).replace(/\n$/, '')}
                language={language}
              />
            );
          }

          return (
            <code
              className={cn(
                "bg-muted px-1.5 py-0.5 rounded-md font-mono text-[0.85em] border border-border/40",
                className
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <>{children}</>;
        },
        h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
        p: ({ children }) => <p className="mb-4 last:mb-0 leading-7">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="mb-1">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/30 pl-4 py-1 italic mb-4 bg-primary/5 rounded-r-md">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4 rounded-lg border border-border/50">
            <table className="w-full text-sm text-left border-collapse">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-muted/50 border-b border-border">{children}</thead>,
        th: ({ children }) => <th className="px-4 py-2 font-bold">{children}</th>,
        td: ({ children }) => <td className="px-4 py-2 border-b border-border/30">{children}</td>,
        a: ({ href, children }) => (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline underline-offset-4 font-medium transition-all"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}
