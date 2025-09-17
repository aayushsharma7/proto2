import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText } from "ai"
import type { Message } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json()

  const systemPrompt = `You are an AI learning assistant for internship preparation. Your role is to help students:

1. Practice interview skills with mock questions
2. Learn new technical concepts and skills
3. Get career guidance and advice
4. Understand industry trends and requirements
5. Improve communication and soft skills

Guidelines:
- Be encouraging and supportive
- Provide practical, actionable advice
- Ask follow-up questions to understand their needs
- Offer specific examples and scenarios
- Help them practice with realistic situations
- Focus on internship and career readiness

Keep responses concise but helpful. Always be professional yet friendly.`

  const prompt = [{ role: "system" as const, content: systemPrompt }, ...convertToModelMessages(messages)]

  const result = streamText({
    model: openai("gpt-4"),
    messages: prompt,
    maxOutputTokens: 1000,
    temperature: 0.7,
    abortSignal: req.signal,
  })

  return result.toDataStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("AI Chat aborted")
      }
    },
  })
}
