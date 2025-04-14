"use client"

import { useState, useEffect } from "react"
import { type Doctor } from "@/types/doctor"

export function useAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [appointmentHistory, setAppointmentHistory] = useState<any[]>([])
  
  // Load appointment history from localStorage on component mount
  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      try {
        const storedAppointments = localStorage.getItem('appointments');
        if (storedAppointments) {
          setAppointmentHistory(JSON.parse(storedAppointments));
        }
      } catch (error) {
        console.error("Error loading appointment history:", error);
      }
    }
  }, []);
  
  // Function to check if a date is available for the selected doctor
  const isDateAvailable = (doctor: Doctor, date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return doctor.availableDates.includes(dateString);
  };
  
  // Function to handle doctor selection
  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedType(null);
    setStep(2);
  };
  
  // Function to handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Function to handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    // We don't automatically advance to the next step here
    // as we're using a separate continue button in the UI
  };
  
  // Function to handle appointment type selection
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep(4);
  };
  
  // Function to go back to previous step
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      
      if (step === 4) {
        setSelectedType(null);
      } else if (step === 3) {
        setSelectedTime(null);
        setSelectedDate(null);
      } else if (step === 2) {
        setSelectedDoctor(null);
      }
    }
  };
  
  // Function to handle appointment booking
  const handleBookAppointment = () => {
    // In a real app, this would send the booking data to the server
    setBookingStatus("loading");
    
    // Store appointment in localStorage
    const appointment = {
      doctorId: selectedDoctor,
      date: selectedDate?.toISOString(),
      time: selectedTime,
      type: selectedType,
      bookedAt: new Date().toISOString()
    };
    
    try {
      const isBrowser = typeof window !== 'undefined';
      if (isBrowser) {
        // Simulate API call with a short delay
        setTimeout(() => {
          // Get existing appointments or initialize empty array
          const existingAppointments = JSON.parse(localStorage.getItem('appointments') ?? '[]');
          existingAppointments.push(appointment);
          localStorage.setItem('appointments', JSON.stringify(existingAppointments));
          
          // Update local state
          setAppointmentHistory([...existingAppointments]);
          
          // Set success status
          setBookingStatus("success");
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      setBookingStatus("error");
    }
  };
  
  // Function to reset the booking flow
  const resetBooking = () => {
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedType(null);
    setBookingStatus("idle");
    setStep(1);
  };

  return {
    selectedDoctor,
    selectedDate,
    selectedTime,
    selectedType,
    step,
    bookingStatus,
    appointmentHistory,
    isDateAvailable,
    handleDoctorSelect,
    handleDateSelect,
    handleTimeSelect,
    handleTypeSelect,
    goBack,
    handleBookAppointment,
    resetBooking
  }
}
