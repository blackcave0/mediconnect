"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DoctorSignupForm } from "@/components/doctor-signup/doctor-signup-form"
import { 
  Shield, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle2,
  ChevronRight
} from "lucide-react"

export default function DoctorSignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    },
    professionalInfo: {
      specialty: "",
      licenseNumber: "",
      licenseState: "",
      yearsOfExperience: "",
      education: "",
      hospitalAffiliations: ""
    },
    practiceInfo: {
      practiceName: "",
      practiceAddress: "",
      practiceCity: "",
      practiceState: "",
      practiceZip: "",
      practicePhone: "",
      acceptingNewPatients: true
    }
  })

  const handleStepComplete = (step: number, data: any) => {
    setFormData(prev => {
      if (step === 1) {
        return { ...prev, personalInfo: data }
      } else if (step === 2) {
        return { ...prev, professionalInfo: data }
      } else {
        return { ...prev, practiceInfo: data }
      }
    })
    setCurrentStep(step + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Join Our Network of Healthcare Professionals</h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with patients, manage appointments, and grow your practice with MediConnect
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Steps Progress */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {[
                  { num: 1, title: "Personal Information" },
                  { num: 2, title: "Professional Details" },
                  { num: 3, title: "Practice Information" },
                  { num: 4, title: "Verification" }
                ].map((step) => (
                  <div key={step.num} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > step.num ? "bg-green-100 text-green-600" :
                      currentStep === step.num ? "bg-blue-600 text-white" :
                      "bg-gray-100 text-gray-400"
                    }`}>
                      {currentStep > step.num ? <CheckCircle2 className="h-5 w-5" /> : step.num}
                    </div>
                    <span className="text-sm mt-2 text-muted-foreground">
                      {step.title}
                    </span>
                  </div>
                ))}
                
                {/* Connecting lines */}
                <div className="absolute left-0 right-0 flex justify-center">
                  <div className="w-2/3 flex">
                    <div className={`h-0.5 flex-1 ${currentStep > 1 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                    <div className={`h-0.5 flex-1 ${currentStep > 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                    <div className={`h-0.5 flex-1 ${currentStep > 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold">
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Professional Details"}
                  {currentStep === 3 && "Practice Information"}
                  {currentStep === 4 && "Verification Complete"}
                </h2>
              </div>
              
              <div className="p-6">
                <DoctorSignupForm 
                  currentStep={currentStep} 
                  formData={formData}
                  onStepComplete={handleStepComplete}
                  onBack={handleBack}
                />
              </div>
            </div>
            
            {/* Benefits Section */}
            {currentStep < 4 && (
              <motion.div 
                className="mt-12 bg-primary/5 rounded-xl p-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-center"
                  variants={itemVariants}
                >
                  Why Join MediConnect?
                </motion.h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Streamlined Scheduling</h4>
                      <p className="text-muted-foreground">
                        Manage your appointments efficiently with our intuitive calendar system.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Expand Your Patient Base</h4>
                      <p className="text-muted-foreground">
                        Connect with new patients seeking your specialty and expertise.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Digital Prescriptions</h4>
                      <p className="text-muted-foreground">
                        Issue and manage prescriptions electronically with our secure platform.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">HIPAA Compliant</h4>
                      <p className="text-muted-foreground">
                        Our platform ensures the highest standards of security and privacy for patient data.
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mt-8 text-center"
                  variants={itemVariants}
                >
                  <p className="text-muted-foreground mb-4">
                    Join over 5,000 healthcare professionals already using MediConnect
                  </p>
                  <Link href="/doctor-portal" className="text-blue-600 font-medium inline-flex items-center">
                    Learn more about our doctor portal <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
