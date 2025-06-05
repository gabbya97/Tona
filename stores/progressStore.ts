import { create } from 'zustand';

export interface ProgressPhoto {
  id: string;
  uri: string;
  date: string;
  note: string;
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
}

interface ProgressState {
  progressPhotos: ProgressPhoto[];
  personalRecords: PersonalRecord[];
  addProgressPhoto: (photo: ProgressPhoto) => void;
  addPersonalRecord: (record: PersonalRecord) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  progressPhotos: [],
  personalRecords: [],
  addProgressPhoto: (photo) => 
    set((state) => ({
      progressPhotos: [photo, ...state.progressPhotos]
    })),
  addPersonalRecord: (record) => {
    set((state) => {
      // Check if this is a new PR for this exercise
      const existingRecord = state.personalRecords.find(
        r => r.exerciseName === record.exerciseName && r.reps === record.reps
      );
      
      if (!existingRecord || record.weight > existingRecord.weight) {
        // If no existing record or new record has higher weight, add it
        return {
          personalRecords: [record, ...state.personalRecords]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        };
      }
      
      return state; // No change if not a PR
    });
  }
}));