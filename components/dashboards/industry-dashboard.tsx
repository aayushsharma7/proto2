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
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Send,
  Star,
  MessageSquare,
  Calendar,
  Award,
  CheckCircle,
  XCircle,
  GraduationCap,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface IndustryDashboardProps {
  activeTab: string
}

// Mock data
const mockJobPostings = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    department: "Engineering",
    type: "Remote",
    duration: "3 months",
    stipend: "₹15,000/month",
    skills: ["React", "JavaScript", "CSS"],
    applications: 45,
    status: "Active",
    postedDate: "2024-01-10",
    deadline: "2024-02-15",
    description: "Work on modern web applications using React and TypeScript.",
  },
  {
    id: 2,
    title: "Data Science Intern",
    department: "Analytics",
    type: "Hybrid",
    duration: "6 months",
    stipend: "₹20,000/month",
    skills: ["Python", "Machine Learning", "SQL"],
    applications: 67,
    status: "Active",
    postedDate: "2024-01-05",
    deadline: "2024-02-20",
    description: "Analyze large datasets and build predictive models.",
  },
  {
    id: 3,
    title: "Marketing Intern",
    department: "Marketing",
    type: "On-site",
    duration: "4 months",
    stipend: "₹12,000/month",
    skills: ["Digital Marketing", "Content Creation", "Analytics"],
    applications: 32,
    status: "Closed",
    postedDate: "2023-12-15",
    deadline: "2024-01-30",
    description: "Support marketing campaigns and content creation.",
  },
]

const mockCandidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@college.edu",
    college: "ABC Engineering College",
    course: "B.Tech CSE",
    cgpa: 8.5,
    skills: ["React", "JavaScript", "Node.js"],
    appliedFor: "Frontend Developer Intern",
    appliedDate: "2024-01-15",
    status: "Under Review",
    resumeScore: 85,
    experience: "2 projects, 1 internship",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@college.edu",
    college: "XYZ University",
    course: "B.Tech CSE",
    cgpa: 9.2,
    skills: ["Python", "Machine Learning", "SQL"],
    appliedFor: "Data Science Intern",
    appliedDate: "2024-01-12",
    status: "Interview Scheduled",
    resumeScore: 92,
    experience: "3 projects, ML research",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex.johnson@college.edu",
    college: "DEF Institute",
    course: "B.Tech CSE",
    cgpa: 7.8,
    skills: ["React", "JavaScript", "CSS"],
    appliedFor: "Frontend Developer Intern",
    appliedDate: "2024-01-18",
    status: "Rejected",
    resumeScore: 72,
    experience: "1 project",
  },
]

const mockInterns = [
  {
    id: 1,
    name: "Sarah Wilson",
    position: "Frontend Developer Intern",
    department: "Engineering",
    startDate: "2024-01-01",
    endDate: "2024-04-01",
    mentor: "Mike Chen",
    progress: 75,
    performance: "Excellent",
    tasksCompleted: 12,
    totalTasks: 16,
    lastUpdate: "2024-01-20",
  },
  {
    id: 2,
    name: "David Brown",
    position: "Data Science Intern",
    department: "Analytics",
    startDate: "2023-12-01",
    endDate: "2024-06-01",
    mentor: "Lisa Zhang",
    progress: 60,
    performance: "Good",
    tasksCompleted: 8,
    totalTasks: 15,
    lastUpdate: "2024-01-18",
  },
]

const applicationTrends = [
  { month: "Sep", applications: 45, hired: 8 },
  { month: "Oct", applications: 62, hired: 12 },
  { month: "Nov", applications: 78, hired: 15 },
  { month: "Dec", applications: 89, hired: 18 },
  { month: "Jan", applications: 95, hired: 20 },
]

const departmentData = [
  { name: "Engineering", interns: 15, color: "#d0e8d0" },
  { name: "Analytics", interns: 8, color: "#76c7b5" },
  { name: "Marketing", interns: 6, color: "#a8d5ba" },
  { name: "Design", interns: 4, color: "#5fb3a3" },
]

const performanceMetrics = [
  { metric: "Application Response Rate", value: 78, target: 80 },
  { metric: "Interview Conversion", value: 65, target: 70 },
  { metric: "Intern Retention", value: 92, target: 85 },
  { metric: "Project Completion", value: 88, target: 90 },
]

