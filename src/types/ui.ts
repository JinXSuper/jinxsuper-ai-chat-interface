/** UI state types */
export interface SidebarState {
  isOpen: boolean;
  activeSection: SidebarSection;
}

export type SidebarSection =
  | 'chat'
  | 'archive'
  | 'tools'
  | 'code'
  | 'customize'
  | 'project';

export type ThemeMode = 'light' | 'dark' | 'system';
