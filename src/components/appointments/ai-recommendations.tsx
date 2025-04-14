"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Star, Sparkles, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Doctor } from "@/types/doctor"
import { type AppointmentRecommendation } from "@/lib/appointment-recommendations"

interface AIRecommendationsProps {
  recommendations: AppointmentRecommendation[]
  doctors: Doctor[]
  onSelectRecommendation: (doctorId: number, date: string, time: string, type: string) => void
}

export function AIRecommendations({ 
  recommendations, 
  doctors,
  onSelectRecommendation 
}: AIRecommendationsProps) {
  // Format date for display
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric'
    })
  }

  // Get doctor info by ID
  const getDoctorById = (id: number): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-medium">AI-Recommended Appointments</h3>
      </div>

      {recommendations.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recommendations.map((rec, index) => {
            const doctor = getDoctorById(rec.doctorId)
            if (!doctor) return null

            return (
              <motion.div
                key={`${rec.doctorId}-${rec.date}-${rec.time}`}
                className={cn(
                  "bg-white border border-blue-100 rounded-xl p-4 cursor-pointer hover:shadow-md transition",
                  "dark:bg-blue-900/10 dark:border-blue-900/30"
                )}
                onClick={() => onSelectRecommendation(rec.doctorId, rec.date, rec.time, rec.type)}
                variants={itemVariants}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                    <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">{doctor.specialty}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{formatDate(rec.date)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{rec.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{rec.reason}</div>
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <span className="text-sm font-medium mr-1">Select</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-6 text-center">
          <p className="text-muted-foreground">
            Select a doctor to see personalized appointment recommendations
          </p>
        </div>
      )}
    </div>
  )
}
