"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Send,
  Clock,
  Star,
  MessageSquare,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ResumeAnalyzer } from "@/components/resume-analyzer"

interface FacultyDashboardProps {
  activeTab: string
}

// Mock data
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "CS2021001",
    email: "john.doe@college.edu",
    course: "B.Tech CSE",
    year: "3rd Year",
    cgpa: 8.5,
    internshipStatus: "Active",
    company: "TechCorp Solutions",
    mentor: "Sarah Johnson",
    progress: 75,
    lastUpdate: "2024-01-20",
    performance: "Excellent",
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "CS2021002",
    email: "jane.smith@college.edu",
    course: "B.Tech CSE",
    year: "3rd Year",
    cgpa: 9.2,
    internshipStatus: "Completed",
    company: "Analytics Pro",
    mentor: "Mike Chen",
    progress: 100,
    lastUpdate: "2024-01-18",
    performance: "Outstanding",
  },
  {
    id: 3,
    name: "Alex Johnson",
    rollNumber: "CS2021003",
    email: "alex.johnson@college.edu",
    course: "B.Tech CSE",
    year: "3rd Year",
    cgpa: 7.8,
    internshipStatus: "Searching",
    company: "-",
    mentor: "-",
    progress: 0,
    lastUpdate: "2024-01-15",
    performance: "Needs Improvement",
  },
]

const mockEvaluations = [
  {
    id: 1,
    student: "John Doe",
    company: "TechCorp Solutions",
    type: "Mid-term",
    dueDate: "2024-02-15",
    status: "Pending",
    score: null,
  },
  {
    id: 2,
    student: "Jane Smith",
    company: "Analytics Pro",
    type: "Final",
    dueDate: "2024-01-30",
    status: "Completed",
    score: 92,
  },
  {
    id: 3,
    student: "Alex Johnson",
    company: "Creative Studios",
    type: "Initial",
    dueDate: "2024-02-20",
    status: "Overdue",
    score: null,
  },
]

const performanceData = [
  { month: "Sep", excellent: 12, good: 18, average: 8, poor: 2 },
  { month: "Oct", excellent: 15, good: 20, average: 6, poor: 1 },
  { month: "Nov", excellent: 18, good: 22, average: 5, poor: 1 },
  { month: "Dec", excellent: 20, good: 24, average: 4, poor: 0 },
]

const statusDistribution = [
  { name: "Active Internships", value: 35, color: "#d0e8d0" },
  { name: "Completed", value: 28, color: "#76c7b5" },
  { name: "Searching", value: 12, color: "#a8d5ba" },
  { name: "Applied", value: 8, color: "#5fb3a3" },
]

const departmentStats = [
  { department: "Computer Science", students: 45, placed: 38, percentage: 84 },
  { department: "Electronics", students: 32, placed: 26, percentage: 81 },
  { department: "Mechanical", students: 28, placed: 22, percentage: 79 },
  { department: "Civil", students: 25, placed: 18, percentage: 72 },
]

