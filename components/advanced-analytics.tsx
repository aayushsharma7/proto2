"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, Building2, Target, Award, Clock, Brain } from "lucide-react"
import { Download } from "lucide-react" // Import Download icon
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"

interface AdvancedAnalyticsProps {
  userType: "student" | "faculty" | "industry" | "admin"
  className?: string
}

// Mock data for different analytics
const studentAnalyticsData = {
  applicationTrends: [
    { month: "Jan", applications: 5, success: 1, interviews: 2, rejections: 2 },
    { month: "Feb", applications: 8, success: 2, interviews: 4, rejections: 2 },
    { month: "Mar", applications: 12, success: 3, interviews: 6, rejections: 3 },
    { month: "Apr", applications: 15, success: 4, interviews: 8, rejections: 3 },
    { month: "May", applications: 18, success: 5, interviews: 10, rejections: 3 },
  ],
  skillProgress: [
    { skill: "Technical", current: 75, target: 85, industry: 80 },
    { skill: "Communication", current: 68, target: 80, industry: 75 },
    { skill: "Problem Solving", current: 82, target: 90, industry: 85 },
    { skill: "Leadership", current: 60, target: 75, industry: 70 },
    { skill: "Teamwork", current: 88, target: 90, industry: 85 },
  ],
  competitorAnalysis: [
    { category: "Applications", you: 24, peers: 18, topPerformers: 35 },
    { category: "Interview Rate", you: 33, peers: 28, topPerformers: 45 },
    { category: "Success Rate", you: 21, peers: 15, topPerformers: 28 },
  ],
  timeAnalysis: [
    { activity: "Job Search", hours: 15, efficiency: 78 },
    { activity: "Skill Learning", hours: 25, efficiency: 85 },
    { activity: "Interview Prep", hours: 12, efficiency: 72 },
    { activity: "Networking", hours: 8, efficiency: 65 },
  ],
}

const facultyAnalyticsData = {
  studentPerformance: [
    { month: "Jan", excellent: 12, good: 18, average: 8, poor: 2 },
    { month: "Feb", excellent: 15, good: 20, average: 6, poor: 1 },
    { month: "Mar", excellent: 18, good: 22, average: 5, poor: 1 },
    { month: "Apr", excellent: 20, good: 24, average: 4, poor: 0 },
  ],
  placementPrediction: [
    { student: "High Performers", predicted: 95, actual: 92, confidence: 98 },
    { student: "Average Performers", predicted: 78, actual: 75, confidence: 85 },
    { student: "Struggling Students", predicted: 45, actual: 48, confidence: 72 },
  ],
  interventionImpact: [
    { intervention: "Extra Mentoring", before: 65, after: 82, improvement: 17 },
    { intervention: "Skill Workshops", before: 58, after: 78, improvement: 20 },
    { intervention: "Mock Interviews", before: 62, after: 85, improvement: 23 },
  ],
  departmentComparison: [
    { department: "CSE", students: 45, placed: 38, satisfaction: 4.2 },
    { department: "ECE", students: 32, placed: 26, satisfaction: 4.0 },
    { department: "Mech", students: 28, placed: 22, satisfaction: 3.8 },
    { department: "Civil", students: 25, placed: 18, satisfaction: 3.6 },
  ],
}

