// Mock data generators for analytics and charts
export const generateStudentAnalytics = () => ({
  applicationTrends: [
    { month: "Jan", applications: 45, accepted: 12 },
    { month: "Feb", applications: 52, accepted: 18 },
    { month: "Mar", applications: 38, accepted: 15 },
    { month: "Apr", applications: 61, accepted: 22 },
    { month: "May", applications: 55, accepted: 19 },
    { month: "Jun", applications: 67, accepted: 25 },
  ],
  skillProgress: [
    { skill: "React", progress: 85 },
    { skill: "Node.js", progress: 72 },
    { skill: "Python", progress: 68 },
    { skill: "SQL", progress: 79 },
    { skill: "Git", progress: 91 },
  ],
  internshipStatus: [
    { name: "Applied", value: 45, color: "#8884d8" },
    { name: "In Review", value: 23, color: "#82ca9d" },
    { name: "Accepted", value: 12, color: "#ffc658" },
    { name: "Rejected", value: 8, color: "#ff7c7c" },
  ],
})

export const generateFacultyAnalytics = () => ({
  studentPerformance: [
    { month: "Jan", excellent: 15, good: 25, average: 12, poor: 3 },
    { month: "Feb", excellent: 18, good: 28, average: 10, poor: 2 },
    { month: "Mar", excellent: 22, good: 30, average: 8, poor: 1 },
    { month: "Apr", excellent: 25, good: 32, average: 6, poor: 2 },
    { month: "May", excellent: 28, good: 35, average: 5, poor: 1 },
    { month: "Jun", excellent: 32, good: 38, average: 4, poor: 1 },
  ],
  internshipDistribution: [
    { name: "Tech", value: 45 },
    { name: "Finance", value: 23 },
    { name: "Healthcare", value: 18 },
    { name: "Education", value: 12 },
    { name: "Others", value: 8 },
  ],
  evaluationStatus: [
    { status: "Completed", count: 156 },
    { status: "Pending", count: 23 },
    { status: "Overdue", count: 5 },
  ],
})

export const generateIndustryAnalytics = () => ({
  hiringTrends: [
    { month: "Jan", posted: 12, filled: 8 },
    { month: "Feb", posted: 15, filled: 11 },
    { month: "Mar", posted: 18, filled: 14 },
    { month: "Apr", posted: 22, filled: 18 },
    { month: "May", posted: 25, filled: 21 },
    { month: "Jun", posted: 28, filled: 24 },
  ],
  departmentDistribution: [
    { name: "Engineering", value: 45 },
    { name: "Marketing", value: 23 },
    { name: "Sales", value: 18 },
    { name: "HR", value: 12 },
    { name: "Finance", value: 8 },
  ],
  candidateQuality: [
    { rating: "Excellent", count: 45 },
    { rating: "Good", count: 67 },
    { rating: "Average", count: 23 },
    { rating: "Poor", count: 5 },
  ],
})

export const generateAdminAnalytics = () => ({
  platformGrowth: [
    { month: "Jan", students: 1200, faculty: 45, industry: 23 },
    { month: "Feb", students: 1350, faculty: 52, industry: 28 },
    { month: "Mar", students: 1480, faculty: 58, industry: 32 },
    { month: "Apr", students: 1620, faculty: 65, industry: 38 },
    { month: "May", students: 1750, faculty: 72, industry: 42 },
    { month: "Jun", students: 1890, faculty: 78, industry: 47 },
  ],
  userDistribution: [
    { name: "Students", value: 1890 },
    { name: "Faculty", value: 78 },
    { name: "Industry", value: 47 },
    { name: "Admins", value: 12 },
  ],
  systemMetrics: [
    { metric: "Uptime", value: "99.9%" },
    { metric: "Response Time", value: "245ms" },
    { metric: "Active Users", value: "1,247" },
    { metric: "Daily Logins", value: "892" },
  ],
})

export const generateProgressData = (days = 30) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      progress: Math.floor(Math.random() * 40) + 60, // 60-100% progress
      tasks: Math.floor(Math.random() * 8) + 2, // 2-10 tasks
      hours: Math.floor(Math.random() * 6) + 2, // 2-8 hours
    })
  }

  return data
}
