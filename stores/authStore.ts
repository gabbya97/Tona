import { create } from 'zustand';

interface UserData {
  fullName: string;
  username: string;
  email: string;
  dateOfBirth: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userData: UserData | null;
  signUp: (data: UserData) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userData: null,
  signUp: (data) => set({ isAuthenticated: true, userData: data }),
  signOut: () => set({ isAuthenticated: false, userData: null }),
}));