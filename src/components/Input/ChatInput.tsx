'use client';

import * as React from 'react';
import { 
  SendHorizontal, 
  Plus, 
  ChevronDown, 
  X, 
  FileText, 
  Image as ImageIcon,
  LayoutDashboard,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VoiceRecorder } from './VoiceRecorder';
import { SpeechBlob } from './SpeechBlob';
import { useChatStore } from '@/stores/chatStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatInputProps {
  onSend: (text: string, files?: File[]) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);
  const [isResponding, setIsResponding] = React.useState(false);
  const [attachedFiles, setAttachedFiles] = React.useState<File[]>([]);
  const [selectedModel, setSelectedModel] = React.useState('JinXSuper Mini');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const { isLoading: aiThinking } = useChatStore();

  const handleSend = () => {
    if ((input.trim() || attachedFiles.length > 0) && !isLoading) {
      onSend(input, attachedFiles);
      setInput('');
      setAttachedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="w-full relative z-20">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        multiple 
      />

      {/* Speech Interaction Overlay */}
      <AnimatePresence>
        {(isListening || isResponding) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 flex flex-col items-center gap-4"
          >
            <SpeechBlob isListening={isListening} isResponding={isResponding} />
            <span className="text-sm font-medium text-white/70 backdrop-blur-md bg-black/20 px-4 py-1.5 rounded-full border border-white/5">
              {isListening ? "Listening..." : "JinXSuper is Responding"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-3xl flex flex-col gap-3">
        <div className="relative flex flex-col w-full bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden focus-within:border-white/20 backdrop-blur-3xl transition-all duration-300 shadow-2xl specular-shine">
          
          {/* File Previews */}
          <AnimatePresence>
            {attachedFiles.length > 0 && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-wrap gap-2 px-4 pt-4 pb-2"
              >
                {attachedFiles.map((file, i) => (
                  <motion.div 
                    key={i}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/90 text-xs font-medium group pr-1"
                  >
                    {file.type.startsWith('image/') ? <ImageIcon className="h-3.5 w-3.5 text-primary" /> : <FileText className="h-3.5 w-3.5 text-emerald-400" />}
                    <span className="max-w-[120px] truncate">{file.name}</span>
                    <button 
                      onClick={() => removeFile(i)}
                      className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="pt-2 pb-0">
            <Textarea
              ref={textareaRef}
              placeholder="Ask JinXSuper to build..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              className="w-full min-h-[44px] max-h-[200px] border-none bg-transparent hover:bg-transparent focus:bg-transparent !bg-transparent outline-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 text-[15.5px] leading-relaxed resize-none placeholder:text-white/30 text-[#ededed]"
            />
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between p-2 pl-3">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="h-7 w-7 rounded-lg text-white/50 hover:text-white hover:bg-white/10 bg-white/5 backdrop-blur-md transition-colors border border-white/5"
                title="Attach Document"
              >
                <Plus className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex h-7 px-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 bg-white/5 backdrop-blur-md transition-colors text-xs font-medium items-center gap-1.5 border border-white/5 outline-none cursor-pointer"
                >
                  <Zap className={cn("h-3 w-3", selectedModel.includes('Pro') ? "text-primary" : "text-emerald-400")} />
                  {selectedModel} <ChevronDown className="h-3 w-3 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px] glass bg-black/60 backdrop-blur-3xl border-white/10 text-white rounded-2xl p-2 shadow-2xl specular-shine animate-in fade-in zoom-in-95 duration-200">
                  <DropdownMenuItem 
                    onClick={() => setSelectedModel('JinXSuper Mini')}
                    className="rounded-xl focus:bg-white/10 flex items-center gap-2.5 py-2.5 px-3 cursor-pointer group transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20">
                      <Zap className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold">JinXSuper Mini</span>
                      <span className="text-[10px] text-white/30">Fast & Efficient</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSelectedModel('JinXSuper Pro')}
                    className="rounded-xl focus:bg-white/10 flex items-center gap-2.5 py-2.5 px-3 cursor-pointer group transition-colors mt-1"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20">
                      <Zap className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold">JinXSuper Pro</span>
                      <span className="text-[10px] text-white/30">Most Powerful</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-7 px-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 bg-white/5 backdrop-blur-md transition-colors text-xs font-medium flex items-center gap-1.5 border border-white/5"
              >
                <LayoutDashboard className="h-3 w-3" />
                Project <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>

              <div className="flex items-center pr-1">
                {(!input.trim() && attachedFiles.length === 0) ? (
                  <VoiceRecorder 
                    isRecording={isListening}
                    onStateChange={(state) => setIsListening(state)}
                    onTranscript={(text) => {
                      setInput(prev => prev + (prev ? ' ' : '') + text);
                      setIsResponding(true);
                      setTimeout(() => setIsResponding(false), 3000);
                    }} 
                    className="h-7 w-7" 
                  />
                ) : (
                  <Button
                    size="icon"
                    onClick={() => handleSend()}
                    disabled={isLoading}
                    className="h-7 w-7 rounded-lg bg-white text-black hover:bg-white/90 hover:scale-105 transition-all outline-none luminous-hover"
                  >
                     <SendHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Banner Mock */}
        <div className="w-full flex items-center justify-between px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-md">
           <span className="text-[11px] text-white/40 font-medium tracking-tight">Upgrade to Pro to unlock JinXSuper-o1 and more project capacity.</span>
           <span className="text-[11px] text-primary font-bold cursor-pointer hover:underline uppercase text-primary">Upgrade</span>
        </div>
      </div>
    </div>
  );
}
