import { WorkoutPlan } from '@/stores/workoutStore';

export interface PlanInput {
  goal: string;
  location: string;
  daysPerWeek: number;
  workoutDuration: number;
}

// Pre-written templates for quick plan generation
// Additional goals, locations and durations can be added here
const templates: Record<string, Record<string, Record<number, Record<number, WorkoutPlan>>>> = {
  glutes: {
    home: {
      3: {
        30: {
          id: 'glutes_home_3_30',
          name: 'Home Glutes Builder',
          description: '3 day home plan focused on glutes',
          duration: 4,
          workouts: [
            {
              day: 1,
              name: 'Glutes & Hamstrings',
              type: 'Strength',
              duration: 30,
              exercises: [
                { name: 'Glute Bridges', sets: 3, reps: 12 },
                { name: 'Single Leg Deadlift', sets: 3, reps: 10 },
              ],
            },
            {
              day: 3,
              name: 'Glutes & Quads',
              type: 'Strength',
              duration: 30,
              exercises: [
                { name: 'Squats', sets: 3, reps: 15 },
                { name: 'Reverse Lunges', sets: 3, reps: 12 },
              ],
            },
            {
              day: 5,
              name: 'Glute Burnout',
              type: 'Strength',
              duration: 30,
              exercises: [
                { name: 'Hip Thrust', sets: 3, reps: 15 },
                { name: 'Fire Hydrant', sets: 3, reps: 12 },
              ],
            },
          ],
        },
      },
    },
    gym: {
      3: {
        45: {
          id: 'glutes_gym_3_45',
          name: 'Gym Glutes Builder',
          description: '3 day gym plan focused on glutes',
          duration: 4,
          workouts: [
            {
              day: 1,
              name: 'Glutes & Hamstrings',
              type: 'Strength',
              duration: 45,
              exercises: [
                { name: 'Barbell Hip Thrust', sets: 4, reps: 12 },
                { name: 'Romanian Deadlift', sets: 3, reps: 10 },
              ],
            },
            {
              day: 3,
              name: 'Glutes & Quads',
              type: 'Strength',
              duration: 45,
              exercises: [
                { name: 'Barbell Squat', sets: 4, reps: 8 },
                { name: 'Leg Press', sets: 3, reps: 12 },
              ],
            },
            {
              day: 5,
              name: 'Glute Focus',
              type: 'Strength',
              duration: 45,
              exercises: [
                { name: 'Cable Kickbacks', sets: 3, reps: 15 },
                { name: 'Walking Lunges', sets: 3, reps: 12 },
              ],
            },
          ],
        },
      },
    },
  },
  fullBody: {
    home: {
      3: {
        30: {
          id: 'full_home_3_30',
          name: 'Home Full Body',
          description: '3 day full body plan at home',
          duration: 4,
          workouts: [
            {
              day: 1,
              name: 'Full Body A',
              type: 'Full Body',
              duration: 30,
              exercises: [
                { name: 'Push-ups', sets: 3, reps: 10 },
                { name: 'Bodyweight Squats', sets: 3, reps: 15 },
              ],
            },
            {
              day: 3,
              name: 'Full Body B',
              type: 'Full Body',
              duration: 30,
              exercises: [
                { name: 'Glute Bridges', sets: 3, reps: 12 },
                { name: 'Plank', sets: 3, reps: 30 },
              ],
            },
            {
              day: 5,
              name: 'Full Body C',
              type: 'Full Body',
              duration: 30,
              exercises: [
                { name: 'Resistance Band Row', sets: 3, reps: 12 },
                { name: 'Lunges', sets: 3, reps: 12 },
              ],
            },
          ],
        },
      },
    },
    gym: {
      3: {
        45: {
          id: 'full_gym_3_45',
          name: 'Gym Full Body',
          description: '3 day full body plan at the gym',
          duration: 4,
          workouts: [
            {
              day: 1,
              name: 'Full Body A',
              type: 'Full Body',
              duration: 45,
              exercises: [
                { name: 'Dumbbell Bench Press', sets: 3, reps: 10 },
                { name: 'Leg Press', sets: 3, reps: 12 },
              ],
            },
            {
              day: 3,
              name: 'Full Body B',
              type: 'Full Body',
              duration: 45,
              exercises: [
                { name: 'Seated Row', sets: 3, reps: 12 },
                { name: 'Goblet Squat', sets: 3, reps: 12 },
              ],
            },
            {
              day: 5,
              name: 'Full Body C',
              type: 'Full Body',
              duration: 45,
              exercises: [
                { name: 'Lat Pulldown', sets: 3, reps: 12 },
                { name: 'Walking Lunges', sets: 3, reps: 12 },
              ],
            },
          ],
        },
      },
    },
  },
};

const defaultPlan: WorkoutPlan = {
  id: 'default',
  name: 'Quick Start',
  description: 'Default 3 day plan',
  duration: 4,
  workouts: [
    {
      day: 1,
      name: 'Quick Workout',
      type: 'Full Body',
      duration: 30,
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 10 },
        { name: 'Squats', sets: 3, reps: 15 },
      ],
    },
  ],
};

export function generateSimplePlan(input: PlanInput): WorkoutPlan {
  const { goal, location, daysPerWeek, workoutDuration } = input;
  const plan =
    templates[goal]?.[location]?.[daysPerWeek]?.[workoutDuration] || defaultPlan;

  const planId = plan.id || Date.now().toString();
  return {
    ...plan,
    id: planId,
    workouts: plan.workouts.map((w, idx) => {
      let focus = 'Full Body';
      const type = w.type.toLowerCase();
      if (type.includes('glute')) focus = 'Glutes';
      else if (type.includes('upper')) focus = 'Upper Body';
      else if (type.includes('lower')) focus = 'Lower Body';
      else if (type.includes('push')) focus = 'Push';
      else if (type.includes('pull')) focus = 'Pull';
      else if (type.includes('leg')) focus = 'Legs';

      return {
        ...w,
        id: `${planId}_${idx}`,
        focus,
      };
    }),
  };
}

