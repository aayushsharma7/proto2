"use client"

import * as React from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
  institution: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  register: (userData: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem("prashiskshan_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        localStorage.removeItem("prashiskshan_user")
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("prashiskshan_user", JSON.stringify(userData))
  }

  const register = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("prashiskshan_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("prashiskshan_user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("prashiskshan_user", JSON.stringify(updatedUser))
    }
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
