"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Calendar as CalendarIcon } from "lucide-react"
import { type Doctor } from "@/types/doctor"

interface DoctorSelectionProps {
  doctors: Doctor[]
  onSelectDoctor: (doctorId: number) => void
}

export function DoctorSelection({ doctors, onSelectDoctor }: DoctorSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select a Doctor</h2>
      
      <div className="space-y-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
          >
            <div className="md:w-1/4 relative">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:w-3/4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-blue-600">{doctor.specialty}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{doctor.reviews} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">{doctor.location} • {doctor.distance}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">Next available: {doctor.availableDates[0]}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-1">Appointment types:</div>
                <div className="flex flex-wrap gap-2">
                  {doctor.appointmentTypes.map((type) => (
                    <span 
                      key={type}
                      className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={() => onSelectDoctor(doctor.id)}>
                  Select & Continue
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
