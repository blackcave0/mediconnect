"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  User, 
  Settings, 
  CreditCard, 
  Bell, 
  Lock, 
  FileText, 
  LogOut, 
  Edit, 
  Camera, 
  ChevronRight,
  Shield,
  Heart,
  Calendar,
  Clock
} from "lucide-react"
import { UpcomingAppointments } from "@/components/account/upcoming-appointments"
import { AccountTabs } from "@/components/account/account-tabs"
import { ProfileForm } from "@/components/account/profile-form"
import { SecuritySettings } from "@/components/account/security-settings"
import { NotificationSettings } from "@/components/account/notification-settings"
import { PaymentMethods } from "@/components/account/payment-methods"
import { SavedDoctors } from "@/components/account/saved-doctors"
import { MedicalHistory } from "@/components/account/medical-history"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  
  // Mock user data
  const user = {
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    phone: "+1 (555) 123-4567",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    dateOfBirth: "1988-05-15",
    gender: "Female",
    bloodType: "O+",
    emergencyContact: {
      name: "Michael Thompson",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCBS-12345678",
      groupNumber: "GRP-987654",
      expirationDate: "2025-12-31"
    },
    appointments: [
      {
        id: 1,
        doctor: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        date: "April 20, 2025",
        time: "10:00 AM",
        status: "Upcoming"
      },
      {
        id: 2,
        doctor: "Dr. Michael Chen",
        specialty: "Neurology",
        date: "March 15, 2025",
        time: "9:00 AM",
        status: "Completed"
      }
    ],
    savedDoctors: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
        rating: 4.9,
        location: "Downtown Medical Center"
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Neurology",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
        rating: 4.8,
        location: "Neurological Institute"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-50 transition">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-blue-100 mb-4">{user.email} • {user.phone}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Link href="/records">
                  <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                    <FileText className="mr-2 h-4 w-4" />
                    Health Records
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Account Content */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <ProfileForm user={user} />
              )}
              
              {activeTab === "security" && (
                <SecuritySettings />
              )}
              
              {activeTab === "notifications" && (
                <NotificationSettings />
              )}
              
              {activeTab === "payment" && (
                <PaymentMethods />
              )}
              
              {activeTab === "saved-doctors" && (
                <SavedDoctors doctors={user.savedDoctors} />
              )}
              
              {activeTab === "medical-history" && (
                <MedicalHistory />
              )}
              
              {activeTab === "appointments" && (
                <div>
                  <UpcomingAppointments />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
