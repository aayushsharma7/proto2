"use client"

import type * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sidebar } from "./sidebar"
import { MobileSidebar } from "./mobile-sidebar"

interface ResponsiveLayoutProps {
  userType: "student" | "faculty" | "industry" | "admin"
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}

export function ResponsiveLayout({ userType, activeTab, onTabChange, children }: ResponsiveLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-background">
      {isMobile ? (
        <>
          <MobileSidebar userType={userType} activeTab={activeTab} onTabChange={onTabChange} />
          <main className="px-4 py-6">{children}</main>
        </>
      ) : (
        <>
          <Sidebar userType={userType} activeTab={activeTab} onTabChange={onTabChange} />
          <main className="ml-64 min-h-screen">{children}</main>
        </>
      )}
    </div>
  )
}
