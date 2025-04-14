"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    appointments: true,
    reminders: true,
    prescriptions: true,
    newsletters: false,
    promotions: false
  })
  
  const [pushNotifications, setPushNotifications] = useState({
    appointments: true,
    reminders: true,
    prescriptions: true,
    messages: true,
    updates: false
  })
  
  const [smsNotifications, setSmsNotifications] = useState({
    appointments: true,
    reminders: false,
    prescriptions: false,
    emergencies: true
  })
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setEmailNotifications(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handlePushChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setPushNotifications(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleSmsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setSmsNotifications(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    alert("Notification preferences updated successfully!")
  }
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Notification Settings</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-8">
          {/* Email Notifications */}
          <div>
            <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Appointment Confirmations</p>
                  <p className="text-sm text-muted-foreground">Receive email confirmations for scheduled appointments</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="appointments"
                    className="sr-only peer"
                    checked={emailNotifications.appointments}
                    onChange={handleEmailChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Appointment Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive reminders before your scheduled appointments</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="reminders"
                    className="sr-only peer"
                    checked={emailNotifications.reminders}
                    onChange={handleEmailChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Prescription Updates</p>
                  <p className="text-sm text-muted-foreground">Receive notifications about prescription refills and updates</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="prescriptions"
                    className="sr-only peer"
                    checked={emailNotifications.prescriptions}
                    onChange={handleEmailChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Newsletters</p>
                  <p className="text-sm text-muted-foreground">Receive health tips and updates from our newsletter</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="newsletters"
                    className="sr-only peer"
                    checked={emailNotifications.newsletters}
                    onChange={handleEmailChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Promotions and Offers</p>
                  <p className="text-sm text-muted-foreground">Receive special offers and promotions</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="promotions"
                    className="sr-only peer"
                    checked={emailNotifications.promotions}
                    onChange={handleEmailChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Push Notifications */}
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Appointment Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications for upcoming appointments</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="appointments"
                    className="sr-only peer"
                    checked={pushNotifications.appointments}
                    onChange={handlePushChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Medication Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive reminders to take your medications</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="reminders"
                    className="sr-only peer"
                    checked={pushNotifications.reminders}
                    onChange={handlePushChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Prescription Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts when prescriptions are ready or need refills</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="prescriptions"
                    className="sr-only peer"
                    checked={pushNotifications.prescriptions}
                    onChange={handlePushChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Doctor Messages</p>
                  <p className="text-sm text-muted-foreground">Receive notifications when doctors send you messages</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="messages"
                    className="sr-only peer"
                    checked={pushNotifications.messages}
                    onChange={handlePushChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* SMS Notifications */}
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Appointment Confirmations</p>
                  <p className="text-sm text-muted-foreground">Receive SMS confirmations for scheduled appointments</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="appointments"
                    className="sr-only peer"
                    checked={smsNotifications.appointments}
                    onChange={handleSmsChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Appointment Reminders</p>
                  <p className="text-sm text-muted-foreground">Receive SMS reminders before your scheduled appointments</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="reminders"
                    className="sr-only peer"
                    checked={smsNotifications.reminders}
                    onChange={handleSmsChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Prescription Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive SMS alerts for prescription refills and updates</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="prescriptions"
                    className="sr-only peer"
                    checked={smsNotifications.prescriptions}
                    onChange={handleSmsChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-md">
                <div>
                  <p className="font-medium">Emergency Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive SMS alerts for emergency situations</p>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="emergencies"
                    className="sr-only peer"
                    checked={smsNotifications.emergencies}
                    onChange={handleSmsChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button type="submit">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  )
}
