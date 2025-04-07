import { create } from 'zustand';

interface AppState {
  image: string | null;
  result: string | null;
  setImage: (image: string | null) => void;
  setResult: (result: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  image: null,
  result: null,
  setImage: (image) => set({ image }),
  setResult: (result) => set({ result }),
}));