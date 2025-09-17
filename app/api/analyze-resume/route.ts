import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

const resumeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall resume score out of 100"),
  strengths: z.array(z.string()).describe("Key strengths found in the resume"),
  weaknesses: z.array(z.string()).describe("Areas that need improvement"),
  skillsIdentified: z
    .array(
      z.object({
        skill: z.string(),
        level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
        relevance: z.enum(["High", "Medium", "Low"]),
      }),
    )
    .describe("Technical and soft skills identified"),
  experienceAnalysis: z.object({
    totalExperience: z.string().describe("Total years/months of experience"),
    relevantExperience: z.string().describe("Experience relevant to the role"),
    projectsCount: z.number().describe("Number of projects mentioned"),
    internshipsCount: z.number().describe("Number of internships/work experience"),
  }),
  educationAnalysis: z.object({
    degree: z.string().describe("Highest degree mentioned"),
    institution: z.string().describe("Educational institution"),
    gpa: z.string().optional().describe("GPA if mentioned"),
    relevantCoursework: z.array(z.string()).describe("Relevant courses mentioned"),
  }),
  recommendations: z
    .array(
      z.object({
        category: z.enum(["Skills", "Experience", "Education", "Format", "Content"]),
        suggestion: z.string(),
        priority: z.enum(["High", "Medium", "Low"]),
      }),
    )
    .describe("Specific recommendations for improvement"),
  fitForRoles: z
    .array(
      z.object({
        role: z.string(),
        fitScore: z.number().min(0).max(100),
        reasoning: z.string(),
      }),
    )
    .describe("Suitability for different roles"),
  keywordOptimization: z.object({
    missingKeywords: z.array(z.string()).describe("Important keywords missing from resume"),
    presentKeywords: z.array(z.string()).describe("Relevant keywords found in resume"),
  }),
})

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription, analysisType } = await req.json()

    if (!resumeText) {
      return Response.json({ error: "Resume text is required" }, { status: 400 })
    }

    const systemPrompt = `You are an expert resume analyzer and career counselor. Analyze the provided resume thoroughly and provide detailed, actionable feedback.

Analysis Context:
- Analysis Type: ${analysisType || "General"}
- Job Description: ${jobDescription || "Not provided"}

Focus on:
1. Technical skills assessment
2. Experience relevance and depth
3. Education background evaluation
4. Resume format and presentation
5. Keyword optimization for ATS systems
6. Industry-specific requirements
7. Actionable improvement suggestions

Be constructive, specific, and provide practical recommendations that can help improve the candidate's chances.`

    const { object } = await generateObject({
      model: openai("gpt-4"),
      schema: resumeAnalysisSchema,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Please analyze this resume:\n\n${resumeText}\n\n${jobDescription ? `Job Description for comparison:\n${jobDescription}` : ""}`,
        },
      ],
      maxOutputTokens: 2000,
    })

    return Response.json({ analysis: object })
  } catch (error) {
    console.error("Resume analysis error:", error)
    return Response.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}
