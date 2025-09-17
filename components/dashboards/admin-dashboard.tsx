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
import { Switch } from "@/components/ui/switch"
import {
  Users,
  Building2,
  BarChart3,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Bell,
  Server,
  UserCheck,
  UserX,
  GraduationCap,
  Briefcase,
  Lock,
  Unlock,
  Clock,
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
  AreaChart,
  Area,
} from "recharts"

interface AdminDashboardProps {
  activeTab: string
}

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@college.edu",
    role: "Student",
    institution: "ABC Engineering College",
    status: "Active",
    lastLogin: "2024-01-20",
    joinDate: "2023-09-01",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@college.edu",
    role: "Faculty",
    institution: "ABC Engineering College",
    status: "Active",
    lastLogin: "2024-01-19",
    joinDate: "2022-08-15",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@techcorp.com",
    role: "Industry Partner",
    institution: "TechCorp Solutions",
    status: "Active",
    lastLogin: "2024-01-18",
    joinDate: "2023-01-10",
  },
]

const mockInstitutions = [
  {
    id: 1,
    name: "ABC Engineering College",
    type: "Engineering College",
    location: "Mumbai, Maharashtra",
    students: 1250,
    faculty: 85,
    activeInternships: 234,
    status: "Active",
    joinDate: "2022-06-15",
  },
  {
    id: 2,
    name: "XYZ University",
    type: "University",
    location: "Delhi, NCR",
    students: 2100,
    faculty: 145,
    activeInternships: 387,
    status: "Active",
    joinDate: "2022-03-20",
  },
  {
    id: 3,
    name: "TechCorp Solutions",
    type: "Technology Company",
    location: "Bangalore, Karnataka",
    students: 0,
    faculty: 0,
    activeInternships: 45,
    status: "Active",
    joinDate: "2023-01-10",
  },
]

const systemMetrics = [
  { month: "Aug", users: 1200, internships: 450, institutions: 25 },
  { month: "Sep", users: 1350, internships: 520, institutions: 28 },
  { month: "Oct", users: 1500, internships: 680, institutions: 32 },
  { month: "Nov", users: 1680, internships: 750, institutions: 35 },
  { month: "Dec", users: 1850, internships: 820, institutions: 38 },
  { month: "Jan", users: 2100, internships: 950, institutions: 42 },
]

const userDistribution = [
  { name: "Students", value: 1680, color: "#d0e8d0" },
  { name: "Faculty", value: 285, color: "#76c7b5" },
  { name: "Industry Partners", value: 135, color: "#a8d5ba" },
]

const internshipStats = [
  { status: "Active", count: 456, percentage: 48 },
  { status: "Completed", count: 312, percentage: 33 },
  { status: "In Progress", count: 128, percentage: 13 },
  { status: "Pending", count: 54, percentage: 6 },
]

const systemHealth = [
  { metric: "Server Uptime", value: 99.8, status: "excellent" },
  { metric: "Database Performance", value: 95.2, status: "good" },
  { metric: "API Response Time", value: 87.5, status: "good" },
  { metric: "User Satisfaction", value: 92.3, status: "excellent" },
]

