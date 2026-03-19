'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { useModelStore } from '@/stores/modelStore';
import { useUIStore } from '@/stores/uiStore';
import type { Conversation } from '@/types/chat';
import type { Message } from '@/types/message';
import type { AIModel } from '@/types/model';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ChatContainer } from '@/components/Chat/ChatContainer';
import { ChatInput } from '@/components/Input/ChatInput';
import { Header } from '@/components/Layout/Header';
import { DesignSystem } from '@/components/Content/DesignSystem';
import { ComingSoon } from '@/components/Content/ComingSoon';
import { cn } from '@/lib/utils';
import { PenLine, MessageSquare, Code2, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMockAIResponse } from '@/utils/mockDataGenerator';

const ColorBends = dynamic(() => import('@/components/ReactBits/ColorBends'), { ssr: false });
const Aurora = dynamic(() => import('@/components/ReactBits/Aurora'), { ssr: false });

const FAST_PROMPTS = [
  { icon: <PenLine className="h-4 w-4" />, text: 'Write me a story' },
  { icon: <MessageSquare className="h-4 w-4" />, text: 'Tell me a joke' },
  { icon: <Code2 className="h-4 w-4" />, text: 'Codes for a React Hook' },
  { icon: <Sparkles className="h-4 w-4" />, text: 'Analyze this file' },
];
const GlassSurface = dynamic(() => import('@/components/ReactBits/GlassSurface'), { ssr: false });

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState<'chat' | 'design-system' | 'projects' | 'templates'>('chat');
  const [initialized, setInitialized] = useState(false);
  
  const {
    conversations,
    currentConversationId,
    messages,
    isLoading,
    setConversations,
    setCurrentConversation,
    handleNewChat,
    deleteConversation,
    setMessages,
    setLoading,
    addMessage,
    createConversation
  } = useChatStore();

  const { selectedModelId, setModels } = useModelStore();

  // Load mock data on mount
  useEffect(() => {
    async function loadMockData() {
      try {
        const [historyRes, modelsRes, messagesRes] = await Promise.all([
          fetch('/mock/chatHistory.json'),
          fetch('/mock/models.json'),
          fetch('/mock/messages.json'),
        ]);

        const history: Conversation[] = await historyRes.json();
        const modelsData: AIModel[] = await modelsRes.json();
        const messagesData: Record<string, Message[]> = await messagesRes.json();

        setConversations(history);
        setModels(modelsData);

        // Load messages for each conversation
        Object.entries(messagesData).forEach(([convId, msgs]) => {
          setMessages(convId, msgs);
        });

        // Select first conversation
        if (history.length > 0) {
          setCurrentConversation(history[0].id);
        }
      } catch (error) {
        console.error('Failed to load mock data:', error);
      } finally {
        setInitialized(true);
      }
    }

    loadMockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const currentMessages = currentConversationId
    ? messages[currentConversationId] || []
    : [];
  const isEmpty = currentMessages.length === 0;

  const handleSendMessage = useCallback(
    (text: string, files?: File[]) => {
      if (!text.trim() && (!files || files.length === 0)) return;

      let convId = currentConversationId;

      // Create a new conversation if none is selected
      if (!convId) {
        const newConv: Conversation = {
          id: `conv_${Date.now()}`,
          title: text ? (text.slice(0, 50) + (text.length > 50 ? '...' : '')) : (files?.[0]?.name || 'New Chat'),
          preview: text ? text.slice(0, 100) : 'File attachment',
          lastModified: new Date().toISOString(),
          messageCount: 0,
          model: selectedModelId,
        };
        createConversation(newConv);
        convId = newConv.id;
      }

      // Add user message
      const content: Message['content'] = [];
      if (text.trim()) content.push({ type: 'text', value: text });
      
      if (files && files.length > 0) {
        files.forEach(file => {
          content.push({
            type: 'file',
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            url: '#' // Mock URL
          });
        });
      }

      const userMessage: Message = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };
      addMessage(convId, userMessage);
      setLoading(true);

      // Simulate AI response with delay
      const delay = 1500 + Math.random() * 1500;
      setTimeout(() => {
        const aiResponse = generateMockAIResponse(text || 'Analyze these files', selectedModelId);
        addMessage(convId!, aiResponse);
        setLoading(false);
      }, delay);
    },
    [currentConversationId, selectedModelId, createConversation, addMessage, setLoading]
  );

  if (!initialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <p className="text-sm font-medium text-white/40 tracking-widest uppercase">Initializing JinXSuper</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black font-sans text-white selection:bg-white/10">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="colorbends"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <ColorBends 
                colors={['#0f0a1e', '#1a0b33', '#151525']} 
                transparent={false} 
                speed={0.15} 
                frequency={1.5}
                scale={1.2}
              />
              {/* Central Luminous Ring Intensifier */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-25 ring-intensifier pointer-events-none">
                 <Aurora colorStops={['#5227FF', '#FF27E1', '#5227FF']} amplitude={2.0} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="aurora"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Aurora 
                colorStops={['#1a0b33', '#3d1a7a', '#2c1259']}
                amplitude={1.4}
                blend={0.8}
                speed={0.6}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightning Effect from Right */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(255,255,255,0.08),_transparent_60%)] mix-blend-screen pointer-events-none z-0" />
      </div>

      <GlassSurface
        className="relative z-10 flex w-full h-full"
        width="100%"
        height="100%"
        borderRadius={0}
        borderWidth={0}
        opacity={1.0}
        blur={isEmpty ? 20 : 40}
        backgroundOpacity={isEmpty ? 0.2 : 0.3}
        saturation={1.5}
      >
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <div className="md:hidden">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-[70] w-[280px] bg-black/40 backdrop-blur-3xl border-r border-white/5 shadow-2xl overflow-hidden"
              >
                <div className="w-[280px] h-full flex flex-col">
                  <Sidebar
                    conversations={conversations}
                    currentConversationId={currentConversationId}
                    onSelectConversation={(id) => {
                      setCurrentConversation(id);
                      setSidebarOpen(false);
                    }}
                    onNewChat={() => {
                      handleNewChat();
                      setSidebarOpen(false);
                    }}
                    onDeleteConversation={deleteConversation}
                    activeView={activeView}
                    onViewChange={(view) => {
                      setActiveView(view);
                      setSidebarOpen(false);
                    }}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar (Permanent toggle) */}
        <motion.div
          animate={{ 
            width: sidebarOpen ? 260 : 0,
            opacity: sidebarOpen ? 1 : 0
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            'hidden md:flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-[32px] h-full shrink-0 overflow-hidden select-none'
          )}
        >
          <div className="w-[260px] h-full flex flex-col">
            <Sidebar
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelectConversation={setCurrentConversation}
              onNewChat={handleNewChat}
              onDeleteConversation={deleteConversation}
              activeView={activeView}
              onViewChange={setActiveView}
            />
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 bg-transparent h-full relative z-10 min-h-0 pointer-events-auto">
          <Header
            sidebarOpen={sidebarOpen}
            onToggleSidebar={toggleSidebar}
          />

          <main className="flex-1 flex flex-col relative h-full w-full overflow-hidden min-h-0">
            {activeView === 'design-system' ? (
              <div className="flex-1 overflow-hidden relative h-full w-full" style={{ zIndex: 100 }}>
                <DesignSystem />
              </div>
            ) : activeView === 'projects' ? (
              <div className="flex-1 overflow-hidden relative h-full w-full" style={{ zIndex: 100 }}>
                <ComingSoon title="Projects" description="Organize your AI workflows and files into dedicated projects for better context and collaboration." />
              </div>
            ) : activeView === 'templates' ? (
              <div className="flex-1 overflow-hidden relative h-full w-full" style={{ zIndex: 100 }}>
                <ComingSoon title="Templates" description="Browse a collection of pre-built prompts and workflows for common AI tasks and use cases." />
              </div>
            ) : !isEmpty ? (
              <div className="flex-1 flex flex-col min-h-0 h-full w-full relative" style={{ zIndex: 100 }}>
                <ChatContainer
                  messages={currentMessages}
                  isLoading={isLoading}
                  currentConversationId={currentConversationId}
                />
                <div className="w-full px-4 md:px-8 pb-8 shrink-0 relative mt-auto">
                  <ChatInput
                    onSend={handleSendMessage}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-between p-6 md:p-12 relative z-10 w-full max-w-5xl mx-auto">
                <div /> 

                <div className="text-center space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white animate-fade-in drop-shadow-2xl">
                    What do you want to <span className="text-primary italic">create?</span>
                  </h1>
                  <p className="text-white/40 text-sm md:text-lg font-medium max-w-xl mx-auto">
                    JinXSuper is your multi-modal AI partner for building the next generation of digital experiences.
                  </p>
                </div>

                <div className="w-full space-y-8">
                  {/* Fast Prompt Chips */}
                  <div className="flex flex-wrap items-center justify-center gap-3 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    {FAST_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(prompt.text)}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/30 transition-all group luminous-hover specular-shine shadow-lg"
                      >
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform shadow-inner">
                          {prompt.icon}
                        </div>
                        <span className="text-[12px] font-semibold text-white/50 group-hover:text-white transition-colors whitespace-nowrap">
                          {prompt.text}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Input Box in Empty State */}
                  <div className="w-full max-w-3xl mx-auto">
                    <ChatInput
                      onSend={handleSendMessage}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </GlassSurface>
    </div>
  );
}
