"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { type Doctor } from "@/types/doctor"

interface TimeSelectionProps {
  doctor: Doctor
  selectedDate: Date
  selectedTime: string | null
  onTimeSelect: (time: string) => void
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

export function TimeSelection({ doctor, selectedDate, selectedTime, onTimeSelect }: TimeSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select a Time</h2>
      
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
              {formatDate(selectedDate)}
            </p>
          </div>
        </div>
        
        <h4 className="font-medium mb-4">Available Time Slots</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {doctor.availableTimeSlots.map((time) => (
            <button
              key={time}
              className={cn(
                "p-3 rounded-md border text-center transition",
                selectedTime === time
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  : "border-border hover:border-blue-600"
              )}
              onClick={() => onTimeSelect(time)}
            >
              <Clock className="h-4 w-4 mx-auto mb-1" />
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