export function AdminDashboard({ activeTab }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedFilter, setSelectedFilter] = React.useState("all")

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "2,100", change: "+13.5%", icon: Users, color: "text-primary" },
          { title: "Active Internships", value: "950", change: "+15.8%", icon: Briefcase, color: "text-secondary" },
          { title: "Institutions", value: "42", change: "+10.5%", icon: Building2, color: "text-accent" },
          { title: "System Uptime", value: "99.8%", change: "+0.2%", icon: Server, color: "text-green-600" },
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
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>User growth and internship trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#d0e8d0" fill="#d0e8d0" />
                <Area type="monotone" dataKey="internships" stackId="1" stroke="#76c7b5" fill="#76c7b5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of platform users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Metrics</CardTitle>
          <CardDescription>Real-time system performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemHealth.map((metric, index) => (
              <div key={metric.metric} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <span className="text-sm text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      metric.status === "excellent" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground capitalize">{metric.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>Latest platform events and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                activity: "New institution registered",
                details: "DEF Technical University joined the platform",
                time: "2 hours ago",
                type: "institution",
                priority: "normal",
              },
              {
                activity: "System maintenance completed",
                details: "Database optimization and security updates applied",
                time: "6 hours ago",
                type: "system",
                priority: "high",
              },
              {
                activity: "Bulk user import completed",
                details: "245 new students added from ABC Engineering College",
                time: "1 day ago",
                type: "users",
                priority: "normal",
              },
              {
                activity: "Security alert resolved",
                details: "Suspicious login attempts blocked and investigated",
                time: "2 days ago",
                type: "security",
                priority: "urgent",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.priority === "urgent"
                      ? "bg-red-500"
                      : activity.priority === "high"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
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

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="industry">Industry Partners</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">1,987</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive Users</p>
                <p className="text-2xl font-bold">113</p>
                <p className="text-xs text-yellow-600">-3% this month</p>
              </div>
              <UserX className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Registrations</p>
                <p className="text-2xl font-bold">245</p>
                <p className="text-xs text-blue-600">This month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage all platform users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <Badge
                      variant={user.role === "Student" ? "default" : user.role === "Faculty" ? "secondary" : "outline"}
                    >
                      {user.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{user.institution}</p>
                  </div>
                  <div>
                    <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">Last login: {user.lastLogin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined: {user.joinDate}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    {user.status === "Active" ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderInstitutions = () => (
    <div className="space-y-6">
      {/* Institution Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Institutions</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Educational</p>
                <p className="text-2xl font-bold">35</p>
              </div>
              <GraduationCap className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Industry Partners</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Briefcase className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Institution List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Institution Management</CardTitle>
              <CardDescription>Manage educational institutions and industry partners</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Institution
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInstitutions.map((institution, index) => (
              <motion.div
                key={institution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{institution.name}</h3>
                    <p className="text-sm text-muted-foreground">{institution.type}</p>
                    <p className="text-sm text-muted-foreground">{institution.location}</p>
                  </div>
                  <Badge variant={institution.status === "Active" ? "default" : "secondary"}>
                    {institution.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-lg font-bold text-primary">{institution.students.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Faculty</p>
                    <p className="text-lg font-bold text-secondary">{institution.faculty}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Internships</p>
                    <p className="text-lg font-bold text-accent">{institution.activeInternships}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">{institution.joinDate}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSystemAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Usage Trends</CardTitle>
            <CardDescription>Daily active users and system usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#d0e8d0" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="internships" stroke="#76c7b5" strokeWidth={2} name="Internships" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Internship Status Distribution</CardTitle>
            <CardDescription>Current status of all internships on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {internshipStats.map((stat, index) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        stat.status === "Active"
                          ? "bg-green-500"
                          : stat.status === "Completed"
                            ? "bg-blue-500"
                            : stat.status === "In Progress"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium">{stat.status}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{stat.count}</span>
                    <div className="w-24">
                      <Progress value={stat.percentage} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">{stat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Institutions</CardTitle>
            <CardDescription>Institutions with highest internship success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "ABC Engineering College", rate: 94, internships: 234 },
                { name: "XYZ University", rate: 91, internships: 387 },
                { name: "DEF Technical Institute", rate: 88, internships: 156 },
                { name: "GHI College of Technology", rate: 85, internships: 123 },
              ].map((institution, index) => (
                <div key={institution.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{institution.name}</p>
                    <p className="text-xs text-muted-foreground">{institution.internships} internships</p>
                  </div>
                  <Badge variant={institution.rate >= 90 ? "default" : "secondary"}>{institution.rate}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Skills</CardTitle>
            <CardDescription>Most in-demand skills across internships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { skill: "React", demand: 89 },
                { skill: "Python", demand: 76 },
                { skill: "JavaScript", demand: 72 },
                { skill: "SQL", demand: 65 },
                { skill: "Machine Learning", demand: 58 },
                { skill: "Node.js", demand: 45 },
              ].map((item, index) => (
                <div key={item.skill} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16">
                      <Progress value={item.demand} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.demand}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Real-time system metrics and health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: "API Response Time", value: "245ms", status: "good" },
                { metric: "Database Queries/sec", value: "1,234", status: "excellent" },
                { metric: "Active Connections", value: "456", status: "good" },
                { metric: "Error Rate", value: "0.02%", status: "excellent" },
                { metric: "Memory Usage", value: "67%", status: "good" },
                { metric: "CPU Usage", value: "34%", status: "excellent" },
              ].map((item, index) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.value}</span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === "excellent" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Configure general platform settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" defaultValue="Prashiskshan" />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" defaultValue="support@prashiskshan.edu" />
                </div>
              </div>
              <div>
                <Label htmlFor="platformDescription">Platform Description</Label>
                <Textarea
                  id="platformDescription"
                  defaultValue="Comprehensive internship management platform connecting students, faculty, and industry partners."
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenanceMode" />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="newRegistrations" defaultChecked />
                <Label htmlFor="newRegistrations">Allow New Registrations</Label>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="twoFactorAuth" defaultChecked />
                <Label htmlFor="twoFactorAuth">Require Two-Factor Authentication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="passwordComplexity" defaultChecked />
                <Label htmlFor="passwordComplexity">Enforce Strong Passwords</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sessionTimeout" defaultChecked />
                <Label htmlFor="sessionTimeout">Auto-logout Inactive Sessions</Label>
              </div>
              <div>
                <Label htmlFor="sessionDuration">Session Duration (hours)</Label>
                <Input id="sessionDuration" type="number" defaultValue="8" />
              </div>
              <div>
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input id="maxLoginAttempts" type="number" defaultValue="5" />
              </div>
              <Button>Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="emailNotifications" defaultChecked />
                <Label htmlFor="emailNotifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="systemAlerts" defaultChecked />
                <Label htmlFor="systemAlerts">System Alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenanceNotifications" defaultChecked />
                <Label htmlFor="maintenanceNotifications">Maintenance Notifications</Label>
              </div>
              <div>
                <Label htmlFor="notificationEmail">Admin Notification Email</Label>
                <Input id="notificationEmail" defaultValue="admin@prashiskshan.edu" />
              </div>
              <Button>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Manage external service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { name: "Email Service", status: "Connected", provider: "SendGrid" },
                  { name: "SMS Gateway", status: "Connected", provider: "Twilio" },
                  { name: "File Storage", status: "Connected", provider: "AWS S3" },
                  { name: "Analytics", status: "Disconnected", provider: "Google Analytics" },
                  { name: "Payment Gateway", status: "Connected", provider: "Razorpay" },
                ].map((integration, index) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">{integration.provider}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integration.status === "Connected" ? "default" : "destructive"}>
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Important system alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "System Maintenance Scheduled",
                  message: "Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM IST",
                  time: "2 hours ago",
                  type: "maintenance",
                  priority: "high",
                },
                {
                  title: "New Institution Registration",
                  message: "DEF Technical University has requested to join the platform",
                  time: "4 hours ago",
                  type: "registration",
                  priority: "normal",
                },
                {
                  title: "Security Alert",
                  message: "Multiple failed login attempts detected from IP 192.168.1.100",
                  time: "6 hours ago",
                  type: "security",
                  priority: "urgent",
                },
                {
                  title: "Database Backup Completed",
                  message: "Daily database backup completed successfully",
                  time: "12 hours ago",
                  type: "system",
                  priority: "normal",
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg ${
                    notification.priority === "urgent" ? "border-red-200 bg-red-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <Badge
                      variant={
                        notification.priority === "urgent"
                          ? "destructive"
                          : notification.priority === "high"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
            <CardDescription>Broadcast message to users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipients">Recipients</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">All Students</SelectItem>
                  <SelectItem value="faculty">All Faculty</SelectItem>
                  <SelectItem value="industry">Industry Partners</SelectItem>
                  <SelectItem value="admins">Administrators</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notificationTitle">Title</Label>
              <Input id="notificationTitle" placeholder="Notification title" />
            </div>
            <div>
              <Label htmlFor="notificationMessage">Message</Label>
              <Textarea id="notificationMessage" placeholder="Notification message..." rows={4} />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Send Notification
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
      case "users":
        return renderUserManagement()
      case "institutions":
        return renderInstitutions()
      case "analytics":
        return renderSystemAnalytics()
      case "settings":
        return renderSettings()
      case "notifications":
        return renderNotifications()
      default:
        return renderDashboardOverview()
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">System administration and platform management</p>
      </div>

      {renderContent()}
    </motion.div>
  )
}
