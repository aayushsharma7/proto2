"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

interface MobileSidebarProps {
  userType: "student" | "faculty" | "industry" | "admin"
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileSidebar({ userType, activeTab, onTabChange }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useIsMobile()

  const handleTabChange = (tab: string) => {
    onTabChange(tab)
    setIsOpen(false) // Close mobile menu after selection
  }

  if (!isMobile) {
    return <Sidebar userType={userType} activeTab={activeTab} onTabChange={onTabChange} />
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="sm"
              className="text-sidebar-foreground p-3 touch-manipulation min-h-[44px] min-w-[44px]"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 bg-sidebar">
            <div className="flex h-full flex-col">
              <Sidebar userType={userType} activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
          </SheetContent>
        </Sheet>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-semibold text-sidebar-foreground truncate"
        >
          Prashiskshan
        </motion.h1>
        <div className="w-12" /> {/* Increased spacer for better centering */}
      </div>

      <div className="h-16" />
    </>
  )
}
