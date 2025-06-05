import { create } from 'zustand';

interface OnboardingState {
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  isOnboarded: false,
  setIsOnboarded: (value) => set({ isOnboarded: value }),
}));