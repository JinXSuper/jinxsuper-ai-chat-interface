import { create } from 'zustand';
import type { SidebarSection, ThemeMode } from '@/types/ui';

interface UIState {
  sidebarOpen: boolean;
  sidebarSection: SidebarSection;
  theme: ThemeMode;
  isMobile: boolean;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarSection: (section: SidebarSection) => void;
  setTheme: (theme: ThemeMode) => void;
  setIsMobile: (isMobile: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  sidebarSection: 'chat',
  theme: 'dark',
  isMobile: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSidebarSection: (section) => set({ sidebarSection: section }),
  setTheme: (theme) => set({ theme }),
  setIsMobile: (isMobile) => set({ isMobile }),
}));
