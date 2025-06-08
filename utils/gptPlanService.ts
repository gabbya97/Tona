import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate a personalized workout plan using GPT-3.5.
 * @param goal Desired fitness goal
 * @param level Experience level
 * @param days Number of workout days per week
 */
export async function generatePlan(
  goal: string,
  level: string,
  days: number
): Promise<any[]> {
  const messages = [
    {
      role: 'system',
      content:
        'You are a helpful fitness coach. Provide the workout plan strictly in JSON format.'
    },
    {
      role: 'user',
      content: `Create a ${days}-day workout plan for a ${level} level trainee whose goal is ${goal}. Format the response as a JSON array where each item has keys \"day\", \"focus\" and \"exercises\".`
    }
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7
  });

  const content = completion.choices[0]?.message?.content ?? '';

  try {
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse plan from OpenAI:', err);
    throw err;
  }
}
