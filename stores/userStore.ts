import { create } from 'zustand';

export interface UserProfile {
  name?: string;
  avatar?: string;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  workoutLocation?: 'home' | 'gym' | 'both';
  equipment?: string[];
  daysPerWeek?: number;
  workoutDuration?: number;
  goal?: 'strength' | 'toning' | 'confidence';
  settings?: {
    workoutReminders?: boolean;
    progressUpdates?: boolean;
  };
}

interface UserState {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  updateUserProfile: (updates) => 
    set((state) => ({
      userProfile: state.userProfile ? { ...state.userProfile, ...updates } : updates
    })),
}));