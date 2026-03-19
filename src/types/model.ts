/** AI Model type */
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  badge: string;
  speedMs: number;
  icon: string;
  color: string;
}

/** AI Persona type */
export interface AIPersona {
  modelId: string;
  name: string;
  style: 'analytical' | 'creative' | 'concise' | 'detailed';
  canGenerateCharts: boolean;
  responsePatterns: ('text' | 'code' | 'chart' | 'mixed')[];
}
