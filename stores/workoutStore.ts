import { create } from 'zustand';

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest?: number;
  equipment?: string[];
}

export interface Workout {
  day: number; // 0-6 for day of week
  name: string;
  type: string;
  duration?: number;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  duration: number; // in weeks
  workouts: Workout[];
}

export interface CompletedSet {
  reps: number;
  weight: string | number;
}

export interface CompletedExercise {
  name: string;
  sets: CompletedSet[];
}

export interface WorkoutHistory {
  id: string;
  date: string;
  duration: number; // in seconds
  name: string;
  type: string;
  exercises: CompletedExercise[];
}

interface WorkoutState {
  currentPlan: WorkoutPlan | null;
  workoutHistory: WorkoutHistory[];
  setCurrentPlan: (plan: WorkoutPlan) => void;
  addWorkoutHistory: (workout: WorkoutHistory) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  currentPlan: null,
  workoutHistory: [],
  setCurrentPlan: (plan) =>
    set({
      currentPlan: {
        ...plan,
        workouts: plan.workouts?.map((w) => ({
          ...w,
          day: Number(w.day)
        })) || []
      }
    }),
  addWorkoutHistory: (workout) => 
    set((state) => ({
      workoutHistory: [workout, ...state.workoutHistory]
    })),
}));