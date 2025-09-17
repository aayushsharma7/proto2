"use client"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  Building2,
  Settings,
  Home,
  User,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
  userType: "student" | "faculty" | "industry" | "admin"
  activeTab: string
  onTabChange: (tab: string) => void
}

const sidebarItems = {
  student: [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "internships", label: "Find Internships", icon: BookOpen },
    { id: "applications", label: "My Applications", icon: FileText },
    { id: "progress", label: "Progress Tracker", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ],
  faculty: [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "students", label: "Student Oversight", icon: Users },
    { id: "evaluations", label: "Evaluations", icon: FileText },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ],
  industry: [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "postings", label: "Job Postings", icon: FileText },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "interns", label: "Manage Interns", icon: Building2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ],
  admin: [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "users", label: "User Management", icon: Users },
    { id: "institutions", label: "Institutions", icon: Building2 },
    { id: "analytics", label: "System Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
  ],
}

export function Sidebar({ userType, activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuth()
  const items = sidebarItems[userType]

  const handleLogout = () => {
    logout()
    // Page will automatically redirect to login due to AuthGuard
  }

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border"
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold text-sidebar-foreground"
          >
            Prashiskshan
          </motion.h1>
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {items.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </motion.div>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
              <User className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || `${userType.charAt(0).toUpperCase() + userType.slice(1)} User`}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
