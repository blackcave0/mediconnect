"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { 
  User, 
  Settings, 
  CreditCard, 
  Bell, 
  Lock, 
  FileText, 
  LogOut, 
  Heart,
  Calendar
} from "lucide-react"

interface AccountTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AccountTabs({ activeTab, setActiveTab }: AccountTabsProps) {
  const tabs = [
    { id: "profile", label: "Profile Information", icon: <User className="h-5 w-5" /> },
    { id: "security", label: "Security Settings", icon: <Lock className="h-5 w-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
    { id: "payment", label: "Payment Methods", icon: <CreditCard className="h-5 w-5" /> },
    { id: "appointments", label: "Appointments", icon: <Calendar className="h-5 w-5" /> },
    { id: "saved-doctors", label: "Saved Doctors", icon: <Heart className="h-5 w-5" /> },
    { id: "medical-history", label: "Medical History", icon: <FileText className="h-5 w-5" /> },
  ]
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Account Settings</h2>
      </div>
      
      <div className="p-4">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "w-full flex items-center px-4 py-3 rounded-lg transition",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  : "text-muted-foreground hover:bg-primary/5"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={cn(
                "mr-3",
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground"
              )}>
                {tab.icon}
              </span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
          
          <button
            className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Sign Out</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
