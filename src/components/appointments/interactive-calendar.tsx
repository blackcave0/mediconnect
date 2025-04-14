"use client"

import React, { useState, useEffect } from "react"
import { Calendar as ReactCalendar } from "react-calendar"
import DatePicker from "react-datepicker"
import { format, addDays, isSameDay, isAfter, isBefore, startOfDay } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Sparkles
} from "lucide-react"
import { type Doctor } from "@/types/doctor"
import { getTopRecommendations, type AppointmentRecommendation } from "@/lib/appointment-recommendations"

import "react-calendar/dist/Calendar.css"
import "react-datepicker/dist/react-datepicker.css"

interface InteractiveCalendarProps {
  doctor: Doctor
  onDateTimeSelect: (date: Date, time: string) => void
}

export function InteractiveCalendar({ doctor, onDateTimeSelect }: InteractiveCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [recommendations, setRecommendations] = useState<AppointmentRecommendation[]>([])
  
  // Convert string dates to Date objects
  useEffect(() => {
    if (doctor && doctor.availableDates) {
      const dates = doctor.availableDates.map(dateStr => {
        const [year, month, day] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day)
      })
      setAvailableDates(dates)
      
      // Get recommendations for this doctor
      const doctorRecommendations = getTopRecommendations([doctor], doctor.id, 5)
      setRecommendations(doctorRecommendations)
    }
  }, [doctor])
  
  // Update available times when date is selected
  useEffect(() => {
    if (selectedDate && doctor) {
      setAvailableTimes(doctor.availableTimeSlots)
      setSelectedTime(null)
    }
  }, [selectedDate, doctor])
  
  // Check if a date is available
  const isDateAvailable = (date: Date): boolean => {
    return availableDates.some(availableDate => 
      isSameDay(availableDate, date)
    )
  }
  
  // Check if a date is recommended
  const isDateRecommended = (date: Date): boolean => {
    return recommendations.some(rec => {
      const [year, month, day] = rec.date.split('-').map(Number)
      const recDate = new Date(year, month - 1, day)
      return isSameDay(recDate, date)
    })
  }
  
  // Check if a time is recommended
  const isTimeRecommended = (time: string): boolean => {
    if (!selectedDate) return false
    
    const dateStr = selectedDate.toISOString().split('T')[0]
    return recommendations.some(rec => 
      rec.date === dateStr && rec.time === time
    )
  }
  
  // Get recommendation reason for a time slot
  const getRecommendationReason = (time: string): string | null => {
    if (!selectedDate) return null
    
    const dateStr = selectedDate.toISOString().split('T')[0]
    const recommendation = recommendations.find(rec => 
      rec.date === dateStr && rec.time === time
    )
    
    return recommendation ? recommendation.reason : null
  }
  
  // Handle date selection
  const handleDateChange = (date: Date | Date[]) => {
    if (date instanceof Date) {
      setSelectedDate(date)
    }
  }
  
  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (selectedDate) {
      onDateTimeSelect(selectedDate, time)
    }
  }
  
  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return "Select a date"
    return format(date, "EEEE, MMMM d, yyyy")
  }
  
  // Custom tile content for calendar
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isAvailable = isDateAvailable(date)
      const isRecommended = isDateRecommended(date)
      
      return (
        <div className={cn(
          "w-full h-full flex items-center justify-center",
          (isAvailable || isRecommended) ? "relative" : ""
        )}>
          {isRecommended && (
            <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></div>
          )}
          {isAvailable && (
            <div className="absolute bottom-0 w-1 h-1 bg-green-500 rounded-full"></div>
          )}
        </div>
      )
    }
    return null
  }
  
  // Custom tile class for calendar
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const today = startOfDay(new Date())
      const isAvailable = isDateAvailable(date)
      const isPast = isBefore(date, today)
      const isRecommended = isDateRecommended(date)
      
      return cn(
        "rounded-md transition-colors",
        isAvailable && !isPast ? "hover:bg-blue-100 dark:hover:bg-blue-900/30" : "",
        isPast ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "",
        !isAvailable && !isPast ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "",
        isRecommended && !isPast ? "border border-yellow-400" : "",
        selectedDate && isSameDay(date, selectedDate) ? "bg-blue-600 text-white hover:bg-blue-700" : ""
      )
    }
    return ""
  }
  
  // Disable unavailable dates
  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const today = startOfDay(new Date())
      return !isDateAvailable(date) || isBefore(date, today)
    }
    return false
  }
  
  // Navigate to next/previous month
  const navigateMonth = (increment: number) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + increment)
    setCurrentMonth(newMonth)
  }
  
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Section */}
        <div className="lg:w-1/2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Select Date</h3>
            <div className="flex items-center">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="mx-2 font-medium">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button 
                onClick={() => navigateMonth(1)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="calendar-container">
            <ReactCalendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={tileContent}
              tileClassName={tileClassName}
              tileDisabled={tileDisabled}
              minDate={new Date()}
              maxDate={addDays(new Date(), 60)}
              activeStartDate={currentMonth}
              onActiveStartDateChange={({ activeStartDate }) => 
                activeStartDate && setCurrentMonth(activeStartDate)
              }
              className="border-none shadow-none w-full"
            />
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span>AI Recommended</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
              <span>Unavailable</span>
            </div>
          </div>
        </div>
        
        {/* Time Slots Section */}
        <div className="lg:w-1/2 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Select Time</h3>
            {selectedDate ? (
              <p className="text-muted-foreground">
                <CalendarIcon className="inline-block h-4 w-4 mr-1" />
                {formatDate(selectedDate)}
              </p>
            ) : (
              <p className="text-muted-foreground">Please select a date first</p>
            )}
          </div>
          
          {selectedDate ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableTimes.map((time) => {
                const isRecommended = isTimeRecommended(time)
                const recommendationReason = getRecommendationReason(time)
                
                return (
                  <button
                    key={time}
                    className={cn(
                      "p-3 rounded-md border text-center transition relative",
                      selectedTime === time
                        ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : isRecommended
                          ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10"
                          : "border-border hover:border-blue-600"
                    )}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {isRecommended && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <Clock className="h-4 w-4 mx-auto mb-1" />
                    {time}
                    {isRecommended && recommendationReason && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {recommendationReason}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 border border-dashed border-border rounded-lg">
              <div className="text-center text-muted-foreground">
                <CalendarIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Select a date to view available times</p>
              </div>
            </div>
          )}
          
          {selectedDate && selectedTime && (
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Appointment Selected</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedDate)} at {selectedTime}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
