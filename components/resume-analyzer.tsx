"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Upload,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Award,
  Briefcase,
  GraduationCap,
  Search,
  Download,
  Eye,
  Star,
  Zap,
  BarChart3,
} from "lucide-react"

interface ResumeAnalyzerProps {
  userType: "faculty" | "industry"
  className?: string
}

interface ResumeAnalysis {
  overallScore: number
  strengths: string[]
  weaknesses: string[]
  skillsIdentified: Array<{
    skill: string
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    relevance: "High" | "Medium" | "Low"
  }>
  experienceAnalysis: {
    totalExperience: string
    relevantExperience: string
    projectsCount: number
    internshipsCount: number
  }
  educationAnalysis: {
    degree: string
    institution: string
    gpa?: string
    relevantCoursework: string[]
  }
  recommendations: Array<{
    category: "Skills" | "Experience" | "Education" | "Format" | "Content"
    suggestion: string
    priority: "High" | "Medium" | "Low"
  }>
  fitForRoles: Array<{
    role: string
    fitScore: number
    reasoning: string
  }>
  keywordOptimization: {
    missingKeywords: string[]
    presentKeywords: string[]
  }
}

export function ResumeAnalyzer({ userType, className }: ResumeAnalyzerProps) {
  const [resumeText, setResumeText] = React.useState("")
  const [jobDescription, setJobDescription] = React.useState("")
  const [analysisType, setAnalysisType] = React.useState("general")
  const [analysis, setAnalysis] = React.useState<ResumeAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // In a real implementation, you would extract text from PDF/DOC files
      // For now, we'll simulate this
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setResumeText(text)
      }
      reader.readAsText(file)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          analysisType,
        }),
      })

      const data = await response.json()
      if (data.analysis) {
        setAnalysis(data.analysis)
      }
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">AI Resume Analyzer</h2>
          </motion.div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload and analyze student resumes with AI-powered insights, skill assessment, and improvement
            recommendations.
          </p>
        </div>

        {/* Upload and Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Resume Upload & Analysis Setup
            </CardTitle>
            <CardDescription>Upload a resume file or paste the text content for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume-file">Upload Resume File</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop a resume file or click to browse</p>
                <Input
                  id="resume-file"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button variant="outline" onClick={() => document.getElementById("resume-file")?.click()}>
                  Choose File
                </Button>
                {selectedFile && <p className="text-sm text-primary mt-2">Selected: {selectedFile.name}</p>}
              </div>
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="resume-text">Or Paste Resume Text</Label>
              <Textarea
                id="resume-text"
                placeholder="Paste the resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={8}
                className="min-h-[200px]"
              />
            </div>

            {/* Analysis Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="analysis-type">Analysis Type</Label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Analysis</SelectItem>
                    <SelectItem value="technical">Technical Roles</SelectItem>
                    <SelectItem value="internship">Internship Focused</SelectItem>
                    <SelectItem value="entry-level">Entry Level Positions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-description">Job Description (Optional)</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste job description for targeted analysis..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Analyze Button */}
            <Button onClick={handleAnalyze} disabled={!resumeText.trim() || isAnalyzing} className="w-full" size="lg">
              {isAnalyzing ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Analyze Resume
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Overall Resume Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)} mb-2`}>
                        {analysis.overallScore}
                      </div>
                      <div className="text-lg text-muted-foreground">out of 100</div>
                      <Badge variant={getScoreBadgeVariant(analysis.overallScore)} className="mt-2">
                        {analysis.overallScore >= 80
                          ? "Excellent"
                          : analysis.overallScore >= 60
                            ? "Good"
                            : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={analysis.overallScore} className="h-3" />
                </CardContent>
              </Card>

              {/* Detailed Analysis Tabs */}
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="fit">Role Fit</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          Strengths
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysis.strengths.map((strength, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Weaknesses */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="h-5 w-5" />
                          Areas for Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysis.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{weakness}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Keywords */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" />
                        Keyword Optimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-3">Present Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywordOptimization.presentKeywords.map((keyword, index) => (
                              <Badge key={index} variant="default" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-3">Missing Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywordOptimization.missingKeywords.map((keyword, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Skills Assessment
                      </CardTitle>
                      <CardDescription>Identified skills with proficiency levels and relevance ratings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysis.skillsIdentified.map((skill, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{skill.skill}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {skill.level}
                                </Badge>
                                <Badge variant={getRelevanceColor(skill.relevance)} className="text-xs">
                                  {skill.relevance} Relevance
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i <
                                    (
                                      skill.level === "Expert"
                                        ? 5
                                        : skill.level === "Advanced"
                                          ? 4
                                          : skill.level === "Intermediate"
                                            ? 3
                                            : 2
                                    )
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Experience Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {analysis.experienceAnalysis.totalExperience}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Experience</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-secondary">
                            {analysis.experienceAnalysis.relevantExperience}
                          </div>
                          <div className="text-sm text-muted-foreground">Relevant Experience</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-accent">
                            {analysis.experienceAnalysis.projectsCount}
                          </div>
                          <div className="text-sm text-muted-foreground">Projects</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-muted-foreground">
                            {analysis.experienceAnalysis.internshipsCount}
                          </div>
                          <div className="text-sm text-muted-foreground">Internships</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Degree</Label>
                            <p className="text-lg">{analysis.educationAnalysis.degree}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Institution</Label>
                            <p className="text-lg">{analysis.educationAnalysis.institution}</p>
                          </div>
                          {analysis.educationAnalysis.gpa && (
                            <div>
                              <Label className="text-sm font-medium">GPA</Label>
                              <p className="text-lg">{analysis.educationAnalysis.gpa}</p>
                            </div>
                          )}
                        </div>

                        {analysis.educationAnalysis.relevantCoursework.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Relevant Coursework</Label>
                            <div className="flex flex-wrap gap-2">
                              {analysis.educationAnalysis.relevantCoursework.map((course, index) => (
                                <Badge key={index} variant="outline">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Improvement Recommendations
                      </CardTitle>
                      <CardDescription>Actionable suggestions to enhance the resume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysis.recommendations.map((rec, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{rec.category}</Badge>
                                <Badge variant={getPriorityColor(rec.priority)}>{rec.priority} Priority</Badge>
                              </div>
                            </div>
                            <p className="text-sm">{rec.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fit" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Role Fit Analysis
                      </CardTitle>
                      <CardDescription>Suitability assessment for different job roles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysis.fitForRoles.map((role, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">{role.role}</h4>
                              <div className="flex items-center gap-2">
                                <span className={`text-lg font-bold ${getScoreColor(role.fitScore)}`}>
                                  {role.fitScore}%
                                </span>
                                <Badge variant={getScoreBadgeVariant(role.fitScore)}>
                                  {role.fitScore >= 80
                                    ? "Excellent Fit"
                                    : role.fitScore >= 60
                                      ? "Good Fit"
                                      : "Moderate Fit"}
                                </Badge>
                              </div>
                            </div>
                            <Progress value={role.fitScore} className="h-2 mb-3" />
                            <p className="text-sm text-muted-foreground">{role.reasoning}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Share with Student
                </Button>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Analyze Another Resume
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
