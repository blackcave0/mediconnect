"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ChevronDown, Eye, Download, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function MedicalHistory() {
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null)
  const [showAddCondition, setShowAddCondition] = useState(false)
  
  // Sample medical history data
  const medicalRecords = [
    {
      id: 1,
      type: "Condition",
      name: "Hypertension",
      diagnosedDate: "2020-05-15",
      diagnosedBy: "Dr. Sarah Johnson",
      status: "Active",
      notes: "Controlled with medication. Regular monitoring required.",
      medications: ["Lisinopril 10mg daily"]
    },
    {
      id: 2,
      type: "Surgery",
      name: "Appendectomy",
      date: "2018-03-22",
      hospital: "Memorial Hospital",
      surgeon: "Dr. Robert Garcia",
      notes: "Laparoscopic procedure. No complications."
    },
    {
      id: 3,
      type: "Allergy",
      name: "Penicillin",
      severity: "Moderate",
      reaction: "Rash, hives",
      diagnosedDate: "2015-11-10",
      notes: "Avoid all penicillin-based antibiotics."
    }
  ]
  
  // Toggle record expansion
  const toggleRecord = (id: number) => {
    if (expandedRecord === id) {
      setExpandedRecord(null)
    } else {
      setExpandedRecord(id)
    }
  }
  
  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    setShowAddCondition(false)
    alert("Medical condition added successfully!")
  }
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Medical History</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Medical Conditions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Medical Conditions & History</h3>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setShowAddCondition(!showAddCondition)}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Condition
              </Button>
            </div>
            
            {showAddCondition && (
              <div className="mb-6 p-6 bg-background border border-border rounded-lg">
                <h4 className="font-medium mb-4">Add Medical Condition</h4>
                <form onSubmit={handleAddCondition}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="conditionType" className="block text-sm font-medium text-muted-foreground mb-1">
                        Type
                      </label>
                      <select
                        id="conditionType"
                        className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Condition">Medical Condition</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Allergy">Allergy</option>
                        <option value="Immunization">Immunization</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="conditionName" className="block text-sm font-medium text-muted-foreground mb-1">
                        Name/Description
                      </label>
                      <input
                        type="text"
                        id="conditionName"
                        className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="diagnosedDate" className="block text-sm font-medium text-muted-foreground mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        id="diagnosedDate"
                        className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="diagnosedBy" className="block text-sm font-medium text-muted-foreground mb-1">
                        Doctor/Hospital
                      </label>
                      <input
                        type="text"
                        id="diagnosedBy"
                        className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="notes" className="block text-sm font-medium text-muted-foreground mb-1">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowAddCondition(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <div 
                  key={record.id}
                  className="bg-background border border-border rounded-xl overflow-hidden"
                >
                  <div 
                    className="p-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleRecord(record.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{record.name}</h3>
                        <p className="text-sm text-muted-foreground">{record.type} • {record.diagnosedDate || record.date}</p>
                      </div>
                    </div>
                    <ChevronDown className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      expandedRecord === record.id ? "transform rotate-180" : ""
                    )} />
                  </div>
                  
                  {expandedRecord === record.id && (
                    <div className="p-4 pt-0 border-t border-border">
                      <div className="bg-primary/5 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {record.type === "Condition" && (
                            <>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Diagnosed Date</p>
                                <p>{record.diagnosedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Diagnosed By</p>
                                <p>{record.diagnosedBy}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <p>{record.status}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Medications</p>
                                <ul className="list-disc list-inside">
                                  {record.medications?.map((med, index) => (
                                    <li key={index}>{med}</li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}
                          
                          {record.type === "Surgery" && (
                            <>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Date</p>
                                <p>{record.date}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Hospital</p>
                                <p>{record.hospital}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Surgeon</p>
                                <p>{record.surgeon}</p>
                              </div>
                            </>
                          )}
                          
                          {record.type === "Allergy" && (
                            <>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Severity</p>
                                <p>{record.severity}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Reaction</p>
                                <p>{record.reaction}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Diagnosed Date</p>
                                <p>{record.diagnosedDate}</p>
                              </div>
                            </>
                          )}
                          
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-muted-foreground">Notes</p>
                            <p>{record.notes}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-1 h-4 w-4" />
                          Download Record
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Family Medical History */}
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-medium mb-4">Family Medical History</h3>
            
            <div className="p-4 bg-background border border-border rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Heart Disease</p>
                  <p className="text-sm text-muted-foreground">Father, Paternal Grandfather</p>
                </div>
                
                <div>
                  <p className="font-medium">Type 2 Diabetes</p>
                  <p className="text-sm text-muted-foreground">Maternal Grandmother</p>
                </div>
                
                <div>
                  <p className="font-medium">Breast Cancer</p>
                  <p className="text-sm text-muted-foreground">Maternal Aunt</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Family History
                </Button>
              </div>
            </div>
          </div>
          
          {/* Immunization Records */}
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-medium mb-4">Immunization Records</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="text-left p-4 font-medium">Vaccine</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Provider</th>
                    <th className="text-left p-4 font-medium">Next Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="p-4">Influenza (Flu)</td>
                    <td className="p-4">Oct 15, 2024</td>
                    <td className="p-4">Dr. Robert Garcia</td>
                    <td className="p-4">Oct 2025</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="p-4">COVID-19</td>
                    <td className="p-4">May 20, 2024</td>
                    <td className="p-4">Community Health Clinic</td>
                    <td className="p-4">As recommended</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="p-4">Tetanus, Diphtheria, Pertussis (Tdap)</td>
                    <td className="p-4">Jun 12, 2022</td>
                    <td className="p-4">Dr. Jessica Williams</td>
                    <td className="p-4">Jun 2032</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="p-4">Pneumococcal</td>
                    <td className="p-4">Mar 05, 2023</td>
                    <td className="p-4">Dr. Sarah Johnson</td>
                    <td className="p-4">As recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                <Plus className="mr-1 h-4 w-4" />
                Add Immunization
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
