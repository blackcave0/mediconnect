"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DoctorVerification } from "@/components/doctor-verification"
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Pill, 
  Settings, 
  ChevronRight,
  MessageSquare,
  Bell,
  CheckCircle2,
  XCircle,
  User,
  CalendarClock
} from "lucide-react"

// Sample data for upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    patient: "John Smith",
    age: 45,
    date: "April 13, 2025",
    time: "09:00 AM",
    type: "In-person",
    reason: "Annual checkup",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 2,
    patient: "Emily Johnson",
    age: 32,
    date: "April 13, 2025",
    time: "10:30 AM",
    type: "Video consultation",
    reason: "Follow-up appointment",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 3,
    patient: "Michael Brown",
    age: 58,
    date: "April 13, 2025",
    time: "02:00 PM",
    type: "In-person",
    reason: "Blood pressure check",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
  }
];

// Sample data for recent patients
const recentPatients = [
  {
    id: 1,
    name: "Sarah Davis",
    age: 29,
    lastVisit: "April 10, 2025",
    condition: "Migraine",
    status: "Follow-up scheduled",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Robert Wilson",
    age: 52,
    lastVisit: "April 9, 2025",
    condition: "Hypertension",
    status: "Prescription renewed",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Jennifer Martinez",
    age: 41,
    lastVisit: "April 8, 2025",
    condition: "Lower back pain",
    status: "Referred to specialist",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
  }
];

// Sample data for notifications
const notifications = [
  {
    id: 1,
    type: "appointment",
    message: "New appointment request from Maria Garcia",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "message",
    message: "John Smith sent you a message about his prescription",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: "system",
    message: "Your license verification has been completed",
    time: "2 hours ago",
    read: true
  },
  {
    id: 4,
    type: "appointment",
    message: "Emily Johnson rescheduled her appointment to April 15",
    time: "Yesterday",
    read: true
  }
];

// Doctor verification status
type VerificationStatus = "unverified" | "pending" | "verified";
const verificationStatus: VerificationStatus = "verified"; // Options: "unverified", "pending", "verified"

