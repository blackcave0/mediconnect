"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface ProgressStepsProps {
  currentStep: number
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { num: 1, title: "Select Doctor" },
    { num: 2, title: "Choose Date" },
    { num: 3, title: "Select Time" },
    { num: 4, title: "Appointment Type" },
    { num: 5, title: "Confirm" }
  ];

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.num} className="flex flex-col items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              currentStep >= step.num 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-400"
            )}>
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
            <div className={`h-0.5 flex-1 ${currentStep > 4 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
