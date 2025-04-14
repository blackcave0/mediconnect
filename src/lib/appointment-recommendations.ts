"use client"

import { type Doctor } from "@/types/doctor"

// Types for recommendation system
export interface AppointmentRecommendation {
  doctorId: number
  date: string
  time: string
  score: number
  reason: string
  type: string
}

// Mock patient history data - in a real app, this would come from an API
const patientHistory = {
  previousDoctors: [1, 3], // IDs of doctors the patient has seen before
  preferredTimes: ["morning", "afternoon"], // Patient's preferred time of day
  conditions: ["cardiology", "general"], // Patient's medical conditions
  lastAppointments: [
    { doctorId: 1, date: "2025-03-15" },
    { doctorId: 3, date: "2025-02-20" }
  ],
  preferredDays: ["wednesday", "thursday", "friday"] // Days the patient prefers
}

// Helper function to determine time of day
const getTimeOfDay = (time: string): "morning" | "afternoon" | "evening" => {
  const hour = parseInt(time.split(":")[0])
  if (hour < 12) return "morning"
  if (hour < 17) return "afternoon"
  return "evening"
}

// Helper function to get day of week from date
const getDayOfWeek = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
}

// Calculate recommendation score based on various factors
const calculateRecommendationScore = (
  doctor: Doctor,
  date: string,
  time: string,
  patientHistory: any
): { score: number; reason: string } => {
  let score = 0
  let reasons: string[] = []

  // Factor 1: Previous doctor relationship
  if (patientHistory.previousDoctors.includes(doctor.id)) {
    score += 30
    reasons.push("You've seen this doctor before")
  }

  // Factor 2: Doctor's specialty matches patient's conditions
  if (patientHistory.conditions.includes(doctor.specialty.toLowerCase())) {
    score += 25
    reasons.push(`Specialist in ${doctor.specialty}`)
  }

  // Factor 3: Preferred time of day
  const timeOfDay = getTimeOfDay(time)
  if (patientHistory.preferredTimes.includes(timeOfDay)) {
    score += 15
    reasons.push(`Your preferred time (${timeOfDay})`)
  }

  // Factor 4: Preferred day of week
  const dayOfWeek = getDayOfWeek(date)
  if (patientHistory.preferredDays.includes(dayOfWeek)) {
    score += 15
    reasons.push(`Your preferred day (${dayOfWeek})`)
  }

  // Factor 5: Availability soon (within 7 days)
  const appointmentDate = new Date(date)
  const today = new Date()
  const daysDifference = Math.floor((appointmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysDifference <= 3) {
    score += 15
    reasons.push("Available very soon")
  } else if (daysDifference <= 7) {
    score += 10
    reasons.push("Available within a week")
  }

  // Return score and primary reason
  return { 
    score, 
    reason: reasons.length > 0 ? reasons[0] : "Available appointment" 
  }
}

// Generate appointment recommendations
export const generateRecommendations = (
  doctors: Doctor[],
  selectedDoctorId: number | null = null
): AppointmentRecommendation[] => {
  const recommendations: AppointmentRecommendation[] = []
  
  // If a doctor is selected, prioritize their appointments
  const doctorsToProcess = selectedDoctorId 
    ? [doctors.find(d => d.id === selectedDoctorId)!].filter(Boolean)
    : doctors

  // Process each doctor
  doctorsToProcess.forEach(doctor => {
    // Process each available date
    doctor.availableDates.forEach(dateStr => {
      // For each date, check a few time slots
      const sampleTimes = doctor.availableTimeSlots.filter((_, index) => index % 3 === 0) // Sample every 3rd time slot
      
      sampleTimes.forEach(time => {
        // Calculate recommendation score
        const { score, reason } = calculateRecommendationScore(doctor, dateStr, time, patientHistory)
        
        // Determine appointment type based on patient history and doctor offerings
        const recommendedType = doctor.appointmentTypes.includes("Video consultation") 
          ? "video" 
          : "in-person"
        
        // Add to recommendations if score is above threshold
        if (score > 20) {
          recommendations.push({
            doctorId: doctor.id,
            date: dateStr,
            time,
            score,
            reason,
            type: recommendedType
          })
        }
      })
    })
  })
  
  // Sort by score (highest first)
  return recommendations.sort((a, b) => b.score - a.score)
}

// Get top recommendations
export const getTopRecommendations = (
  doctors: Doctor[],
  selectedDoctorId: number | null = null,
  limit: number = 3
): AppointmentRecommendation[] => {
  const allRecommendations = generateRecommendations(doctors, selectedDoctorId)
  return allRecommendations.slice(0, limit)
}