export default function DoctorPortalPage() {
  const [showNotifications, setShowNotifications] = useState(false)
  
  return (
    <div className="min-h-screen bg-background">
      {verificationStatus === "unverified" || verificationStatus === "pending" ? (
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Doctor Verification</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Complete the verification process to access the doctor portal
              </p>
            </div>
            
            <DoctorVerification />
          </div>
        </section>
      ) : (
        <>
          {/* Doctor Portal Header */}
          <section className="bg-blue-600 text-white py-8">
            <div className="container px-4 mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white">
                    <Image
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
                      alt="Dr. Michael Chen"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Welcome, Dr. Michael Chen</h1>
                    <p className="text-blue-100">Neurology • Neurological Institute</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="relative">
                    <button 
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition mr-2"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className="h-6 w-6" />
                      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                        2
                      </span>
                    </button>
                    
                    {/* Notifications Dropdown */}
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                        <div className="p-4 border-b border-border">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Notifications</h3>
                            <button className="text-sm text-blue-600">Mark all as read</button>
                          </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={cn(
                                "p-4 border-b border-border hover:bg-primary/5 transition",
                                !notification.read && "bg-blue-50 dark:bg-blue-900/10"
                              )}
                            >
                              <div className="flex items-start">
                                <div className="mr-3">
                                  {notification.type === "appointment" && (
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                  )}
                                  {notification.type === "message" && (
                                    <MessageSquare className="h-5 w-5 text-green-600" />
                                  )}
                                  {notification.type === "system" && (
                                    <Bell className="h-5 w-5 text-orange-600" />
                                  )}
                                </div>
                                <div>
                                  <p className={cn(
                                    "text-sm",
                                    !notification.read && "font-medium"
                                  )}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3 text-center border-t border-border">
                          <Link href="/doctor-portal/notifications" className="text-sm text-blue-600">
                            View all notifications
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Link href="/doctor-portal/messages">
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition mr-2">
                      <MessageSquare className="h-6 w-6" />
                    </button>
                  </Link>
                  
                  <Link href="/doctor-portal/settings">
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                      <Settings className="h-6 w-6" />
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 mr-3" />
                    <div>
                      <p className="text-blue-100">Today's Appointments</p>
                      <h3 className="text-2xl font-bold">3</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 mr-3" />
                    <div>
                      <p className="text-blue-100">Total Patients</p>
                      <h3 className="text-2xl font-bold">128</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 mr-3" />
                    <div>
                      <p className="text-blue-100">Unread Messages</p>
                      <h3 className="text-2xl font-bold">5</h3>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 mr-3" />
                    <div>
                      <p className="text-blue-100">Pending Reports</p>
                      <h3 className="text-2xl font-bold">2</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Main Content */}
          <section className="py-12">
            <div className="container px-4 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Today's Schedule */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-6 border-b border-border">
                      <h2 className="text-xl font-bold">Today's Schedule</h2>
                      <Link href="/doctor-portal/schedule" className="text-blue-600 font-medium inline-flex items-center">
                        Full Schedule <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    
                    <div className="p-6">
                      {upcomingAppointments.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingAppointments.map((appointment) => (
                            <div 
                              key={appointment.id}
                              className="flex items-center p-4 bg-background rounded-lg border border-border"
                            >
                              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                <Image
                                  src={appointment.image}
                                  alt={appointment.patient}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{appointment.patient}</h3>
                                  <span className={cn(
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                    appointment.status === "Confirmed"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  )}>
                                    {appointment.status}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.age} years • {appointment.reason}
                                </p>
                                <div className="flex items-center mt-1 text-sm">
                                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                  <span>{appointment.time}</span>
                                  <span className="mx-2 text-muted-foreground">•</span>
                                  <span>{appointment.type}</span>
                                </div>
                              </div>
                              
                              <div className="ml-4 flex space-x-2">
                                <Link href={`/doctor-portal/patients/${appointment.id}`}>
                                  <Button size="sm" variant="outline">
                                    View Profile
                                  </Button>
                                </Link>
                                <Link href={`/doctor-portal/appointments/${appointment.id}`}>
                                  <Button size="sm">
                                    Start Session
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">No appointments scheduled</h3>
                          <p className="text-muted-foreground mb-4">
                            You have no appointments scheduled for today
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Recent Patients */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center p-6 border-b border-border">
                      <h2 className="text-xl font-bold">Recent Patients</h2>
                      <Link href="/doctor-portal/patients" className="text-blue-600 font-medium inline-flex items-center">
                        View All <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {recentPatients.map((patient) => (
                          <div 
                            key={patient.id}
                            className="flex items-center p-4 bg-background rounded-lg border border-border"
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                              <Image
                                src={patient.image}
                                alt={patient.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-medium">{patient.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {patient.age} years • {patient.condition}
                              </p>
                              <div className="flex items-center mt-1 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>Last visit: {patient.lastVisit}</span>
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              <Link href={`/doctor-portal/patients/${patient.id}`}>
                                <Button size="sm" variant="outline">
                                  View Records
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-8">
                  {/* Quick Actions */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h2 className="text-xl font-bold">Quick Actions</h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Link href="/doctor-portal/appointments/new">
                          <button className="w-full p-4 bg-background rounded-lg border border-border hover:border-blue-600 transition text-center">
                            <Calendar className="h-6 w-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">New Appointment</span>
                          </button>
                        </Link>
                        
                        <Link href="/doctor-portal/prescriptions/new">
                          <button className="w-full p-4 bg-background rounded-lg border border-border hover:border-blue-600 transition text-center">
                            <Pill className="h-6 w-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">Write Prescription</span>
                          </button>
                        </Link>
                        
                        <Link href="/doctor-portal/patients/new">
                          <button className="w-full p-4 bg-background rounded-lg border border-border hover:border-blue-600 transition text-center">
                            <User className="h-6 w-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">Add Patient</span>
                          </button>
                        </Link>
                        
                        <Link href="/doctor-portal/reports">
                          <button className="w-full p-4 bg-background rounded-lg border border-border hover:border-blue-600 transition text-center">
                            <FileText className="h-6 w-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">Medical Reports</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Appointment Requests */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h2 className="text-xl font-bold">Appointment Requests</h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-background rounded-lg border border-border">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Maria Garcia</h3>
                              <p className="text-sm text-muted-foreground">
                                35 years • Headache consultation
                              </p>
                              <div className="flex items-center mt-1 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>April 15, 2025 • 11:00 AM</span>
                              </div>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                              Pending
                            </span>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <XCircle className="mr-1 h-4 w-4" />
                              Decline
                            </Button>
                            <Button size="sm" className="flex-1">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Accept
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-background rounded-lg border border-border">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">David Thompson</h3>
                              <p className="text-sm text-muted-foreground">
                                42 years • Follow-up appointment
                              </p>
                              <div className="flex items-center mt-1 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>April 16, 2025 • 02:30 PM</span>
                              </div>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                              Pending
                            </span>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <XCircle className="mr-1 h-4 w-4" />
                              Decline
                            </Button>
                            <Button size="sm" className="flex-1">
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
