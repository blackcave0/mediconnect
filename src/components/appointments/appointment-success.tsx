"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, MapPin } from "lucide-react"

interface AppointmentSuccessProps {
  doctorName: string
  specialty: string
  date: string
  time: string
  location: string
  type: string
}

export function AppointmentSuccess({
  doctorName,
  specialty,
  date,
  time,
  location,
  type
}: AppointmentSuccessProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
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

  // Circle animation for the success checkmark
  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  }

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 }
    }
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto text-center py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Success Animation */}
      <motion.div className="w-32 h-32 mx-auto mb-8" variants={itemVariants}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#10B981"
            strokeWidth="4"
            fill="none"
            variants={circleVariants}
          />
          <motion.path
            d="M30 50 L45 65 L70 35"
            fill="none"
            stroke="#10B981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkVariants}
          />
        </svg>
      </motion.div>

      {/* Success Message */}
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={itemVariants}
      >
        Appointment Confirmed!
      </motion.h2>

      <motion.p
        className="text-xl text-muted-foreground mb-8"
        variants={itemVariants}
      >
        Your appointment has been successfully scheduled
      </motion.p>

      {/* Appointment Details */}
      <motion.div
        className="bg-card border border-border rounded-xl p-8 mb-8"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold mb-6">Appointment Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Doctor</p>
              <p className="font-medium">{doctorName}</p>
              <p className="text-sm text-blue-600">{specialty}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{date}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium">{time}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{location}</p>
              <p className="text-sm text-muted-foreground">{type}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={itemVariants}>
        <Link href="/account?tab=appointments">
          <Button variant="outline" size="lg">
            View My Appointments
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg">
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
