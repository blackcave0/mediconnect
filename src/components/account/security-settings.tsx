"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Smartphone, Key } from "lucide-react"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Security Settings</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-8">
          {/* Change Password */}
          <div>
            <div className="flex items-center mb-4">
              <Key className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium">Change Password</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button>
                  Update Password
                </Button>
              </div>
            </div>
          </div>
          
          {/* Two-Factor Authentication */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center mb-4">
              <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
              </div>
              <div className="flex items-center">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            {twoFactorEnabled && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Two-factor authentication is enabled. You will receive a verification code via SMS when signing in from a new device.
                </p>
              </div>
            )}
          </div>
          
          {/* Login Sessions */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center mb-4">
              <Shield className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium">Active Sessions</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Chrome on Windows • New York, USA
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Started: April 12, 2025 at 10:23 AM
                    </p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    Active Now
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Safari on iPhone</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      New York, USA
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last active: April 10, 2025 at 3:45 PM
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20">
                    Sign Out
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-background border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Firefox on MacBook</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Boston, USA
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last active: April 8, 2025 at 9:12 AM
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20">
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20">
                Sign Out All Other Sessions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
