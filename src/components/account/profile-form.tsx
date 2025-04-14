"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProfileFormProps {
  user: {
    name: string
    email: string
    phone: string
    address: string
    dateOfBirth: string
    gender: string
    bloodType: string
    emergencyContact: {
      name: string
      relationship: string
      phone: string
    }
    insurance: {
      provider: string
      policyNumber: string
      groupNumber: string
      expirationDate: string
    }
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    bloodType: user.bloodType,
    emergencyContactName: user.emergencyContact.name,
    emergencyContactRelationship: user.emergencyContact.relationship,
    emergencyContactPhone: user.emergencyContact.phone,
    insuranceProvider: user.insurance.provider,
    insurancePolicyNumber: user.insurance.policyNumber,
    insuranceGroupNumber: user.insurance.groupNumber,
    insuranceExpirationDate: user.insurance.expirationDate
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    alert("Profile updated successfully!")
  }
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Profile Information</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-muted-foreground mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-muted-foreground mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-muted-foreground mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-muted-foreground mb-1">
                  Blood Type
                </label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="emergencyContactName" className="block text-sm font-medium text-muted-foreground mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="emergencyContactRelationship" className="block text-sm font-medium text-muted-foreground mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  id="emergencyContactRelationship"
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-muted-foreground mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Insurance Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Insurance Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="insuranceProvider" className="block text-sm font-medium text-muted-foreground mb-1">
                  Insurance Provider
                </label>
                <input
                  type="text"
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label htmlFor="insurancePolicyNumber" className="block text-sm font-medium text-muted-foreground mb-1">
                  Policy Number
                </label>
                <input
                  type="text"
                  id="insurancePolicyNumber"
                  name="insurancePolicyNumber"
                  value={formData.insurancePolicyNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label htmlFor="insuranceGroupNumber" className="block text-sm font-medium text-muted-foreground mb-1">
                  Group Number
                </label>
                <input
                  type="text"
                  id="insuranceGroupNumber"
                  name="insuranceGroupNumber"
                  value={formData.insuranceGroupNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>
              
              <div>
                <label htmlFor="insuranceExpirationDate" className="block text-sm font-medium text-muted-foreground mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  id="insuranceExpirationDate"
                  name="insuranceExpirationDate"
                  value={formData.insuranceExpirationDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
