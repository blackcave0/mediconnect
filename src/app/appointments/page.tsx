"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Star, 
  ChevronLeft, 
  CheckCircle2,
  Video,
  Home,
  Building2,
  Sparkles
} from "lucide-react"
import { type Value } from "@/types/calendar"

// Import components
import { DoctorSelection } from "@/components/appointments/doctor-selection"
import { InteractiveCalendar } from "@/components/appointments/interactive-calendar"
import { AppointmentTypeSelection } from "@/components/appointments/appointment-type-selection"
import { AppointmentConfirmation } from "@/components/appointments/appointment-confirmation"
import { AppointmentSuccess } from "@/components/appointments/appointment-success"
import { ProgressSteps } from "@/components/appointments/progress-steps"
import { AIRecommendations } from "@/components/appointments/ai-recommendations"

// Import hooks and utilities
import { useAppointment } from "@/hooks/use-appointment"
import { getTopRecommendations, type AppointmentRecommendation } from "@/lib/appointment-recommendations"

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviews: 142,
    location: "Downtown Medical Center",
    distance: "1.2 miles away",
    availableDates: ["2025-04-14", "2025-04-15", "2025-04-16", "2025-04-17", "2025-04-18"],
    availableTimeSlots: [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
    ],
    appointmentTypes: ["In-person", "Video consultation"],
    insurances: ["Blue Cross", "Aetna", "Medicare"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    rating: 4.8,
    reviews: 126,
    location: "Neurological Institute",
    distance: "2.5 miles away",
    availableDates: ["2025-04-13", "2025-04-14", "2025-04-17", "2025-04-18", "2025-04-19"],
    availableTimeSlots: [
      "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", 
      "01:00 PM", "01:30 PM", "02:00 PM", "04:30 PM", "05:00 PM"
    ],
    appointmentTypes: ["In-person", "Video consultation", "Home visit"],
    insurances: ["United Healthcare", "Cigna", "Medicare"]
  },
  {
    id: 3,
    name: "Dr. Jessica Williams",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviews: 198,
    location: "Children's Medical Center",
    distance: "0.8 miles away",
    availableDates: ["2025-04-12", "2025-04-13", "2025-04-15", "2025-04-16", "2025-04-19"],
    availableTimeSlots: [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
    ],
    appointmentTypes: ["In-person", "Video consultation", "Home visit"],
    insurances: ["Blue Cross", "Cigna", "Medicaid"]
  }
];

// Appointment types
const appointmentTypes = [
  {
    id: "in-person",
    name: "In-person Visit",
    icon: <Building2 className="h-5 w-5" />,
    description: "Visit the doctor at their office"
  },
  {
    id: "video",
    name: "Video Consultation",
    icon: <Video className="h-5 w-5" />,
    description: "Consult with the doctor via video call"
  },
  {
    id: "home",
    name: "Home Visit",
    icon: <Home className="h-5 w-5" />,
    description: "Doctor visits you at your home"
  }
];

// Format date for display
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

