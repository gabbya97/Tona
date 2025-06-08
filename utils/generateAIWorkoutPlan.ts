import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@env';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export interface PlanData {
  goal: string;
  workoutLocation: string;
  daysPerWeek: number;
  workoutDuration: number;
  trainingFocus: string[];
}

export interface AIWorkout {
  name: string;
  targetMuscles: string;
  description: string;
}

export interface AIWorkoutPlan {
  workouts: AIWorkout[];
  createdAt: string;
}

export async function generateAIWorkoutPlan(planData: PlanData): Promise<AIWorkoutPlan> {
  const { goal, workoutLocation, daysPerWeek, workoutDuration, trainingFocus } = planData;

  const prompt = `
Create a ${goal.toLowerCase()} workout plan for a woman training ${daysPerWeek} days per week.
Focus areas: ${trainingFocus.join(', ')}.
Session duration: ${workoutDuration} minutes.
Location: ${workoutLocation === 'home' ? 'home (limited equipment)' : 'gym (full equipment)'}.

Please return the result in this exact JSON format:

[
  {
    "name": "Workout A",
    "targetMuscles": "Glutes, Hamstrings",
    "description": "A lower body session including glute bridges and RDLs."
  },
  {
    "name": "Workout B",
    "targetMuscles": "Back, Biceps",
    "description": "Upper body strength work using dumbbells and pull exercises."
  }
]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt.trim() }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    let workouts = [] as AIWorkout[];
    try {
      workouts = JSON.parse(content || '[]');
    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', parseError);
    }

    return {
      createdAt: new Date().toISOString(),
      workouts: workouts || [],
    };
  } catch (error) {
    console.error('❌ Failed to fetch AI workout plan:', error);
    return {
      createdAt: new Date().toISOString(),
      workouts: [],
    };
  }
}
