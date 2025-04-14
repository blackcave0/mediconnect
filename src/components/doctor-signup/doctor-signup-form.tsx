"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  ChevronLeft, 
  Upload, 
  FileText,
  Eye,
  EyeOff
} from "lucide-react"

interface DoctorSignupFormProps {
  currentStep: number
  formData: {
    personalInfo: {
      firstName: string
      lastName: string
      email: string
      phone: string
      password: string
      confirmPassword: string
    }
    professionalInfo: {
      specialty: string
      licenseNumber: string
      licenseState: string
      yearsOfExperience: string
      education: string
      hospitalAffiliations: string
    }
    practiceInfo: {
      practiceName: string
      practiceAddress: string
      practiceCity: string
      practiceState: string
      practiceZip: string
      practicePhone: string
      acceptingNewPatients: boolean
    }
  }
  onStepComplete: (step: number, data: any) => void
  onBack: () => void
}

export function DoctorSignupForm({ 
  currentStep, 
  formData, 
  onStepComplete, 
  onBack 
}: DoctorSignupFormProps) {
  // State for personal information form
  const [personalInfo, setPersonalInfo] = useState(formData.personalInfo)
  const [personalInfoErrors, setPersonalInfoErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  
  // State for professional information form
  const [professionalInfo, setProfessionalInfo] = useState(formData.professionalInfo)
  const [professionalInfoErrors, setProfessionalInfoErrors] = useState<Record<string, string>>({})
  
  // State for practice information form
  const [practiceInfo, setPracticeInfo] = useState(formData.practiceInfo)
  const [practiceInfoErrors, setPracticeInfoErrors] = useState<Record<string, string>>({})
  
  // State for file uploads
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: number}[]>([])
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { ease: "easeInOut" }
    }
  }
  
  // Handle personal information form changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is being edited
    if (personalInfoErrors[name]) {
      setPersonalInfoErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }
  
  // Handle professional information form changes
  const handleProfessionalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfessionalInfo(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is being edited
    if (professionalInfoErrors[name]) {
      setProfessionalInfoErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }
  
  // Handle practice information form changes
  const handlePracticeInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    setPracticeInfo(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error when field is being edited
    if (practiceInfoErrors[name]) {
      setPracticeInfoErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: file.size,
    }))
    
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }
  
  // Validate personal information form
  const validatePersonalInfo = () => {
    const errors: Record<string, string> = {}
    
    if (!personalInfo.firstName.trim()) {
      errors.firstName = "First name is required"
    }
    
    if (!personalInfo.lastName.trim()) {
      errors.lastName = "Last name is required"
    }
    
    if (!personalInfo.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      errors.email = "Email is invalid"
    }
    
    if (!personalInfo.phone.trim()) {
      errors.phone = "Phone number is required"
    }
    
    if (!personalInfo.password) {
      errors.password = "Password is required"
    } else if (personalInfo.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }
    
    if (personalInfo.password !== personalInfo.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }
    
    setPersonalInfoErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Validate professional information form
  const validateProfessionalInfo = () => {
    const errors: Record<string, string> = {}
    
    if (!professionalInfo.specialty.trim()) {
      errors.specialty = "Specialty is required"
    }
    
    if (!professionalInfo.licenseNumber.trim()) {
      errors.licenseNumber = "License number is required"
    }
    
    if (!professionalInfo.licenseState.trim()) {
      errors.licenseState = "License state is required"
    }
    
    if (!professionalInfo.yearsOfExperience.trim()) {
      errors.yearsOfExperience = "Years of experience is required"
    }
    
    if (!professionalInfo.education.trim()) {
      errors.education = "Education information is required"
    }
    
    setProfessionalInfoErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Validate practice information form
  const validatePracticeInfo = () => {
    const errors: Record<string, string> = {}
    
    if (!practiceInfo.practiceName.trim()) {
      errors.practiceName = "Practice name is required"
    }
    
    if (!practiceInfo.practiceAddress.trim()) {
      errors.practiceAddress = "Practice address is required"
    }
    
    if (!practiceInfo.practiceCity.trim()) {
      errors.practiceCity = "City is required"
    }
    
    if (!practiceInfo.practiceState.trim()) {
      errors.practiceState = "State is required"
    }
    
    if (!practiceInfo.practiceZip.trim()) {
      errors.practiceZip = "ZIP code is required"
    }
    
    if (!practiceInfo.practicePhone.trim()) {
      errors.practicePhone = "Practice phone is required"
    }
    
    setPracticeInfoErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Handle form submission for each step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep === 1) {
      if (validatePersonalInfo()) {
        onStepComplete(1, personalInfo)
      }
    } else if (currentStep === 2) {
      if (validateProfessionalInfo()) {
        onStepComplete(2, professionalInfo)
      }
    } else if (currentStep === 3) {
      if (validatePracticeInfo()) {
        onStepComplete(3, practiceInfo)
      }
    }
  }
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  // List of specialties
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "Geriatrics",
    "Gynecology",
    "Hematology",
    "Internal Medicine",
    "Nephrology",
    "Neurology",
    "Obstetrics",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Urology"
  ]
  
  // List of states
  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ]
  
  return (
    <div>
      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <motion.form 
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground mb-1">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                className={`w-full p-3 border ${personalInfoErrors.firstName ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {personalInfoErrors.firstName && (
                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.firstName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground mb-1">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className={`w-full p-3 border ${personalInfoErrors.lastName ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {personalInfoErrors.lastName && (
                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.lastName}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className={`w-full p-3 border ${personalInfoErrors.email ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {personalInfoErrors.email && (
                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className={`w-full p-3 border ${personalInfoErrors.phone ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {personalInfoErrors.phone && (
                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.phone}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={personalInfo.password}
                  onChange={handlePersonalInfoChange}
                  className={`w-full p-3 border ${personalInfoErrors.password ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {personalInfoErrors.password && (
                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                Confirm Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={personalInfo.confirmPassword}
                  onChange={handlePersonalInfoChange}
                  className={`w-full p-3 border ${personalInfoErrors.confirmPassword ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {personalInfoErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{personalInfoErrors.confirmPassword}</p>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-4 rounded-md text-sm text-blue-800 dark:text-blue-300">
            <p>
              Your information is secure and will only be used for verification purposes. We adhere to HIPAA compliance standards.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">
              Continue
            </Button>
          </div>
        </motion.form>
      )}
      
      {/* Step 2: Professional Information */}
      {currentStep === 2 && (
        <motion.form 
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-muted-foreground mb-1">
                Medical Specialty*
              </label>
              <select
                id="specialty"
                name="specialty"
                value={professionalInfo.specialty}
                onChange={handleProfessionalInfoChange}
                className={`w-full p-3 border ${professionalInfoErrors.specialty ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              {professionalInfoErrors.specialty && (
                <p className="mt-1 text-sm text-red-500">{professionalInfoErrors.specialty}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-muted-foreground mb-1">
                Medical License Number*
              </label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={professionalInfo.licenseNumber}
                onChange={handleProfessionalInfoChange}
                className={`w-full p-3 border ${professionalInfoErrors.licenseNumber ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {professionalInfoErrors.licenseNumber && (
                <p className="mt-1 text-sm text-red-500">{professionalInfoErrors.licenseNumber}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="licenseState" className="block text-sm font-medium text-muted-foreground mb-1">
                License State*
              </label>
              <select
                id="licenseState"
                name="licenseState"
                value={professionalInfo.licenseState}
                onChange={handleProfessionalInfoChange}
                className={`w-full p-3 border ${professionalInfoErrors.licenseState ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {professionalInfoErrors.licenseState && (
                <p className="mt-1 text-sm text-red-500">{professionalInfoErrors.licenseState}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-muted-foreground mb-1">
                Years of Experience*
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={professionalInfo.yearsOfExperience}
                onChange={handleProfessionalInfoChange}
                min="0"
                className={`w-full p-3 border ${professionalInfoErrors.yearsOfExperience ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {professionalInfoErrors.yearsOfExperience && (
                <p className="mt-1 text-sm text-red-500">{professionalInfoErrors.yearsOfExperience}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="education" className="block text-sm font-medium text-muted-foreground mb-1">
                Education & Training*
              </label>
              <textarea
                id="education"
                name="education"
                value={professionalInfo.education}
                onChange={handleProfessionalInfoChange}
                rows={3}
                placeholder="Medical school, residency, fellowships, etc."
                className={`w-full p-3 border ${professionalInfoErrors.education ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {professionalInfoErrors.education && (
                <p className="mt-1 text-sm text-red-500">{professionalInfoErrors.education}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="hospitalAffiliations" className="block text-sm font-medium text-muted-foreground mb-1">
                Hospital Affiliations
              </label>
              <textarea
                id="hospitalAffiliations"
                name="hospitalAffiliations"
                value={professionalInfo.hospitalAffiliations}
                onChange={handleProfessionalInfoChange}
                rows={3}
                placeholder="List hospitals where you have privileges"
                className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit">
              Continue
            </Button>
          </div>
        </motion.form>
      )}
      
      {/* Step 3: Practice Information */}
      {currentStep === 3 && (
        <motion.form 
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="practiceName" className="block text-sm font-medium text-muted-foreground mb-1">
                Practice Name*
              </label>
              <input
                type="text"
                id="practiceName"
                name="practiceName"
                value={practiceInfo.practiceName}
                onChange={handlePracticeInfoChange}
                className={`w-full p-3 border ${practiceInfoErrors.practiceName ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {practiceInfoErrors.practiceName && (
                <p className="mt-1 text-sm text-red-500">{practiceInfoErrors.practiceName}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="practiceAddress" className="block text-sm font-medium text-muted-foreground mb-1">
                Practice Address*
              </label>
              <input
                type="text"
                id="practiceAddress"
                name="practiceAddress"
                value={practiceInfo.practiceAddress}
                onChange={handlePracticeInfoChange}
                className={`w-full p-3 border ${practiceInfoErrors.practiceAddress ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {practiceInfoErrors.practiceAddress && (
                <p className="mt-1 text-sm text-red-500">{practiceInfoErrors.practiceAddress}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="practiceCity" className="block text-sm font-medium text-muted-foreground mb-1">
                City*
              </label>
              <input
                type="text"
                id="practiceCity"
                name="practiceCity"
                value={practiceInfo.practiceCity}
                onChange={handlePracticeInfoChange}
                className={`w-full p-3 border ${practiceInfoErrors.practiceCity ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {practiceInfoErrors.practiceCity && (
                <p className="mt-1 text-sm text-red-500">{practiceInfoErrors.practiceCity}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="practiceState" className="block text-sm font-medium text-muted-foreground mb-1">
                State*
              </label>
              <select
                id="practiceState"
                name="practiceState"
                value={practiceInfo.practiceState}
                onChange={handlePracticeInfoChange}
                className={`w-full p-3 border ${practiceInfoErrors.practiceState ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {practiceInfoErrors.practiceState && (
                <p className="mt-1 text-sm text-red-500">{practiceInfoErrors.practiceState}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="practiceZip" className="block text-sm font-medium text-muted-foreground mb-1">
                ZIP Code*
              </label>
              <input
                type="text"
                id="practiceZip"
                name="practiceZip"
                value={practiceInfo.practiceZip}
                onChange={handlePracticeInfoChange}
                className={`w-full p-3 border ${practiceInfoErrors.practiceZip ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {practiceInfoErrors.practiceZip && (
                <p className="mt-1 text-sm text-red-500">{practiceInfoErrors.practiceZip}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="practicePhone" className="block text-sm font-medium text-muted-foreground mb-1">
                Practice Phone*
              </label>
              <input
                type="tel"
                id="practicePhone"
                name="practicePhone"
                value={practiceInfo.practicePhone}
                onChange={handlePracticeInfoChange}
                className={`w-full p-3 border ${practiceInfoErrors.practicePhone ? 'border-red-500' : 'border-input'} rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`}
              />
              {practiceInfoErrors.practicePhone && (
                <p className="mt-1 text-sm text-red-500">{practiceInfoErrors.practicePhone}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptingNewPatients"
                  name="acceptingNewPatients"
                  checked={practiceInfo.acceptingNewPatients}
                  onChange={handlePracticeInfoChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="acceptingNewPatients" className="ml-2 block text-sm text-gray-900">
                  Currently accepting new patients
                </label>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Upload License & Credentials
              </label>
              <div className="border-2 border-dashed border-input rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="mb-2">Drag and drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, JPG, PNG (max 10MB)
                </p>
                <input 
                  type="file" 
                  id="license" 
                  className="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  multiple
                  onChange={handleFileUpload}
                />
                <label htmlFor="license">
                  <Button variant="outline" className="mx-auto">
                    Select Files
                  </Button>
                </label>
              </div>
            </div>
            
            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="md:col-span-2">
                <h4 className="font-medium mb-2">Uploaded Files</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-background border border-input p-3 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{file.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(file.size / 1024)} KB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-4 rounded-md text-sm text-blue-800 dark:text-blue-300">
            <p>
              By submitting this form, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>. Your credentials will be verified before your account is activated.
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit">
              Submit Application
            </Button>
          </div>
        </motion.form>
      )}
      
      {/* Step 4: Verification Complete */}
      {currentStep === 4 && (
        <motion.div 
          className="text-center space-y-6"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Application Submitted Successfully!</h3>
            <p className="text-muted-foreground">
              Thank you for applying to join MediConnect. Our team will review your credentials and contact you within 2-3 business days.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-4 rounded-md text-sm text-blue-800 dark:text-blue-300">
            <p>
              We've sent a confirmation email to <strong>{formData.personalInfo.email}</strong> with details about next steps.
            </p>
          </div>
          <Button className="mt-4" variant="blue" onClick={() => window.location.href = "/"}>
            Return to Homepage
          </Button>
        </motion.div>
      )}
    </div>
  )
}
