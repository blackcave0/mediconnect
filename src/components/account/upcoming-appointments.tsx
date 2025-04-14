"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar, Clock, MapPin, Video, Home, Building2 } from "lucide-react"

interface Appointment {
  doctorId: number | null
  date: string | null
  time: string | null
  type: string | null
  bookedAt: string
}

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  
  // Fetch appointments from localStorage
  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      try {
        const storedAppointments = localStorage.getItem('appointments');
        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        }
      } catch (error) {
        console.error("Error loading appointments:", error);
      }
    }
  }, [])
  
  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get appointment type icon
  const getAppointmentTypeIcon = (type: string | null) => {
    switch (type) {
      case "in-person":
        return <Building2 className="h-4 w-4 text-muted-foreground mr-1" />;
      case "video":
        return <Video className="h-4 w-4 text-muted-foreground mr-1" />;
      case "home":
        return <Home className="h-4 w-4 text-muted-foreground mr-1" />;
      default:
        return null;
    }
  };
  
  // Get appointment type name
  const getAppointmentTypeName = (type: string | null): string => {
    switch (type) {
      case "in-person":
        return "In-person Visit";
      case "video":
        return "Video Consultation";
      case "home":
        return "Home Visit";
      default:
        return "Appointment";
    }
  };
  
  // Sample doctor data (in a real app, this would come from an API)
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      location: "Downtown Medical Center"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      location: "Neurological Institute"
    },
    {
      id: 3,
      name: "Dr. Jessica Williams",
      specialty: "Pediatrics",
      location: "Children's Medical Center"
    }
  ];
  
  // Get doctor info
  const getDoctorInfo = (doctorId: number | null) => {
    if (!doctorId) return { name: "Unknown Doctor", specialty: "", location: "" };
    
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ?? { name: "Unknown Doctor", specialty: "", location: "" };
  };
  
  // Sort appointments by date
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Filter to only show upcoming appointments
  const upcomingAppointments = sortedAppointments.filter(appointment => {
    if (!appointment.date) return false;
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today;
  });
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Your Upcoming Appointments</h2>
      </div>
      
      <div className="p-6">
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => {
              const doctor = getDoctorInfo(appointment.doctorId);
              
              return (
                <div 
                  key={index}
                  className="bg-background border border-border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span>{formatDate(appointment.date)}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm">
                        {getAppointmentTypeIcon(appointment.type)}
                        <span>{getAppointmentTypeName(appointment.type)}</span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                        <span>{doctor.location}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      Upcoming
                    </span>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20">Cancel</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any appointments scheduled
            </p>
            <Link href="/appointments">
              <Button>
                Book New Appointment
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
