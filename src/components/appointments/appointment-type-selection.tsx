"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon } from "lucide-react"
import { type Doctor } from "@/types/doctor"
import { type AppointmentType } from "@/types/appointment"

interface AppointmentTypeSelectionProps {
  doctor: Doctor
  selectedDate: Date
  selectedTime: string
  selectedType: string | null
  appointmentTypes: AppointmentType[]
  onTypeSelect: (type: string) => void
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

export function AppointmentTypeSelection({ 
  doctor, 
  selectedDate, 
  selectedTime, 
  selectedType, 
  appointmentTypes,
  onTypeSelect 
}: AppointmentTypeSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select Appointment Type</h2>
      
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center mb-6">
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
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-blue-600">{doctor.specialty}</p>
            <p className="text-muted-foreground mt-1">
              <CalendarIcon className="inline-block h-4 w-4 mr-1" />
              {formatDate(selectedDate)} at {selectedTime}
            </p>
          </div>
        </div>
        
        <h4 className="font-medium mb-4">How would you like to meet?</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {appointmentTypes.map((type) => (
            doctor.appointmentTypes.includes(type.name) && (
              <button
                key={type.id}
                className={cn(
                  "p-6 rounded-xl border text-center transition",
                  selectedType === type.id
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "border-border hover:border-blue-600"
                )}
                onClick={() => onTypeSelect(type.id)}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  {type.icon}
                </div>
                <h5 className="font-medium mb-1">{type.name}</h5>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
