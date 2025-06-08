import { OPENAI_API_KEY } from '@env';

export interface PlanData {
  goal: string;
  workoutLocation: string;
  daysPerWeek: number;
  workoutDuration: number;
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
  const { goal, workoutLocation, daysPerWeek, workoutDuration } = planData;

  const prompt = `\n  Create a ${goal} workout plan for a woman training ${daysPerWeek} days per week.\n  Each session should be ${workoutDuration} minutes long, to be done at ${workoutLocation}.\n  Please format the output as an array of workouts with the following structure:\n  [\n    {\n      "name": "Workout A",\n      "targetMuscles": "Glutes, Hamstrings",\n      "description": "A lower body workout focusing on glute bridges and RDLs."\n    }\n  ]\n  `;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const responseText = data.choices?.[0]?.message?.content || '[]';

    const parsedPlan: AIWorkout[] = JSON.parse(responseText);
    return {
      workouts: parsedPlan,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('AI workout generation failed:', error);
    throw new Error('Unable to generate workout plan');
  }
}
