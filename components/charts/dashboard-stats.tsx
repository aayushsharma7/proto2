"use client"

import { MetricCard } from "./metric-card"
import { AnalyticsChart } from "./analytics-chart"
import { motion } from "framer-motion"
import { Users, Briefcase, TrendingUp, Award, BookOpen, Building, UserCheck, BarChart3 } from "lucide-react"

interface DashboardStatsProps {
  userType: "student" | "faculty" | "industry" | "admin"
  data: any
}

export function DashboardStats({ userType, data }: DashboardStatsProps) {
  const renderStudentStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Applications Sent"
          value={data.totalApplications || 23}
          change="+12% from last month"
          changeType="positive"
          icon={Briefcase}
        />
        <MetricCard
          title="Interviews Scheduled"
          value={data.interviews || 5}
          change="+2 this week"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Skill Progress"
          value={`${data.skillAverage || 78}%`}
          change="+5% this month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Certifications"
          value={data.certifications || 3}
          change="1 pending"
          changeType="neutral"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Application Trends"
          description="Your application activity over time"
          data={data.applicationTrends || []}
          type="area"
          dataKey="applications"
          xAxisKey="month"
        />
        <AnalyticsChart
          title="Internship Status"
          description="Current status of your applications"
          data={data.internshipStatus || []}
          type="pie"
          dataKey="value"
        />
      </div>
    </div>
  )

  const renderFacultyStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Students Supervised"
          value={data.totalStudents || 45}
          change="+3 this semester"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Evaluations Pending"
          value={data.pendingEvaluations || 8}
          change="Due this week"
          changeType="neutral"
          icon={BookOpen}
        />
        <MetricCard
          title="Average Performance"
          value={`${data.avgPerformance || 85}%`}
          change="+2% improvement"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Industry Partners"
          value={data.industryPartners || 12}
          change="2 new partnerships"
          changeType="positive"
          icon={Building}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Student Performance Trends"
          description="Performance distribution over time"
          data={data.studentPerformance || []}
          type="bar"
          dataKey="excellent"
          xAxisKey="month"
        />
        <AnalyticsChart
          title="Internship Distribution"
          description="Students by industry sector"
          data={data.internshipDistribution || []}
          type="pie"
          dataKey="value"
        />
      </div>
    </div>
  )

  const renderIndustryStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Postings"
          value={data.activePostings || 12}
          change="+3 this month"
          changeType="positive"
          icon={Briefcase}
        />
        <MetricCard
          title="Applications Received"
          value={data.totalApplications || 156}
          change="+23% increase"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Interns Hired"
          value={data.internsHired || 28}
          change="85% success rate"
          changeType="positive"
          icon={UserCheck}
        />
        <MetricCard
          title="Avg. Rating"
          value={`${data.avgRating || 4.2}/5`}
          change="+0.3 improvement"
          changeType="positive"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Hiring Trends"
          description="Job postings and successful hires"
          data={data.hiringTrends || []}
          type="line"
          dataKey="filled"
          xAxisKey="month"
        />
        <AnalyticsChart
          title="Department Distribution"
          description="Interns by department"
          data={data.departmentDistribution || []}
          type="pie"
          dataKey="value"
        />
      </div>
    </div>
  )

  const renderAdminStats = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={data.totalUsers || 2027}
          change="+156 this month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Active Internships"
          value={data.activeInternships || 234}
          change="+18% growth"
          changeType="positive"
          icon={Briefcase}
        />
        <MetricCard
          title="System Uptime"
          value="99.9%"
          change="Excellent performance"
          changeType="positive"
          icon={BarChart3}
        />
        <MetricCard
          title="User Satisfaction"
          value="4.8/5"
          change="+0.2 this quarter"
          changeType="positive"
          icon={Award}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Platform Growth"
          description="User growth across all categories"
          data={data.platformGrowth || []}
          type="area"
          dataKey="students"
          xAxisKey="month"
        />
        <AnalyticsChart
          title="User Distribution"
          description="Current user base breakdown"
          data={data.userDistribution || []}
          type="pie"
          dataKey="value"
        />
      </div>
    </div>
  )

  const renderStats = () => {
    switch (userType) {
      case "student":
        return renderStudentStats()
      case "faculty":
        return renderFacultyStats()
      case "industry":
        return renderIndustryStats()
      case "admin":
        return renderAdminStats()
      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
      {renderStats()}
    </motion.div>
  )
}
