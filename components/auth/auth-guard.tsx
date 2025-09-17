"use client"

import * as React from "react"
import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuth()
  const [authMode, setAuthMode] = React.useState<"login" | "register">("login")

  const handleAuthSuccess = (userType: string, userData: any) => {
    // Authentication successful, component will re-render with isAuthenticated = true
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">Prashiskshan</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connecting students, faculty, and industry partners for meaningful internship experiences
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">For Students</h3>
                  <p className="text-sm text-muted-foreground">
                    Find internships, track applications, and manage your progress
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-secondary mb-2">For Faculty</h3>
                  <p className="text-sm text-muted-foreground">Oversee students and manage evaluations efficiently</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-accent mb-2">For Industry</h3>
                  <p className="text-sm text-muted-foreground">Post internships and manage talented candidates</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-muted-foreground mb-2">For Admins</h3>
                  <p className="text-sm text-muted-foreground">System management and comprehensive analytics</p>
                </div>
              </div>
            </motion.div>

            {/* Right side - Auth Forms */}
            <div className="flex justify-center">
              {authMode === "login" ? (
                <LoginForm onSuccess={handleAuthSuccess} onSwitchToRegister={() => setAuthMode("register")} />
              ) : (
                <RegisterForm onSuccess={handleAuthSuccess} onSwitchToLogin={() => setAuthMode("login")} />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
