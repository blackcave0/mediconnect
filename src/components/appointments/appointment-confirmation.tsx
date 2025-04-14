"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react"
import { type Doctor } from "@/types/doctor"
import { type AppointmentType } from "@/types/appointment"

interface AppointmentConfirmationProps {
  doctor: Doctor
  selectedDate: Date
  selectedTime: string
  selectedType: string
  appointmentTypes: AppointmentType[]
  onConfirm: () => void
  bookingStatus: "idle" | "loading" | "success" | "error"
}

// Format date for display
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

export function AppointmentConfirmation({ 
  doctor, 
  selectedDate, 
  selectedTime, 
  selectedType,
  appointmentTypes,
  onConfirm,
  bookingStatus
}: AppointmentConfirmationProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Appointment</h2>
      
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold">{doctor.name}</h4>
                <p className="text-blue-600">{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">{doctor.location}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm">{selectedTime}</span>
              </div>
              <div className="flex items-center">
                {appointmentTypes.find(t => t.id === selectedType)?.icon}
                <span className="text-sm ml-2">
                  {appointmentTypes.find(t => t.id === selectedType)?.name}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-4 rounded-md">
            <h4 className="font-medium mb-2">Before Your Appointment</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                Please arrive 15 minutes before your scheduled time.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                Bring your insurance card and a valid ID.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                List of current medications and medical history.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                You can cancel or reschedule up to 24 hours before.
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={onConfirm} 
          disabled={bookingStatus === "loading"}
        >
          {bookingStatus === "loading" ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : "Confirm Appointment"}
        </Button>
      </div>
    </div>
  )
}
