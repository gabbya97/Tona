import { UserProfile } from '@/stores/userStore';
import { WorkoutPlan, Workout, Exercise } from '@/stores/workoutStore';

// Sample exercise database
const exercises = {
  beginner: {
    gym: {
      upper: [
        { name: 'Dumbbell Bench Press', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Seated Row', sets: 3, reps: 12, rest: 60, equipment: ['Cable Machine'] },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Lat Pulldown', sets: 3, reps: 12, rest: 60, equipment: ['Cable Machine'] },
        { name: 'Tricep Pushdown', sets: 3, reps: 12, rest: 45, equipment: ['Cable Machine'] },
        { name: 'Bicep Curl', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
      ],
      lower: [
        { name: 'Goblet Squat', sets: 3, reps: 12, rest: 60, equipment: ['Kettlebells'] },
        { name: 'Romanian Deadlift', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Leg Press', sets: 3, reps: 12, rest: 60, equipment: ['Leg Press Machine'] },
        { name: 'Walking Lunges', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Leg Extension', sets: 3, reps: 12, rest: 45, equipment: ['Leg Extension Machine'] },
        { name: 'Calf Raises', sets: 3, reps: 15, rest: 45, equipment: ['Dumbbells'] },
      ],
      full: [
        { name: 'Goblet Squat', sets: 3, reps: 12, rest: 60, equipment: ['Kettlebells'] },
        { name: 'Dumbbell Bench Press', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Seated Row', sets: 3, reps: 12, rest: 60, equipment: ['Cable Machine'] },
        { name: 'Walking Lunges', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Lateral Raises', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
        { name: 'Plank', sets: 3, reps: 30, rest: 45, equipment: [] },
      ],
    },
    home: {
      upper: [
        { name: 'Push-ups', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Resistance Band Rows', sets: 3, reps: 12, rest: 60, equipment: ['Resistance Bands'] },
        { name: 'Shoulder Taps', sets: 3, reps: 12, rest: 45, equipment: [] },
        { name: 'Resistance Band Pull Aparts', sets: 3, reps: 15, rest: 45, equipment: ['Resistance Bands'] },
        { name: 'Tricep Dips', sets: 3, reps: 10, rest: 45, equipment: [] },
      ],
      lower: [
        { name: 'Bodyweight Squats', sets: 3, reps: 15, rest: 60, equipment: [] },
        { name: 'Glute Bridges', sets: 3, reps: 15, rest: 60, equipment: [] },
        { name: 'Reverse Lunges', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Side Lunges', sets: 3, reps: 10, rest: 45, equipment: [] },
        { name: 'Calf Raises', sets: 3, reps: 20, rest: 45, equipment: [] },
      ],
      full: [
        { name: 'Bodyweight Squats', sets: 3, reps: 15, rest: 60, equipment: [] },
        { name: 'Push-ups', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Glute Bridges', sets: 3, reps: 15, rest: 60, equipment: [] },
        { name: 'Resistance Band Rows', sets: 3, reps: 12, rest: 60, equipment: ['Resistance Bands'] },
        { name: 'Plank', sets: 3, reps: 30, rest: 45, equipment: [] },
      ],
    },
  },
  intermediate: {
    gym: {
      upper: [
        { name: 'Dumbbell Bench Press', sets: 4, reps: 10, rest: 60, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Bent Over Row', sets: 4, reps: 10, rest: 60, equipment: ['Barbell'] },
        { name: 'Overhead Press', sets: 3, reps: 8, rest: 60, equipment: ['Barbell'] },
        { name: 'Pull-ups or Lat Pulldown', sets: 3, reps: 8, rest: 60, equipment: ['Pull-up Bar', 'Cable Machine'] },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Face Pulls', sets: 3, reps: 15, rest: 45, equipment: ['Cable Machine'] },
        { name: 'Tricep Pushdown', sets: 3, reps: 12, rest: 45, equipment: ['Cable Machine'] },
        { name: 'Bicep Curl', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
      ],
      lower: [
        { name: 'Barbell Squat', sets: 4, reps: 8, rest: 90, equipment: ['Barbell'] },
        { name: 'Romanian Deadlift', sets: 4, reps: 8, rest: 90, equipment: ['Barbell'] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Hip Thrust', sets: 3, reps: 12, rest: 60, equipment: ['Barbell', 'Bench'] },
        { name: 'Leg Press', sets: 3, reps: 12, rest: 60, equipment: ['Leg Press Machine'] },
        { name: 'Leg Curl', sets: 3, reps: 12, rest: 45, equipment: ['Leg Curl Machine'] },
        { name: 'Calf Raises', sets: 4, reps: 15, rest: 45, equipment: ['Dumbbells'] },
      ],
      push: [
        { name: 'Barbell Bench Press', sets: 4, reps: 8, rest: 90, equipment: ['Barbell', 'Bench'] },
        { name: 'Overhead Press', sets: 4, reps: 8, rest: 90, equipment: ['Barbell'] },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Lateral Raises', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
        { name: 'Tricep Pushdown', sets: 3, reps: 12, rest: 45, equipment: ['Cable Machine'] },
        { name: 'Overhead Tricep Extension', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
      ],
      pull: [
        { name: 'Deadlift', sets: 4, reps: 6, rest: 120, equipment: ['Barbell'] },
        { name: 'Pull-ups or Lat Pulldown', sets: 4, reps: 8, rest: 90, equipment: ['Pull-up Bar', 'Cable Machine'] },
        { name: 'Seated Row', sets: 3, reps: 10, rest: 60, equipment: ['Cable Machine'] },
        { name: 'Face Pulls', sets: 3, reps: 15, rest: 45, equipment: ['Cable Machine'] },
        { name: 'Bicep Curl', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
        { name: 'Hammer Curl', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
      ],
      legs: [
        { name: 'Barbell Squat', sets: 4, reps: 8, rest: 120, equipment: ['Barbell'] },
        { name: 'Romanian Deadlift', sets: 4, reps: 8, rest: 90, equipment: ['Barbell'] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Hip Thrust', sets: 3, reps: 12, rest: 60, equipment: ['Barbell', 'Bench'] },
        { name: 'Leg Press', sets: 3, reps: 12, rest: 60, equipment: ['Leg Press Machine'] },
        { name: 'Leg Curl', sets: 3, reps: 12, rest: 45, equipment: ['Leg Curl Machine'] },
        { name: 'Calf Raises', sets: 4, reps: 15, rest: 45, equipment: ['Dumbbells'] },
      ],
    },
    home: {
      upper: [
        { name: 'Push-ups (Elevated if needed)', sets: 4, reps: 12, rest: 60, equipment: [] },
        { name: 'Resistance Band Rows', sets: 4, reps: 12, rest: 60, equipment: ['Resistance Bands'] },
        { name: 'Pike Push-ups', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Resistance Band Pull Aparts', sets: 3, reps: 15, rest: 45, equipment: ['Resistance Bands'] },
        { name: 'Tricep Dips', sets: 3, reps: 12, rest: 45, equipment: [] },
        { name: 'Resistance Band Bicep Curls', sets: 3, reps: 15, rest: 45, equipment: ['Resistance Bands'] },
      ],
      lower: [
        { name: 'Goblet Squats', sets: 4, reps: 12, rest: 60, equipment: ['Kettlebells', 'Dumbbells'] },
        { name: 'Single Leg RDL', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Glute Bridges', sets: 3, reps: 15, rest: 45, equipment: [] },
        { name: 'Split Squats', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Calf Raises', sets: 3, reps: 20, rest: 45, equipment: [] },
      ],
      full: [
        { name: 'Goblet Squats', sets: 3, reps: 12, rest: 60, equipment: ['Kettlebells', 'Dumbbells'] },
        { name: 'Push-ups', sets: 3, reps: 12, rest: 60, equipment: [] },
        { name: 'Resistance Band Rows', sets: 3, reps: 12, rest: 60, equipment: ['Resistance Bands'] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Pike Push-ups', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Glute Bridges', sets: 3, reps: 15, rest: 45, equipment: [] },
        { name: 'Plank', sets: 3, reps: 45, rest: 45, equipment: [] },
      ],
    },
  },
  advanced: {
    gym: {
      upper: [
        { name: 'Barbell Bench Press', sets: 5, reps: 5, rest: 90, equipment: ['Barbell', 'Bench'] },
        { name: 'Weighted Pull-ups', sets: 4, reps: 6, rest: 90, equipment: ['Pull-up Bar'] },
        { name: 'Overhead Press', sets: 4, reps: 6, rest: 90, equipment: ['Barbell'] },
        { name: 'Bent Over Row', sets: 4, reps: 8, rest: 90, equipment: ['Barbell'] },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 10, rest: 60, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Lat Pulldown', sets: 3, reps: 10, rest: 60, equipment: ['Cable Machine'] },
        { name: 'Lateral Raises', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
        { name: 'Face Pulls', sets: 3, reps: 15, rest: 45, equipment: ['Cable Machine'] },
        { name: 'Skull Crushers', sets: 3, reps: 10, rest: 45, equipment: ['Barbell', 'Bench'] },
        { name: 'Barbell Curl', sets: 3, reps: 10, rest: 45, equipment: ['Barbell'] },
      ],
      lower: [
        { name: 'Barbell Squat', sets: 5, reps: 5, rest: 120, equipment: ['Barbell'] },
        { name: 'Deadlift', sets: 4, reps: 5, rest: 120, equipment: ['Barbell'] },
        { name: 'Bulgarian Split Squat', sets: 3, reps: 8, rest: 90, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Hip Thrust', sets: 4, reps: 8, rest: 90, equipment: ['Barbell', 'Bench'] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Leg Press', sets: 3, reps: 10, rest: 60, equipment: ['Leg Press Machine'] },
        { name: 'Leg Curl', sets: 3, reps: 12, rest: 45, equipment: ['Leg Curl Machine'] },
        { name: 'Leg Extension', sets: 3, reps: 12, rest: 45, equipment: ['Leg Extension Machine'] },
        { name: 'Standing Calf Raises', sets: 4, reps: 15, rest: 45, equipment: ['Calf Raise Machine'] },
      ],
      push: [
        { name: 'Barbell Bench Press', sets: 5, reps: 5, rest: 120, equipment: ['Barbell', 'Bench'] },
        { name: 'Overhead Press', sets: 4, reps: 6, rest: 90, equipment: ['Barbell'] },
        { name: 'Incline Dumbbell Press', sets: 4, reps: 8, rest: 90, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Dips', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Lateral Raises', sets: 4, reps: 12, rest: 45, equipment: ['Dumbbells'] },
        { name: 'Front Raises', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
        { name: 'Skull Crushers', sets: 4, reps: 10, rest: 45, equipment: ['Barbell', 'Bench'] },
        { name: 'Tricep Pushdown', sets: 3, reps: 12, rest: 45, equipment: ['Cable Machine'] },
      ],
      pull: [
        { name: 'Deadlift', sets: 5, reps: 5, rest: 120, equipment: ['Barbell'] },
        { name: 'Weighted Pull-ups', sets: 4, reps: 6, rest: 90, equipment: ['Pull-up Bar'] },
        { name: 'Bent Over Row', sets: 4, reps: 8, rest: 90, equipment: ['Barbell'] },
        { name: 'T-Bar Row', sets: 3, reps: 10, rest: 60, equipment: ['T-Bar Row Machine'] },
        { name: 'Face Pulls', sets: 3, reps: 15, rest: 45, equipment: ['Cable Machine'] },
        { name: 'Barbell Shrugs', sets: 3, reps: 12, rest: 45, equipment: ['Barbell'] },
        { name: 'Barbell Curl', sets: 4, reps: 10, rest: 45, equipment: ['Barbell'] },
        { name: 'Hammer Curl', sets: 3, reps: 12, rest: 45, equipment: ['Dumbbells'] },
      ],
      legs: [
        { name: 'Barbell Squat', sets: 5, reps: 5, rest: 120, equipment: ['Barbell'] },
        { name: 'Romanian Deadlift', sets: 4, reps: 8, rest: 90, equipment: ['Barbell'] },
        { name: 'Bulgarian Split Squat', sets: 3, reps: 8, rest: 90, equipment: ['Dumbbells', 'Bench'] },
        { name: 'Hip Thrust', sets: 4, reps: 8, rest: 90, equipment: ['Barbell', 'Bench'] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Leg Press', sets: 3, reps: 10, rest: 60, equipment: ['Leg Press Machine'] },
        { name: 'Leg Curl', sets: 3, reps: 12, rest: 45, equipment: ['Leg Curl Machine'] },
        { name: 'Leg Extension', sets: 3, reps: 12, rest: 45, equipment: ['Leg Extension Machine'] },
        { name: 'Standing Calf Raises', sets: 4, reps: 15, rest: 45, equipment: ['Calf Raise Machine'] },
      ],
    },
    home: {
      upper: [
        { name: 'Weighted Push-ups', sets: 4, reps: 10, rest: 60, equipment: [] },
        { name: 'Pull-ups', sets: 4, reps: 8, rest: 90, equipment: ['Pull-up Bar'] },
        { name: 'Pike Push-ups', sets: 4, reps: 10, rest: 60, equipment: [] },
        { name: 'Resistance Band Rows', sets: 4, reps: 12, rest: 60, equipment: ['Resistance Bands'] },
        { name: 'Diamond Push-ups', sets: 3, reps: 12, rest: 45, equipment: [] },
        { name: 'Resistance Band Bicep Curls', sets: 3, reps: 15, rest: 45, equipment: ['Resistance Bands'] },
      ],
      lower: [
        { name: 'Pistol Squats', sets: 4, reps: 6, rest: 90, equipment: [] },
        { name: 'Single Leg RDL', sets: 4, reps: 8, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Bulgarian Split Squats', sets: 3, reps: 10, rest: 60, equipment: ['Bench'] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Glute Bridge March', sets: 3, reps: 15, rest: 45, equipment: [] },
        { name: 'Single Leg Calf Raises', sets: 3, reps: 15, rest: 45, equipment: [] },
      ],
      full: [
        { name: 'Weighted Push-ups', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Pull-ups', sets: 3, reps: 8, rest: 90, equipment: ['Pull-up Bar'] },
        { name: 'Pistol Squats', sets: 3, reps: 6, rest: 90, equipment: [] },
        { name: 'Pike Push-ups', sets: 3, reps: 10, rest: 60, equipment: [] },
        { name: 'Bulgarian Split Squats', sets: 3, reps: 10, rest: 60, equipment: ['Bench'] },
        { name: 'Diamond Push-ups', sets: 3, reps: 12, rest: 45, equipment: [] },
        { name: 'Walking Lunges', sets: 3, reps: 12, rest: 60, equipment: ['Dumbbells'] },
        { name: 'Plank', sets: 3, reps: 60, rest: 45, equipment: [] },
      ],
    },
  },
};

// Generate a workout plan based on user profile
export function generateWorkoutPlan(userProfile: UserProfile): WorkoutPlan {
  const {
    fitnessLevel = 'beginner',
    workoutLocation = 'gym',
    daysPerWeek = 3,
    goal = 'strength',
    workoutDuration = 45
  } = userProfile;
  
  // Determine the split type and workout rotation
  let splitType: string;
  let workoutTypes: string[];
  let workoutCategories: string[];
  
  if (goal.toLowerCase().includes('glute')) {
    // Glute focused rotation avoiding consecutive lower body days
    splitType = 'glute focus';
    const rotation = [
      { name: 'Glutes A', category: 'lower' },
      { name: 'Upper Body', category: 'upper' },
      { name: 'Glutes B', category: 'lower' },
      { name: 'Core + Conditioning', category: 'full' },
      { name: 'Full Body', category: 'full' },
      { name: 'Glutes C', category: 'lower' }
    ];
    const selected = rotation.slice(0, daysPerWeek);
    workoutTypes = selected.map(r => r.name);
    workoutCategories = selected.map(r => r.category);
  } else if (daysPerWeek <= 3) {
    // Full body workouts for 3 or fewer days
    splitType = 'full';
    workoutTypes = Array(daysPerWeek).fill('Full Body');
    workoutCategories = Array(daysPerWeek).fill('full');
  } else if (daysPerWeek === 4) {
    // Upper/lower split for 4 days
    splitType = 'upper/lower';
    workoutTypes = ['Upper Body', 'Lower Body', 'Upper Body', 'Lower Body'];
    workoutCategories = ['upper', 'lower', 'upper', 'lower'];
  } else {
    // Push/Pull/Legs for 5+ days (no built-in rest days)
    splitType = 'push/pull/legs';
    const types = ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'];
    workoutTypes = types.slice(0, daysPerWeek);
    workoutCategories = workoutTypes.map(t => t.toLowerCase());
  }
  
  // Determine workout schedule (which days of the week)
  const workoutDays = generateWorkoutSchedule(daysPerWeek);

  const targetExerciseCount = (() => {
    if (workoutDuration <= 30) return 5;
    if (workoutDuration >= 60) return 8;
    return 6; // default for ~45 mins
  })();
  
  // Generate workouts for each day
  const planId = Date.now().toString();
  const workouts: Workout[] = workoutDays.map((day, index) => {
    const workoutName = workoutTypes[index];
    const exerciseCategory = workoutCategories[index];
    
    // Get exercises for this workout
    let workoutExercises: Exercise[] = [];

    if (workoutLocation === 'both') {
      const gymExercises = exercises[fitnessLevel].gym[exerciseCategory] || [];
      const homeExercises = exercises[fitnessLevel].home[exerciseCategory] || [];
      workoutExercises = [...gymExercises, ...homeExercises];
    } else if (exerciseCategory in exercises[fitnessLevel][workoutLocation]) {
      workoutExercises = [
        ...exercises[fitnessLevel][workoutLocation][exerciseCategory],
      ];
    } else {
      // Fallback to full body if the specific split isn't available
      workoutExercises = [...exercises[fitnessLevel][workoutLocation].full];
    }

    // Filter based on goal
    if (goal.toLowerCase().includes('glute') && workoutName.toLowerCase().includes('glute')) {
      const keywords = ['glute', 'hip', 'lunge', 'squat', 'deadlift'];
      const focused = workoutExercises.filter((ex) =>
        keywords.some((k) => ex.name.toLowerCase().includes(k))
      );
      if (focused.length >= 3) {
        workoutExercises = focused;
      }
    }

    // Home workouts should avoid heavy equipment
    if (workoutLocation === 'home') {
      workoutExercises = workoutExercises.filter((ex) => {
        if (!ex.equipment || ex.equipment.length === 0) return true;
        return ex.equipment.every((eq) =>
          ['Dumbbells', 'Kettlebells', 'Resistance Bands'].includes(eq)
        );
      });
    }

    // Adjust number of exercises based on duration
    if (workoutExercises.length > targetExerciseCount) {
      workoutExercises = workoutExercises.slice(0, targetExerciseCount);
    } else if (workoutExercises.length < targetExerciseCount) {
      // Repeat exercises if not enough to reach desired count
      const extra = [] as Exercise[];
      let i = 0;
      while (extra.length + workoutExercises.length < targetExerciseCount) {
        extra.push(workoutExercises[i % workoutExercises.length]);
        i++;
      }
      workoutExercises = [...workoutExercises, ...extra];
    }
    
    // Determine focus area
    let focus = 'Full Body';
    if (workoutName.toLowerCase().includes('glute')) focus = 'Glutes';
    else if (exerciseCategory === 'upper') focus = 'Upper Body';
    else if (exerciseCategory === 'lower') focus = 'Lower Body';
    else if (['push', 'pull', 'legs'].includes(exerciseCategory)) {
      focus = capitalizeFirstLetter(exerciseCategory);
    }

    // Create the workout
    return {
      id: `${planId}_${index}`,
      day,
      name: `${workoutTypes[index]} Workout`,
      type: workoutTypes[index],
      focus,
      duration: userProfile.workoutDuration,
      exercises: workoutExercises,
    };
  });
  
  // Create the complete workout plan
  return {
    id: Date.now().toString(),
    name: `${capitalizeFirstLetter(fitnessLevel)} ${splitType.toUpperCase()} Split`,
    description: `${daysPerWeek}-day workout plan focused on ${goal}`,
    duration: 8, // 8-week program
    workouts,
  };
}

// Helper function to generate workout schedule
function generateWorkoutSchedule(daysPerWeek: number): number[] {
  // Simply return sequential indexes starting from 0
  return Array.from({ length: daysPerWeek }, (_, i) => i);
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}