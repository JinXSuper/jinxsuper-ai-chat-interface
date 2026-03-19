/** Chat conversation type */
export interface Conversation {
  id: string;
  title: string;
  preview: string;
  lastModified: string;
  messageCount: number;
  pinned?: boolean;
  model?: string;
}
