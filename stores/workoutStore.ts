import { create } from 'zustand';
import { saveCurrentPlan } from '@/utils/storage';

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest?: number;
  equipment?: string[];
}

export interface Workout {
  id: string;
  day: number; // 0-6 for day of week
  name: string;
  type: string;
  focus: string;
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

export interface SkippedWorkout {
  weekStart: string;
  index: number;
}

interface WorkoutState {
  currentPlan: WorkoutPlan | null;
  workoutHistory: WorkoutHistory[];
  skippedWorkouts: SkippedWorkout[];
  setCurrentPlan: (plan: WorkoutPlan) => void;
  addWorkoutHistory: (workout: WorkoutHistory) => void;
  addSkippedWorkout: (index: number, weekStart: string) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  currentPlan: null,
  workoutHistory: [],
  skippedWorkouts: [],
  setCurrentPlan: (plan) => {
    saveCurrentPlan(plan);
    set({
      currentPlan: {
        ...plan,
        workouts: plan.workouts?.map((w) => ({
          ...w,
          day: Number(w.day)
        })) || []
      }
    });
  },
  addWorkoutHistory: (workout) =>
    set((state) => ({
      workoutHistory: [workout, ...state.workoutHistory]
    })),
  addSkippedWorkout: (index, weekStart) =>
    set((state) => ({
      skippedWorkouts: [
        { index, weekStart },
        ...state.skippedWorkouts
      ]
    })),
}));