export function IndustryDashboard({ activeTab }: IndustryDashboardProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("all")

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Job Postings", value: "12", change: "+3", icon: FileText, color: "text-primary" },
          { title: "Total Applications", value: "234", change: "+18%", icon: Users, color: "text-secondary" },
          { title: "Current Interns", value: "23", change: "+5", icon: GraduationCap, color: "text-accent" },
          { title: "Completion Rate", value: "88%", change: "+2%", icon: Award, color: "text-green-600" },
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
                      <p className="text-xs text-green-600">{stat.change} from last month</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application & Hiring Trends</CardTitle>
            <CardDescription>Monthly application volume and hiring success</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#d0e8d0" strokeWidth={2} name="Applications" />
                <Line type="monotone" dataKey="hired" stroke="#76c7b5" strokeWidth={2} name="Hired" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Current interns by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="interns"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Track your internship program success metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={metric.metric} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <span className="text-sm text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Target: {metric.target}% •
                  {metric.value >= metric.target ? (
                    <span className="text-green-600 ml-1">On track</span>
                  ) : (
                    <span className="text-yellow-600 ml-1">Needs improvement</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your internship program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                activity: "New application received for Frontend Developer position",
                candidate: "John Doe",
                time: "2 hours ago",
                type: "application",
              },
              {
                activity: "Interview scheduled with candidate",
                candidate: "Jane Smith",
                time: "4 hours ago",
                type: "interview",
              },
              {
                activity: "Intern completed milestone",
                candidate: "Sarah Wilson",
                time: "1 day ago",
                type: "milestone",
              },
              {
                activity: "New job posting published",
                candidate: "UI/UX Designer Intern",
                time: "2 days ago",
                type: "posting",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "application"
                      ? "bg-primary"
                      : activity.type === "interview"
                        ? "bg-secondary"
                        : activity.type === "milestone"
                          ? "bg-green-500"
                          : "bg-accent"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.candidate} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderJobPostings = () => (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Postings</TabsTrigger>
          <TabsTrigger value="closed">Closed Postings</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search postings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Posting
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockJobPostings
              .filter((posting) => posting.status === "Active")
              .map((posting, index) => (
                <motion.div
                  key={posting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{posting.title}</CardTitle>
                          <CardDescription>
                            {posting.department} • {posting.duration}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            posting.type === "Remote" ? "default" : posting.type === "Hybrid" ? "secondary" : "outline"
                          }
                        >
                          {posting.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{posting.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {posting.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-primary">{posting.stipend}</p>
                          <p className="text-muted-foreground">Stipend</p>
                        </div>
                        <div>
                          <p className="font-medium">{posting.applications} applications</p>
                          <p className="text-muted-foreground">Received</p>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Posted: {posting.postedDate} • Deadline: {posting.deadline}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Applications
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Closed Job Postings</CardTitle>
              <CardDescription>Previously posted internship opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobPostings
                  .filter((posting) => posting.status === "Closed")
                  .map((posting, index) => (
                    <div key={posting.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{posting.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {posting.department} • {posting.duration}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {posting.applications} applications • Closed on {posting.deadline}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Closed</Badge>
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
              <CardTitle>Create New Job Posting</CardTitle>
              <CardDescription>Post a new internship opportunity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" placeholder="e.g., Frontend Developer Intern" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="workType">Work Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 3 months" />
                </div>
                <div>
                  <Label htmlFor="stipend">Stipend</Label>
                  <Input id="stipend" placeholder="e.g., ₹15,000/month" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what the intern will learn..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="List the required skills, qualifications, and experience..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input type="date" id="applicationDeadline" />
                </div>
                <div>
                  <Label htmlFor="positions">Number of Positions</Label>
                  <Input type="number" id="positions" placeholder="1" />
                </div>
              </div>

              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Publish Job Posting
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderCandidates = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Candidates</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="interview">Interview Scheduled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidate List */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Applications</CardTitle>
          <CardDescription>Review and manage candidate applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    <p className="text-xs text-muted-foreground">{candidate.college}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{candidate.course}</p>
                    <p className="text-sm text-muted-foreground">CGPA: {candidate.cgpa}</p>
                    <p className="text-xs text-muted-foreground">{candidate.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{candidate.appliedFor}</p>
                    <p className="text-xs text-muted-foreground">Applied: {candidate.appliedDate}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">Resume Score: {candidate.resumeScore}%</span>
                    </div>
                  </div>
                  <div>
                    <Badge
                      variant={
                        candidate.status === "Under Review"
                          ? "secondary"
                          : candidate.status === "Interview Scheduled"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {candidate.status}
                    </Badge>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {candidate.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderInternManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Interns</CardTitle>
          <CardDescription>Monitor and manage your active interns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInterns.map((intern, index) => (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 border rounded-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{intern.name}</h3>
                    <p className="text-sm text-muted-foreground">{intern.position}</p>
                    <p className="text-xs text-muted-foreground">
                      {intern.department} • Mentor: {intern.mentor}
                    </p>
                  </div>
                  <Badge
                    variant={
                      intern.performance === "Excellent"
                        ? "default"
                        : intern.performance === "Good"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {intern.performance}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {intern.startDate} to {intern.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tasks Progress</p>
                    <p className="text-sm text-muted-foreground">
                      {intern.tasksCompleted} of {intern.totalTasks} completed
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Update</p>
                    <p className="text-sm text-muted-foreground">{intern.lastUpdate}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{intern.progress}%</span>
                  </div>
                  <Progress value={intern.progress} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Review
                  </Button>
                  <Button variant="outline" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Evaluate
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
            <CardDescription>Track your recruitment process efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stage: "Applications Received", count: 234, percentage: 100 },
                { stage: "Resume Screening", count: 156, percentage: 67 },
                { stage: "Interview Scheduled", count: 89, percentage: 38 },
                { stage: "Final Round", count: 45, percentage: 19 },
                { stage: "Offers Extended", count: 23, percentage: 10 },
                { stage: "Offers Accepted", count: 20, percentage: 9 },
              ].map((stage, index) => (
                <div key={stage.stage} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <span className="text-sm text-muted-foreground">
                        {stage.count} ({stage.percentage}%)
                      </span>
                    </div>
                    <Progress value={stage.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Colleges</CardTitle>
            <CardDescription>Colleges with highest application success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { college: "ABC Engineering College", applications: 45, hired: 8, rate: 18 },
                { college: "XYZ University", applications: 38, hired: 6, rate: 16 },
                { college: "DEF Institute of Technology", applications: 32, hired: 4, rate: 13 },
                { college: "GHI Technical University", applications: 28, hired: 3, rate: 11 },
                { college: "JKL Engineering College", applications: 25, hired: 2, rate: 8 },
              ].map((college, index) => (
                <div key={college.college} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{college.college}</h4>
                    <p className="text-xs text-muted-foreground">
                      {college.applications} applications • {college.hired} hired
                    </p>
                  </div>
                  <Badge variant={college.rate >= 15 ? "default" : college.rate >= 10 ? "secondary" : "outline"}>
                    {college.rate}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills in Demand</CardTitle>
          <CardDescription>Most requested skills in applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { skill: "React", count: 89, trend: "+12%" },
              { skill: "Python", count: 76, trend: "+8%" },
              { skill: "JavaScript", count: 72, trend: "+15%" },
              { skill: "SQL", count: 65, trend: "+5%" },
              { skill: "Node.js", count: 58, trend: "+18%" },
              { skill: "Machine Learning", count: 45, trend: "+22%" },
            ].map((skill) => (
              <div key={skill.skill} className="text-center p-3 border rounded-lg">
                <p className="font-semibold text-lg">{skill.count}</p>
                <p className="text-sm font-medium">{skill.skill}</p>
                <p className="text-xs text-green-600">{skill.trend}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communication with candidates and interns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  sender: "John Doe",
                  role: "Candidate",
                  subject: "Thank you for the interview opportunity",
                  message:
                    "I wanted to thank you for the interview yesterday. I'm very excited about the possibility of joining your team.",
                  time: "2 hours ago",
                  unread: true,
                },
                {
                  sender: "Sarah Wilson",
                  role: "Current Intern",
                  subject: "Weekly Progress Report",
                  message:
                    "Please find attached my weekly progress report. I've completed the user authentication module.",
                  time: "1 day ago",
                  unread: false,
                },
                {
                  sender: "Dr. Smith",
                  role: "Faculty Coordinator",
                  subject: "Student Evaluation Request",
                  message:
                    "Could you please provide feedback on Sarah Wilson's performance for her mid-term evaluation?",
                  time: "2 days ago",
                  unread: false,
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common messaging tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              Send Interview Invite
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message All Interns
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Review Meeting
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Request Evaluation
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardOverview()
      case "postings":
        return renderJobPostings()
      case "candidates":
        return renderCandidates()
      case "interns":
        return renderInternManagement()
      case "analytics":
        return renderAnalytics()
      case "messages":
        return renderMessages()
      default:
        return renderDashboardOverview()
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Industry Partner Dashboard</h1>
        <p className="text-muted-foreground">Manage internships, candidates, and track performance</p>
      </div>

      {renderContent()}
    </motion.div>
  )
}
