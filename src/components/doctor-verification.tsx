"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Check, Eye, FileText, Upload } from "lucide-react"

// This component is used in the doctor registration process to verify medical licenses
export function DoctorVerification() {
  const [step, setStep] = useState(1)
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: number}[]>([])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: file.size,
    }))
    
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }
  
  const handleVerify = () => {
    setIsVerifying(true)
    // Simulate verification process
    setTimeout(() => {
      setIsVerified(true)
      setIsVerifying(false)
      setStep(3)
    }, 3000)
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto border border-border rounded-lg p-6">
      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step > i ? "bg-green-100 text-green-600" :
              step === i ? "bg-blue-600 text-white" :
              "bg-gray-100 text-gray-400"
            }`}>
              {step > i ? <Check className="h-5 w-5" /> : i}
            </div>
            <span className="text-sm mt-2 text-muted-foreground">
              {i === 1 ? "Upload" : i === 2 ? "Verify" : "Complete"}
            </span>
          </div>
        ))}
        
        {/* Connecting lines */}
        <div className="absolute left-0 right-0 flex justify-center">
          <div className="w-2/3 flex">
            <div className={`h-0.5 flex-1 ${step > 1 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div className={`h-0.5 flex-1 ${step > 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          </div>
        </div>
      </div>
      
      {/* Step 1: License Upload */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Upload Your Medical License</h3>
            <p className="text-muted-foreground">
              Please upload your medical license and credentials for verification
            </p>
          </div>
          
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
          
          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
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
          
          <div className="flex justify-end">
            <Button
              disabled={uploadedFiles.length === 0}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      
      {/* Step 2: Verification */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Verify Your Credentials</h3>
            <p className="text-muted-foreground">
              Please review your information before submitting for verification
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-background border border-input p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">License Type</p>
                  <p className="font-medium">Medical Doctor (MD)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License Number</p>
                  <p className="font-medium">MD-12345678</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Issuing Authority</p>
                  <p className="font-medium">State Medical Board</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiration Date</p>
                  <p className="font-medium">01/15/2026</p>
                </div>
              </div>
            </div>
            
            <div className="bg-background border border-input p-4 rounded-md">
              <h4 className="font-medium mb-2">Uploaded Documents</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-2" />
                      <span>{file.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-4 rounded-md text-sm text-blue-800 dark:text-blue-300">
              <p>
                By submitting these documents, you authorize MediConnect to verify your medical credentials with the relevant licensing authorities. This process typically takes 1-3 business days.
              </p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button 
              onClick={handleVerify} 
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Verifying...
                </>
              ) : "Submit for Verification"}
            </Button>
          </div>
        </div>
      )}
      
      {/* Step 3: Complete */}
      {step === 3 && (
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Verification Successful!</h3>
            <p className="text-muted-foreground">
              Your medical credentials have been verified. You can now set up your doctor profile and start using the platform.
            </p>
          </div>
          <Button className="mt-4" variant="blue">
            Continue to Profile Setup
          </Button>
        </div>
      )}
    </div>
  )
}
