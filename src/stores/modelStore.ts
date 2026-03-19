import { create } from 'zustand';
import type { AIModel } from '@/types/model';

interface ModelState {
  models: AIModel[];
  selectedModelId: string;
  autoMode: boolean;

  setModels: (models: AIModel[]) => void;
  setSelectedModel: (modelId: string) => void;
  setAutoMode: (enabled: boolean) => void;
  getSelectedModel: () => AIModel | undefined;
}

export const useModelStore = create<ModelState>((set, get) => ({
  models: [],
  selectedModelId: 'claude-opus',
  autoMode: true,

  setModels: (models) => set({ models }),
  setSelectedModel: (modelId) => set({ selectedModelId: modelId }),
  setAutoMode: (enabled) => set({ autoMode: enabled }),
  getSelectedModel: () => {
    const state = get();
    return state.models.find((m) => m.id === state.selectedModelId);
  },
}));
