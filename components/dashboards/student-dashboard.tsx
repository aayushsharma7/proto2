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
import {
  BookOpen,
  Clock,
  MapPin,
  Building2,
  Star,
  Search,
  Filter,
  FileText,
  Award,
  MessageSquare,
  Download,
  Eye,
  Send,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface StudentDashboardProps {
  activeTab: string
}

// Mock data
const mockInternships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    location: "Mumbai, Maharashtra",
    duration: "3 months",
    stipend: "₹15,000/month",
    type: "Remote",
    skills: ["React", "JavaScript", "CSS"],
    deadline: "2024-02-15",
    description: "Work on modern web applications using React and TypeScript.",
    rating: 4.5,
    applicants: 45,
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Analytics Pro",
    location: "Bangalore, Karnataka",
    duration: "6 months",
    stipend: "₹20,000/month",
    type: "Hybrid",
    skills: ["Python", "Machine Learning", "SQL"],
    deadline: "2024-02-20",
    description: "Analyze large datasets and build predictive models.",
    rating: 4.8,
    applicants: 67,
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Studios",
    location: "Delhi, NCR",
    duration: "4 months",
    stipend: "₹12,000/month",
    type: "On-site",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    deadline: "2024-02-25",
    description: "Design user interfaces for mobile and web applications.",
    rating: 4.3,
    applicants: 32,
  },
]

const mockApplications = [
  {
    id: 1,
    internship: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    status: "Under Review",
    appliedDate: "2024-01-15",
    lastUpdate: "2024-01-20",
  },
  {
    id: 2,
    internship: "Data Science Intern",
    company: "Analytics Pro",
    status: "Interview Scheduled",
    appliedDate: "2024-01-10",
    lastUpdate: "2024-01-22",
  },
  {
    id: 3,
    internship: "Mobile App Developer",
    company: "AppWorks",
    status: "Rejected",
    appliedDate: "2024-01-05",
    lastUpdate: "2024-01-18",
  },
]

const progressData = [
  { month: "Jan", applications: 5, interviews: 2, offers: 0 },
  { month: "Feb", applications: 8, interviews: 4, offers: 1 },
  { month: "Mar", applications: 12, interviews: 6, offers: 2 },
  { month: "Apr", applications: 15, interviews: 8, offers: 3 },
]

const skillsData = [
  { name: "Technical Skills", value: 75, color: "#d0e8d0" },
  { name: "Communication", value: 85, color: "#76c7b5" },
  { name: "Problem Solving", value: 70, color: "#a8d5ba" },
  { name: "Teamwork", value: 90, color: "#5fb3a3" },
]