const industryAnalyticsData = {
  hiringFunnel: [
    { stage: "Applications", count: 234, conversion: 100 },
    { stage: "Resume Screen", count: 156, conversion: 67 },
    { stage: "Phone Screen", count: 89, conversion: 38 },
    { stage: "Technical Interview", count: 45, conversion: 19 },
    { stage: "Final Interview", count: 23, conversion: 10 },
    { stage: "Offers", count: 20, conversion: 9 },
  ],
  candidateQuality: [
    { source: "Top Colleges", quality: 85, volume: 45, cost: 120 },
    { source: "Mid-tier Colleges", quality: 72, volume: 89, cost: 80 },
    { source: "Rural Colleges", quality: 68, volume: 67, cost: 60 },
    { source: "Online Platforms", quality: 75, volume: 123, cost: 95 },
  ],
  internPerformance: [
    { metric: "Task Completion", score: 88, benchmark: 85 },
    { metric: "Code Quality", score: 82, benchmark: 80 },
    { metric: "Communication", score: 79, benchmark: 75 },
    { metric: "Initiative", score: 85, benchmark: 78 },
    { metric: "Learning Speed", score: 91, benchmark: 82 },
  ],
  roiAnalysis: [
    { quarter: "Q1", investment: 50000, productivity: 75000, roi: 50 },
    { quarter: "Q2", investment: 65000, productivity: 95000, roi: 46 },
    { quarter: "Q3", investment: 70000, productivity: 110000, roi: 57 },
    { quarter: "Q4", investment: 75000, productivity: 125000, roi: 67 },
  ],
}

const adminAnalyticsData = {
  systemMetrics: [
    { metric: "Platform Usage", value: 89, trend: 12, status: "up" },
    { metric: "User Satisfaction", value: 4.3, trend: 0.2, status: "up" },
    { metric: "Success Rate", value: 76, trend: -2, status: "down" },
    { metric: "Response Time", value: 1.2, trend: -0.3, status: "up" },
  ],
  regionalPerformance: [
    { region: "North", students: 1250, placements: 975, growth: 15 },
    { region: "South", students: 1450, placements: 1160, growth: 12 },
    { region: "East", students: 980, placements: 735, growth: 8 },
    { region: "West", students: 1100, placements: 880, growth: 18 },
  ],
  predictiveInsights: [
    { insight: "Placement Rate", current: 78, predicted: 82, confidence: 85 },
    { insight: "User Growth", current: 15, predicted: 22, confidence: 78 },
    { insight: "Rural Participation", current: 35, predicted: 45, confidence: 92 },
  ],
}

