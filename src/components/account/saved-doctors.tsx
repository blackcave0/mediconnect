"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Calendar, Heart } from "lucide-react"

interface Doctor {
  id: number
  name: string
  specialty: string
  image: string
  rating: number
  location: string
}

interface SavedDoctorsProps {
  doctors: Doctor[]
}

export function SavedDoctors({ doctors }: SavedDoctorsProps) {
  const handleRemove = (id: number) => {
    // In a real app, this would remove the doctor from the saved list
    alert(`Doctor with ID ${id} removed from favorites`)
  }
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Saved Doctors</h2>
      </div>
      
      <div className="p-6">
        {doctors.length > 0 ? (
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id}
                className="flex flex-col md:flex-row bg-background border border-border rounded-lg overflow-hidden"
              >
                <div className="md:w-1/4 relative">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-black/50 rounded-full text-red-500"
                    onClick={() => handleRemove(doctor.id)}
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
                
                <div className="p-6 md:w-3/4">
                  <div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-blue-600">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{doctor.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <Link href={`/doctors/${doctor.id}`} className="text-blue-600 font-medium hover:underline">
                      View Profile
                    </Link>
                    <Link href={`/appointments?doctor=${doctor.id}`}>
                      <Button>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-background border border-border rounded-lg">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No saved doctors</h3>
            <p className="text-muted-foreground mb-4">
              You haven't saved any doctors to your favorites yet
            </p>
            <Link href="/doctors">
              <Button>
                Find Doctors
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
