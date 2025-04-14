"use client"

import React from "react"
import Image from "next/image"
import ReactCalendar from "react-calendar"
import { type Value } from "@/types/calendar"
import { type Doctor } from "@/types/doctor"
import { useAppointment } from "@/hooks/use-appointment"

interface DateSelectionProps {
  doctor: Doctor
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
}

export function DateSelection({ doctor, selectedDate, onDateSelect }: DateSelectionProps) {
  const { isDateAvailable } = useAppointment();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select a Date</h2>
      
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
          </div>
        </div>
        
        <div className="mx-auto max-w-md">
          <ReactCalendar
            onChange={(value: Value) => {
              if (value instanceof Date) {
                onDateSelect(value);
              }
            }}
            value={selectedDate}
            minDate={new Date()}
            tileDisabled={({date}) => !isDateAvailable(doctor, date)}
            className="border-none shadow-none w-full"
          />
          
          <div className="mt-4 text-center text-muted-foreground text-sm">
            <p>Available dates are highlighted. Select a date to continue.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