export function AdvancedAnalytics({ userType, className }: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = React.useState("6months")
  const [selectedMetric, setSelectedMetric] = React.useState("all")

  const renderStudentAnalytics = () => (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Success Rate", value: "21%", change: "+5%", icon: Target, color: "text-green-500" },
          { title: "Interview Rate", value: "33%", change: "+8%", icon: Users, color: "text-blue-500" },
          { title: "Skill Score", value: "78/100", change: "+12", icon: Brain, color: "text-purple-500" },
          { title: "Market Position", value: "Top 25%", change: "+3%", icon: TrendingUp, color: "text-orange-500" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-green-600">{stat.change} vs peers</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Success Funnel</CardTitle>
            <CardDescription>Track your application journey and identify improvement areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={studentAnalyticsData.applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stackId="1" stroke="#d0e8d0" fill="#d0e8d0" />
                <Area type="monotone" dataKey="interviews" stackId="1" stroke="#76c7b5" fill="#76c7b5" />
                <Area type="monotone" dataKey="success" stackId="1" stroke="#2d7a6b" fill="#2d7a6b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Development Radar</CardTitle>
            <CardDescription>Compare your skills with industry standards and targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={studentAnalyticsData.skillProgress}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current" dataKey="current" stroke="#d0e8d0" fill="#d0e8d0" fillOpacity={0.3} />
                <Radar name="Target" dataKey="target" stroke="#76c7b5" fill="#76c7b5" fillOpacity={0.3} />
                <Radar name="Industry" dataKey="industry" stroke="#2d7a6b" fill="#2d7a6b" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Peer Comparison Analysis</CardTitle>
          <CardDescription>See how you stack up against your peers and top performers</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentAnalyticsData.competitorAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="you" fill="#2d7a6b" name="You" />
              <Bar dataKey="peers" fill="#76c7b5" name="Peer Average" />
              <Bar dataKey="topPerformers" fill="#d0e8d0" name="Top 10%" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Time Efficiency Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Time Investment & Efficiency</CardTitle>
          <CardDescription>Optimize your time allocation for maximum impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentAnalyticsData.timeAnalysis.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.activity}</span>
                    <span className="text-sm text-muted-foreground">{item.hours}h/week</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={item.efficiency} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">{item.efficiency}% efficient</span>
                  </div>
                </div>
                <div className="ml-4">
                  <Badge
                    variant={item.efficiency >= 80 ? "default" : item.efficiency >= 70 ? "secondary" : "destructive"}
                  >
                    {item.efficiency >= 80 ? "Optimal" : item.efficiency >= 70 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderFacultyAnalytics = () => (
    <div className="space-y-6">
      {/* Faculty KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Student Success Rate", value: "84%", change: "+7%", icon: Award, color: "text-green-500" },
          { title: "Avg. Placement Time", value: "45 days", change: "-8 days", icon: Clock, color: "text-blue-500" },
          { title: "Industry Satisfaction", value: "4.2/5", change: "+0.3", icon: Building2, color: "text-purple-500" },
          { title: "Intervention Impact", value: "23%", change: "+5%", icon: TrendingUp, color: "text-orange-500" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-green-600">{stat.change} improvement</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Advanced Faculty Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Predictive Placement Analytics</CardTitle>
            <CardDescription>AI-powered predictions for student placement success</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={facultyAnalyticsData.placementPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="student" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="predicted" fill="#d0e8d0" name="Predicted %" />
                <Bar dataKey="actual" fill="#76c7b5" name="Actual %" />
                <Line type="monotone" dataKey="confidence" stroke="#2d7a6b" name="Confidence %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intervention Effectiveness</CardTitle>
            <CardDescription>Measure the impact of your teaching interventions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facultyAnalyticsData.interventionImpact.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{item.intervention}</span>
                    <Badge variant="default">+{item.improvement}%</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Before</p>
                      <p className="text-lg font-bold">{item.before}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">After</p>
                      <p className="text-lg font-bold text-green-600">{item.after}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Matrix</CardTitle>
          <CardDescription>Compare placement rates and satisfaction across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={facultyAnalyticsData.departmentComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="placed" name="Placements" />
              <YAxis dataKey="satisfaction" name="Satisfaction" />
              <ZAxis dataKey="students" range={[50, 400]} name="Students" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Departments" data={facultyAnalyticsData.departmentComparison} fill="#76c7b5" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderIndustryAnalytics = () => (
    <div className="space-y-6">
      {/* Industry KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Hiring Efficiency", value: "67%", change: "+12%", icon: Target, color: "text-green-500" },
          { title: "Cost per Hire", value: "₹8,500", change: "-15%", icon: TrendingDown, color: "text-blue-500" },
          { title: "Intern Retention", value: "89%", change: "+8%", icon: Users, color: "text-purple-500" },
          { title: "ROI on Interns", value: "156%", change: "+23%", icon: TrendingUp, color: "text-orange-500" },
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-green-600">{stat.change} vs last quarter</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Advanced Industry Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel Optimization</CardTitle>
            <CardDescription>Identify bottlenecks in your recruitment process</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={industryAnalyticsData.hiringFunnel}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#2d7a6b" fill="#d0e8d0" />
                <Line type="monotone" dataKey="conversion" stroke="#76c7b5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Source Analysis</CardTitle>
            <CardDescription>Quality vs Volume vs Cost analysis by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={industryAnalyticsData.candidateQuality}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="volume" name="Volume" />
                <YAxis dataKey="quality" name="Quality Score" />
                <ZAxis dataKey="cost" range={[50, 300]} name="Cost per Hire" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Sources" data={industryAnalyticsData.candidateQuality} fill="#76c7b5" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance & ROI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Intern Performance Metrics</CardTitle>
            <CardDescription>Track intern performance against industry benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={industryAnalyticsData.internPerformance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Your Interns" dataKey="score" stroke="#2d7a6b" fill="#d0e8d0" fillOpacity={0.3} />
                <Radar
                  name="Industry Benchmark"
                  dataKey="benchmark"
                  stroke="#76c7b5"
                  fill="#76c7b5"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROI Trend Analysis</CardTitle>
            <CardDescription>Return on investment from your internship program</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={industryAnalyticsData.roiAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="investment" fill="#d0e8d0" name="Investment (₹)" />
                <Bar yAxisId="left" dataKey="productivity" fill="#76c7b5" name="Productivity (₹)" />
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#2d7a6b" name="ROI %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAdminAnalytics = () => (
    <div className="space-y-6">
      {/* System Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {adminAnalyticsData.systemMetrics.map((metric, index) => {
          const Icon = metric.status === "up" ? TrendingUp : TrendingDown
          return (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                      <p className="text-2xl font-bold">
                        {metric.value}
                        {metric.metric.includes("Rate") ? "%" : metric.metric.includes("Time") ? "s" : ""}
                      </p>
                      <p className={`text-xs ${metric.status === "up" ? "text-green-600" : "text-red-600"}`}>
                        {metric.status === "up" ? "+" : ""}
                        {metric.trend} {metric.metric.includes("Time") ? "faster" : "improvement"}
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${metric.status === "up" ? "text-green-500" : "text-red-500"}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Regional Performance & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance Dashboard</CardTitle>
            <CardDescription>Track performance and growth across different regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={adminAnalyticsData.regionalPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="students" fill="#d0e8d0" name="Total Students" />
                <Bar yAxisId="left" dataKey="placements" fill="#76c7b5" name="Placements" />
                <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#2d7a6b" name="Growth %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Predictions</CardTitle>
            <CardDescription>Machine learning insights for strategic planning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminAnalyticsData.predictiveInsights.map((insight, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{insight.insight}</span>
                    <Badge variant={insight.confidence >= 85 ? "default" : "secondary"}>
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="text-lg font-bold">{insight.current}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Predicted</p>
                      <p className="text-lg font-bold text-blue-600">{insight.predicted}%</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={(insight.predicted / insight.current) * 50} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Usage Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Usage Analytics</CardTitle>
          <CardDescription>Comprehensive view of platform engagement and feature adoption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Feature Adoption</h4>
              {[
                { feature: "Job Applications", usage: 92 },
                { feature: "Skill Development", usage: 78 },
                { feature: "Mentorship", usage: 65 },
                { feature: "AI Assistant", usage: 58 },
                { feature: "Rural Access", usage: 43 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.feature}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={item.usage} className="w-16 h-2" />
                    <span className="text-sm font-medium">{item.usage}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">User Engagement</h4>
              {[
                { metric: "Daily Active Users", value: "12,450", change: "+8%" },
                { metric: "Session Duration", value: "24 min", change: "+12%" },
                { metric: "Page Views", value: "156K", change: "+15%" },
                { metric: "Feature Usage", value: "78%", change: "+5%" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{item.metric}</span>
                  <div className="text-right">
                    <p className="font-medium">{item.value}</p>
                    <p className="text-xs text-green-600">{item.change}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">System Health</h4>
              {[
                { metric: "Uptime", value: "99.8%", status: "excellent" },
                { metric: "Response Time", value: "1.2s", status: "good" },
                { metric: "Error Rate", value: "0.1%", status: "excellent" },
                { metric: "User Satisfaction", value: "4.3/5", status: "good" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{item.metric}</span>
                  <div className="text-right">
                    <p className="font-medium">{item.value}</p>
                    <Badge variant={item.status === "excellent" ? "default" : "secondary"} className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => {
    switch (userType) {
      case "student":
        return renderStudentAnalytics()
      case "faculty":
        return renderFacultyAnalytics()
      case "industry":
        return renderIndustryAnalytics()
      case "admin":
        return renderAdminAnalytics()
      default:
        return renderStudentAnalytics()
    }
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics</h2>
          <p className="text-muted-foreground">
            {userType === "student" && "Deep insights into your internship journey and career progress"}
            {userType === "faculty" && "Comprehensive analytics for student performance and placement success"}
            {userType === "industry" && "Data-driven insights for optimizing your internship program"}
            {userType === "admin" && "System-wide analytics and predictive insights for strategic planning"}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {renderAnalytics()}
    </div>
  )
}
