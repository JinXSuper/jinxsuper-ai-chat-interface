import { create } from 'zustand';
import type { Conversation } from '@/types/chat';
import type { Message } from '@/types/message';

interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;

  setConversations: (conversations: Conversation[]) => void;
  setCurrentConversation: (id: string | null) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  setLoading: (loading: boolean) => void;
  deleteConversation: (id: string) => void;
  togglePin: (id: string) => void;
  createConversation: (conversation: Conversation) => void;
  handleNewChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  currentConversationId: null,
  messages: {},
  isLoading: false,

  setConversations: (conversations) => set({ conversations }),

  setCurrentConversation: (id) => set({ currentConversationId: id }),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: { ...state.messages, [conversationId]: messages },
    })),

  addMessage: (conversationId, message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [
          ...(state.messages[conversationId] || []),
          message,
        ],
      },
    })),

  setLoading: (isLoading) => set({ isLoading }),

  deleteConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      currentConversationId:
        state.currentConversationId === id ? null : state.currentConversationId,
    })),

  togglePin: (id) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, pinned: !c.pinned } : c
      ),
    })),

  createConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      currentConversationId: conversation.id,
    })),

  handleNewChat: () => set({ currentConversationId: null }),
}));