export function StudentDashboard({ activeTab }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("all")

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Applications Sent", value: "24", change: "+12%", icon: FileText, color: "text-primary" },
          { title: "Interviews", value: "8", change: "+25%", icon: MessageSquare, color: "text-secondary" },
          { title: "Offers Received", value: "3", change: "+50%", icon: Award, color: "text-accent" },
          { title: "Profile Views", value: "156", change: "+8%", icon: Eye, color: "text-muted-foreground" },
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
            <CardTitle>Application Progress</CardTitle>
            <CardDescription>Your internship application journey over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#d0e8d0" strokeWidth={2} />
                <Line type="monotone" dataKey="interviews" stroke="#76c7b5" strokeWidth={2} />
                <Line type="monotone" dataKey="offers" stroke="#5fb3a3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Assessment</CardTitle>
            <CardDescription>Your current skill levels and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsData.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest internship-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Applied to Frontend Developer position",
                company: "TechCorp",
                time: "2 hours ago",
                type: "application",
              },
              { action: "Interview scheduled", company: "Analytics Pro", time: "1 day ago", type: "interview" },
              { action: "Profile viewed by", company: "Creative Studios", time: "2 days ago", type: "view" },
              { action: "Completed skill assessment", company: "Platform", time: "3 days ago", type: "skill" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "application"
                      ? "bg-primary"
                      : activity.type === "interview"
                        ? "bg-secondary"
                        : activity.type === "view"
                          ? "bg-accent"
                          : "bg-muted-foreground"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.company} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderInternships = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search internships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
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
        </CardContent>
      </Card>

      {/* Internship Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockInternships.map((internship, index) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{internship.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {internship.company}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      internship.type === "Remote" ? "default" : internship.type === "Hybrid" ? "secondary" : "outline"
                    }
                  >
                    {internship.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {internship.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {internship.duration}
                  </div>
                </div>

                <p className="text-sm">{internship.description}</p>

                <div className="flex flex-wrap gap-1">
                  {internship.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-primary">{internship.stipend}</p>
                    <p className="text-xs text-muted-foreground">{internship.applicants} applicants</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{internship.rating}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Apply Now</Button>
                  <Button variant="outline" size="icon">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderApplications = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>Track the status of your internship applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockApplications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{application.internship}</h3>
                  <p className="text-sm text-muted-foreground">{application.company}</p>
                  <p className="text-xs text-muted-foreground">Applied: {application.appliedDate}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      application.status === "Under Review"
                        ? "secondary"
                        : application.status === "Interview Scheduled"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {application.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Updated: {application.lastUpdate}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProgress = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Internship Progress</CardTitle>
            <CardDescription>Current internship milestones and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-3" />
              </div>

              <div className="space-y-4">
                {[
                  { task: "Complete onboarding", status: "completed", progress: 100 },
                  { task: "First project milestone", status: "completed", progress: 100 },
                  { task: "Mid-term evaluation", status: "in-progress", progress: 60 },
                  { task: "Final project submission", status: "pending", progress: 0 },
                  { task: "Final evaluation", status: "pending", progress: 0 },
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        milestone.status === "completed"
                          ? "bg-green-500"
                          : milestone.status === "in-progress"
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{milestone.task}</p>
                      <Progress value={milestone.progress} className="h-1 mt-1" />
                    </div>
                    <Badge
                      variant={
                        milestone.status === "completed"
                          ? "default"
                          : milestone.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Log</CardTitle>
            <CardDescription>Record your daily internship activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" />
              </div>
              <div>
                <Label htmlFor="hours">Hours Worked</Label>
                <Input type="number" id="hours" placeholder="8" />
              </div>
              <div>
                <Label htmlFor="activities">Activities</Label>
                <Textarea id="activities" placeholder="Describe what you worked on today..." rows={4} />
              </div>
              <div>
                <Label htmlFor="learnings">Key Learnings</Label>
                <Textarea id="learnings" placeholder="What did you learn today?" rows={3} />
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Log Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal and academic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="+91 9876543210" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="college">College</Label>
                <Input id="college" defaultValue="ABC Engineering College" />
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Input id="course" defaultValue="B.Tech Computer Science" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cgpa">CGPA</Label>
                <Input id="cgpa" defaultValue="8.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                rows={4}
                defaultValue="Passionate computer science student with experience in web development and data analysis."
              />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume & Documents</CardTitle>
            <CardDescription>Manage your application documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Upload your resume</p>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Resume_John_Doe.pdf</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["JavaScript", "React", "Python", "SQL", "Git"].map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Add Skill
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Communication with mentors and coordinators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                sender: "Dr. Sarah Johnson",
                role: "Faculty Coordinator",
                message: "Great progress on your internship! Keep up the good work.",
                time: "2 hours ago",
                unread: true,
              },
              {
                sender: "Mike Chen",
                role: "Industry Mentor",
                message: "Please submit your weekly report by Friday.",
                time: "1 day ago",
                unread: false,
              },
              {
                sender: "System",
                role: "Notification",
                message: "Your internship evaluation is due next week.",
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
                <p className="text-sm">{message.message}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    Reply
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
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboardOverview()
      case "internships":
        return renderInternships()
      case "applications":
        return renderApplications()
      case "progress":
        return renderProgress()
      case "profile":
        return renderProfile()
      case "messages":
        return renderMessages()
      default:
        return renderDashboardOverview()
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
        <p className="text-muted-foreground">Manage your internship journey</p>
      </div>

      {renderContent()}
    </motion.div>
  )
}
