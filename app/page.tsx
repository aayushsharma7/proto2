"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ResponsiveLayout } from "@/components/responsive-layout"
import { StudentDashboard } from "@/components/dashboards/student-dashboard"
import { FacultyDashboard } from "@/components/dashboards/faculty-dashboard"
import { IndustryDashboard } from "@/components/dashboards/industry-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { AuthGuard } from "@/components/auth/auth-guard"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Building2, Settings } from "lucide-react"

type UserType = "student" | "faculty" | "industry" | "admin"

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [userType, setUserType] = React.useState<UserType | null>(null)
  const [activeTab, setActiveTab] = React.useState("dashboard")

  React.useEffect(() => {
    if (isAuthenticated && user) {
      setUserType(user.role as UserType)
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated || !userType) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background flex items-center justify-center p-3 sm:p-4 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-2"
              >
                Welcome to Prashiskshan
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-lg md:text-xl text-muted-foreground px-3 sm:px-4"
              >
                Your comprehensive internship management platform
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4">
              {[
                {
                  type: "student" as UserType,
                  title: "Student Portal",
                  description: "Find internships, track applications, and manage your progress",
                  icon: BookOpen,
                  color: "bg-primary",
                },
                {
                  type: "faculty" as UserType,
                  title: "Faculty Coordinator",
                  description: "Oversee students, manage evaluations, and track progress",
                  icon: Users,
                  color: "bg-secondary",
                },
                {
                  type: "industry" as UserType,
                  title: "Industry Partner",
                  description: "Post internships, manage candidates, and track interns",
                  icon: Building2,
                  color: "bg-accent",
                },
                {
                  type: "admin" as UserType,
                  title: "Administrator",
                  description: "System management, analytics, and user oversight",
                  icon: Settings,
                  color: "bg-muted",
                },
              ].map((portal, index) => {
                const Icon = portal.icon
                return (
                  <motion.div
                    key={portal.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card
                      className="h-full hover:shadow-lg transition-shadow cursor-pointer touch-manipulation"
                      onClick={() => setUserType(portal.type)}
                    >
                      <CardHeader className="text-center p-3 sm:p-4 md:p-6">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${portal.color} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4`}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                        </div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">{portal.title}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">{portal.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                        <Button className="w-full bg-transparent text-xs sm:text-sm" variant="outline" size="sm">
                          Enter Portal
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </AuthGuard>
    )
  }

  const renderDashboard = () => {
    switch (userType) {
      case "student":
        return <StudentDashboard activeTab={activeTab} />
      case "faculty":
        return <FacultyDashboard activeTab={activeTab} />
      case "industry":
        return <IndustryDashboard activeTab={activeTab} />
      case "admin":
        return <AdminDashboard activeTab={activeTab} />
      default:
        return null
    }
  }

  return (
    <AuthGuard>
      <ResponsiveLayout userType={userType} activeTab={activeTab} onTabChange={setActiveTab}>
        {renderDashboard()}
      </ResponsiveLayout>
    </AuthGuard>
  )
}