export default function AppointmentsPage() {
  const {
    selectedDoctor,
    selectedDate,
    selectedTime,
    selectedType,
    step,
    bookingStatus,
    handleDoctorSelect,
    handleDateSelect,
    handleTimeSelect,
    handleTypeSelect,
    goBack,
    handleBookAppointment,
    resetBooking
  } = useAppointment();
  
  // State for AI recommendations
  const [recommendations, setRecommendations] = useState<AppointmentRecommendation[]>([])
  
  // Get the current doctor if one is selected
  const currentDoctor = selectedDoctor !== null 
    ? doctors.find(doctor => doctor.id === selectedDoctor) 
    : null;
    
  // Handle date and time selection in one step
  const handleDateTimeSelect = (date: Date, time: string) => {
    handleDateSelect(date);
    handleTimeSelect(time);
  };

  // Get appointment type name
  const getAppointmentTypeName = (typeId: string | null): string => {
    const appointmentType = appointmentTypes.find(type => type.id === typeId);
    return appointmentType ? appointmentType.name : "";
  };
  
  // Handle recommendation selection
  const handleRecommendationSelect = (doctorId: number, dateStr: string, time: string, type: string) => {
    // Convert string date to Date object
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    
    // Select the doctor
    handleDoctorSelect(doctorId)
    
    // Set the date and time
    handleDateSelect(date)
    handleTimeSelect(time)
    
    // Set the appointment type and advance to confirmation
    handleTypeSelect(type)
  }
  
  // Update recommendations when doctor selection changes
  useEffect(() => {
    // Generate recommendations based on selected doctor or all doctors
    const newRecommendations = getTopRecommendations(doctors, selectedDoctor)
    setRecommendations(newRecommendations)
  }, [selectedDoctor])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
            <p className="text-xl text-blue-100 mb-8">
              Schedule an appointment with our verified healthcare professionals
            </p>
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          {bookingStatus !== "success" && (
            <>
              {/* Progress Steps - Updated to reflect new flow */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-between">
                  {[
                    { num: 1, title: "Select Doctor" },
                    { num: 2, title: "Choose Date & Time" },
                    { num: 3, title: "Appointment Type" },
                    { num: 4, title: "Confirm" }
                  ].map((stepItem) => (
                    <div key={stepItem.num} className="flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        step >= stepItem.num 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-100 text-gray-400"
                      )}>
                        {step > stepItem.num ? <CheckCircle2 className="h-5 w-5" /> : stepItem.num}
                      </div>
                      <span className="text-sm mt-2 text-muted-foreground">
                        {stepItem.title}
                      </span>
                    </div>
                  ))}
                  
                  {/* Connecting lines */}
                  <div className="absolute left-0 right-0 flex justify-center">
                    <div className="w-2/3 flex">
                      <div className={`h-0.5 flex-1 ${step > 1 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                      <div className={`h-0.5 flex-1 ${step > 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                      <div className={`h-0.5 flex-1 ${step > 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Back Button (for steps 2-4) */}
              {step > 1 && (
                <div className="max-w-4xl mx-auto mb-6">
                  <Button 
                    variant="outline" 
                    className="flex items-center" 
                    onClick={goBack}
                    disabled={bookingStatus === "loading"}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </div>
              )}
            </>
          )}
          
          {/* AI Recommendations - Show at step 1 */}
          {step === 1 && bookingStatus !== "success" && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">AI-Powered Recommendations</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our AI system analyzes your medical history, preferred appointment times, and doctor availability 
                  to suggest the most suitable appointments for you.
                </p>
                
                <AIRecommendations 
                  recommendations={recommendations}
                  doctors={doctors}
                  onSelectRecommendation={handleRecommendationSelect}
                />
              </div>
            </div>
          )}
          
          {/* Step 1: Select Doctor */}
          {step === 1 && bookingStatus !== "success" && (
            <DoctorSelection 
              doctors={doctors} 
              onSelectDoctor={handleDoctorSelect} 
            />
          )}
          
          {/* Step 2: Choose Date and Time (Combined) */}
          {step === 2 && currentDoctor && bookingStatus !== "success" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
              
              <div className="mb-6 flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={currentDoctor.image}
                    alt={currentDoctor.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{currentDoctor.name}</h3>
                  <p className="text-blue-600">{currentDoctor.specialty}</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">{currentDoctor.location}</span>
                  </div>
                </div>
              </div>
              
              {/* AI Recommendations for this specific doctor */}
              <AIRecommendations 
                recommendations={recommendations.filter(rec => rec.doctorId === selectedDoctor)}
                doctors={doctors}
                onSelectRecommendation={handleRecommendationSelect}
              />
              
              <InteractiveCalendar 
                doctor={currentDoctor}
                onDateTimeSelect={handleDateTimeSelect}
              />
              
              {selectedDate && selectedTime && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => handleTypeSelect(null)}>
                    Continue
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Appointment Type */}
          {step === 3 && currentDoctor && selectedDate && selectedTime && bookingStatus !== "success" ? (
            <AppointmentTypeSelection 
              doctor={currentDoctor} 
              selectedDate={selectedDate} 
              selectedTime={selectedTime} 
              selectedType={selectedType} 
              appointmentTypes={appointmentTypes}
              onTypeSelect={handleTypeSelect} 
            />
          ) : null}
          
          {/* Step 4: Confirm */}
          {step === 4 && currentDoctor && selectedDate && selectedTime && selectedType && bookingStatus !== "success" && (
            <AppointmentConfirmation 
              doctor={currentDoctor} 
              selectedDate={selectedDate} 
              selectedTime={selectedTime} 
              selectedType={selectedType} 
              appointmentTypes={appointmentTypes}
              onConfirm={handleBookAppointment}
              bookingStatus={bookingStatus}
            />
          )}
          
          {/* Success Screen */}
          {bookingStatus === "success" && currentDoctor && selectedDate && selectedTime && selectedType && (
            <AppointmentSuccess 
              doctorName={currentDoctor.name}
              specialty={currentDoctor.specialty}
              date={formatDate(selectedDate)}
              time={selectedTime}
              location={currentDoctor.location}
              type={getAppointmentTypeName(selectedType)}
            />
          )}
        </div>
      </section>
    </div>
  )
}
