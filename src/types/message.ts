/** Content block types for AI messages */
export type ContentBlock =
  | TextContent
  | CodeContent
  | ChartContent
  | FileTreeContent
  | ImageContent
  | FileContent;

export interface TextContent {
  type: 'text';
  value: string;
}

export interface CodeContent {
  type: 'code';
  language: string;
  code: string;
  filename?: string;
  preview?: boolean;
}

export interface ChartContent {
  type: 'chart';
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'area';
  title?: string;
  data: Record<string, unknown>[];
  config?: ChartConfig;
}

export interface ChartConfig {
  xKey: string;
  yKey: string;
  color?: string;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  language?: string;
}

export interface FileTreeContent {
  type: 'filetree';
  root: FileNode;
}

export interface ImageContent {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
}

export interface FileContent {
  type: 'file';
  name: string;
  size: string;
  url?: string;
}

export interface ThinkingBlock {
  content: string;
  duration: number;
  visible: boolean;
}

export interface MessageMetadata {
  tokens?: number;
  duration?: number;
  confidence?: number;
}

/** A single chat message */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: ContentBlock[];
  model?: string;
  timestamp: string;
  thinking?: ThinkingBlock;
  metadata?: MessageMetadata;
}
