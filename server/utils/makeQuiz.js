import { OpenAI}  from 'openai'

const openai = new OpenAI({
    apiKey:process.env.OPEN_API_KEY
});

export const makeQuizAi = async ({name,description,numberOfQuestions}) =>{
    const prompt =`
     You are a quiz generator AI.

Generate a quiz titled "${name}".
Description: ${description}
Total questions: ${numberOfQuestions}

Each question should be formatted as a JSON object like:

{
  "questionDesc": "Question?",
  "options": [
    { "text": "Option A", "isCorrect": true/false },
    ...
  ],
  "correctAnswer": "Correct answer text",
  "points": 1,
  "questionType": "MCQ",
  "explanation": "Why this answer is correct"
}

Return ONLY a JSON array of these question objects.
    `;
    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[
            {
                role: 'system',content:'You are a helpful quiz generator.'
            },
            {
                role:'user',content:prompt
            }
        ],
        temperature:0.7,
    })
    const content = response.choices[0].message.content;
    console.log("REsone : ",content);
    console.log("Raw : ",response);
    try {
        return JSON.parse(content);
    } catch (error) {
        console.error("Error parsing ",error);
        throw new Error('Invalid JSON from Open AI');
    }
}