export function FacultyDashboard({ activeTab }: FacultyDashboardProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("all")

  const renderDashboardOverview = () => (
    <div className="space-y-6 md:space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Total Students", value: "128", change: "+5%", icon: Users, color: "text-primary" },
          { title: "Active Internships", value: "89", change: "+12%", icon: FileText, color: "text-secondary" },
          { title: "Pending Evaluations", value: "23", change: "-8%", icon: Clock, color: "text-accent" },
          { title: "Placement Rate", value: "82%", change: "+3%", icon: TrendingUp, color: "text-green-600" },
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
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm md:text-base font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
                      <p
                        className={`text-xs sm:text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change} from last month
                      </p>
                    </div>
                    <Icon className={`h-7 w-7 md:h-8 md:w-8 ${stat.color} flex-shrink-0`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Student Performance Trends</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Monthly performance distribution across all students
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="excellent" stackId="a" fill="#d0e8d0" />
                <Bar dataKey="good" stackId="a" fill="#76c7b5" />
                <Bar dataKey="average" stackId="a" fill="#a8d5ba" />
                <Bar dataKey="poor" stackId="a" fill="#5fb3a3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Internship Status Distribution</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Current status of all students in the program
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Department-wise Performance</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Internship placement statistics by department
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div
                key={dept.department}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base">{dept.department}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {dept.placed} of {dept.students} students placed
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-24 sm:w-32">
                    <Progress value={dept.percentage} className="h-2" />
                  </div>
                  <Badge
                    variant={dept.percentage >= 80 ? "default" : dept.percentage >= 70 ? "secondary" : "destructive"}
                    className="flex-shrink-0"
                  >
                    {dept.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Recent Activities</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Latest updates from students and industry partners
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-3 md:space-y-4">
            {[
              {
                activity: "John Doe submitted weekly report",
                time: "2 hours ago",
                type: "report",
                priority: "normal",
              },
              {
                activity: "New evaluation request from TechCorp",
                time: "4 hours ago",
                type: "evaluation",
                priority: "high",
              },
              {
                activity: "Jane Smith completed internship",
                time: "1 day ago",
                type: "completion",
                priority: "normal",
              },
              {
                activity: "Overdue evaluation for Alex Johnson",
                time: "2 days ago",
                type: "overdue",
                priority: "urgent",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg bg-muted/50">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    activity.priority === "urgent"
                      ? "bg-red-500"
                      : activity.priority === "high"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge
                  variant={
                    activity.priority === "urgent"
                      ? "destructive"
                      : activity.priority === "high"
                        ? "secondary"
                        : "outline"
                  }
                  className="flex-shrink-0"
                >
                  {activity.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStudentOversight = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px]"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full sm:w-48 min-h-[44px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active Internships</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="searching">Searching</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Student Overview</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Monitor all students and their internship progress
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-4">
            {mockStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow gap-4"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm md:text-base truncate">{student.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{student.rollNumber}</p>
                    <p className="text-xs text-muted-foreground">{student.course}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium">CGPA: {student.cgpa}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{student.year}</p>
                  </div>
                  <div>
                    <Badge
                      variant={
                        student.internshipStatus === "Active"
                          ? "default"
                          : student.internshipStatus === "Completed"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {student.internshipStatus}
                    </Badge>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{student.company}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs md:text-sm">Progress:</span>
                      <span className="text-xs md:text-sm font-medium">{student.progress}%</span>
                    </div>
                    <Progress value={student.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Updated: {student.lastUpdate}</p>
                  </div>
                </div>
                <div className="flex gap-2 lg:ml-4 justify-end">
                  <Button variant="outline" size="sm" className="min-h-[36px] min-w-[36px] bg-transparent">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="min-h-[36px] min-w-[36px] bg-transparent">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="min-h-[36px] min-w-[36px] bg-transparent">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderEvaluations = () => (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Evaluations</CardTitle>
              <CardDescription>Evaluations that require your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvaluations
                  .filter((evaluation) => evaluation.status !== "Completed")
                  .map((evaluation, index) => (
                    <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{evaluation.student}</h3>
                        <p className="text-sm text-muted-foreground">{evaluation.company}</p>
                        <p className="text-sm text-muted-foreground">Type: {evaluation.type}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Due Date</p>
                        <p className="text-sm text-muted-foreground">{evaluation.dueDate}</p>
                      </div>
                      <div className="text-center">
                        <Badge variant={evaluation.status === "Overdue" ? "destructive" : "secondary"}>
                          {evaluation.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Evaluate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Evaluations</CardTitle>
              <CardDescription>Previously completed student evaluations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvaluations
                  .filter((evaluation) => evaluation.status === "Completed")
                  .map((evaluation, index) => (
                    <div key={evaluation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{evaluation.student}</h3>
                        <p className="text-sm text-muted-foreground">{evaluation.company}</p>
                        <p className="text-sm text-muted-foreground">Type: {evaluation.type}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Score</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold">{evaluation.score}/100</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge variant="default">Completed</Badge>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Evaluation</CardTitle>
              <CardDescription>Set up a new evaluation for a student</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="student">Select Student</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose student" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name} - {student.rollNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Evaluation Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial">Initial Assessment</SelectItem>
                      <SelectItem value="midterm">Mid-term Review</SelectItem>
                      <SelectItem value="final">Final Evaluation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input type="date" id="dueDate" />
              </div>
              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea id="instructions" placeholder="Provide evaluation instructions and criteria..." rows={4} />
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Create Evaluation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>Create comprehensive reports for administration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student-progress">Student Progress Report</SelectItem>
                  <SelectItem value="placement-stats">Placement Statistics</SelectItem>
                  <SelectItem value="company-feedback">Company Feedback Summary</SelectItem>
                  <SelectItem value="department-performance">Department Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input type="date" id="startDate" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input type="date" id="endDate" />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Department (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cse">Computer Science</SelectItem>
                  <SelectItem value="ece">Electronics</SelectItem>
                  <SelectItem value="mech">Mechanical</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Total Students Supervised", value: "128", trend: "+5" },
                { label: "Active Internships", value: "89", trend: "+12" },
                { label: "Completed This Semester", value: "45", trend: "+8" },
                { label: "Average Rating", value: "4.2/5", trend: "+0.3" },
                { label: "Industry Partners", value: "34", trend: "+6" },
                { label: "Pending Evaluations", value: "23", trend: "-5" },
              ].map((stat, index) => (
                <div key={stat.label} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">{stat.label}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold">{stat.value}</span>
                    <span className="text-xs text-green-600 ml-2">+{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "Q4 Placement Statistics Report",
                type: "PDF",
                date: "2024-01-15",
                size: "2.4 MB",
              },
              {
                name: "Student Progress Summary - December",
                type: "Excel",
                date: "2024-01-10",
                size: "1.8 MB",
              },
              {
                name: "Company Feedback Analysis",
                type: "PDF",
                date: "2024-01-05",
                size: "3.1 MB",
              },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • {report.size} • {report.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Calendar</CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  date: "2024-02-15",
                  title: "Mid-term Evaluations Due",
                  type: "deadline",
                  description: "All mid-term evaluations must be submitted",
                },
                {
                  date: "2024-02-20",
                  title: "Industry Partner Meeting",
                  type: "meeting",
                  description: "Quarterly review with industry partners",
                },
                {
                  date: "2024-02-25",
                  title: "Student Presentation Day",
                  type: "event",
                  description: "Students present their internship projects",
                },
                {
                  date: "2024-03-01",
                  title: "Final Report Submissions",
                  type: "deadline",
                  description: "Final internship reports due",
                },
              ].map((event, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      event.type === "deadline"
                        ? "bg-red-500"
                        : event.type === "meeting"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <Badge
                        variant={
                          event.type === "deadline" ? "destructive" : event.type === "meeting" ? "default" : "secondary"
                        }
                      >
                        {event.date}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Create Evaluation
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Bulk Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communication with students and industry partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  sender: "John Doe",
                  role: "Student",
                  subject: "Weekly Report Submission",
                  message:
                    "I have submitted my weekly report for review. Please let me know if you need any additional information.",
                  time: "2 hours ago",
                  unread: true,
                  priority: "normal",
                },
                {
                  sender: "Sarah Johnson",
                  role: "Industry Mentor",
                  subject: "Student Performance Update",
                  message:
                    "John has been performing exceptionally well. His technical skills have improved significantly.",
                  time: "4 hours ago",
                  unread: true,
                  priority: "high",
                },
                {
                  sender: "Jane Smith",
                  role: "Student",
                  subject: "Internship Completion Certificate",
                  message:
                    "Could you please provide the internship completion certificate? I need it for my placement applications.",
                  time: "1 day ago",
                  unread: false,
                  priority: "normal",
                },
              ].map((message, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg ${message.unread ? "bg-primary/5 border-primary/20" : ""}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{message.sender}</h4>
                      <p className="text-xs text-muted-foreground">{message.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{message.time}</p>
                      {message.unread && <div className="w-2 h-2 bg-primary rounded-full mt-1 ml-auto" />}
                    </div>
                  </div>
                  <h5 className="font-medium text-sm mb-1">{message.subject}</h5>
                  <p className="text-sm text-muted-foreground mb-3">{message.message}</p>
                  <div className="flex gap-2">
                    <Button size="sm">Reply</Button>
                    <Button variant="outline" size="sm">
                      Forward
                    </Button>
                    <Button variant="ghost" size="sm">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Send a message to students or partners</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipient">To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-students">All Students</SelectItem>
                  <SelectItem value="active-interns">Active Interns</SelectItem>
                  <SelectItem value="industry-partners">Industry Partners</SelectItem>
                  <SelectItem value="individual">Individual Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Message subject" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message..." rows={6} />
            </div>
            <Button className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderResumeAnalyzer = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Analyzer</CardTitle>
          <CardDescription>
            Analyze student resumes and automatically score candidates based on job requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResumeAnalyzer userType="faculty" />
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardOverview()
      case "students":
        return renderStudentOversight()
      case "evaluations":
        return renderEvaluations()
      case "reports":
        return renderReports()
      case "calendar":
        return renderCalendar()
      case "messages":
        return renderMessages()
      case "resume-analyzer":
        return renderResumeAnalyzer()
      default:
        return renderDashboardOverview()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6 space-y-6"
    >
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Faculty Coordinator Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Oversee student progress and manage evaluations
        </p>
      </div>

      {renderContent()}
    </motion.div>
  )
}
