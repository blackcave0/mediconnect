"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  FileText, 
  FilePlus2, 
  Calendar, 
  Pill, 
  Activity, 
  ChevronRight,
  ChevronDown,
  Download,
  Share2,
  Lock,
  Eye,
  Search
} from "lucide-react"

// Sample data for medical records
const medicalRecords = [
  {
    id: 1,
    type: "Doctor Visit",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "April 5, 2025",
    summary: "Annual checkup with cardiologist. Blood pressure: 120/80. Heart rate: 72 bpm. EKG results normal.",
    documents: ["Visit Summary", "EKG Results"],
    facility: "Downtown Medical Center"
  },
  {
    id: 2,
    type: "Lab Results",
    doctor: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    date: "March 22, 2025",
    summary: "Complete blood count and metabolic panel. All results within normal range.",
    documents: ["CBC Results", "Metabolic Panel"],
    facility: "LabCorp"
  },
  {
    id: 3,
    type: "Imaging",
    doctor: "Dr. Jessica Williams",
    specialty: "Radiology",
    date: "February 18, 2025",
    summary: "Chest X-ray performed. No abnormalities detected.",
    documents: ["X-ray Report", "X-ray Images"],
    facility: "Imaging Center"
  },
  {
    id: 4,
    type: "Vaccination",
    doctor: "Dr. Robert Garcia",
    specialty: "Family Medicine",
    date: "January 10, 2025",
    summary: "Annual flu vaccination administered. No adverse reactions.",
    documents: ["Vaccination Record"],
    facility: "Community Health Clinic"
  }
];

// Sample data for prescriptions
const prescriptions = [
  {
    id: 1,
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Sarah Johnson",
    dateIssued: "April 5, 2025",
    refills: 3,
    status: "Active",
    instructions: "Take in the morning with food."
  },
  {
    id: 2,
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Sarah Johnson",
    dateIssued: "April 5, 2025",
    refills: 3,
    status: "Active",
    instructions: "Take in the evening."
  },
  {
    id: 3,
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedBy: "Dr. Michael Chen",
    dateIssued: "March 22, 2025",
    refills: 2,
    status: "Active",
    instructions: "Take with meals."
  },
  {
    id: 4,
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    prescribedBy: "Dr. Robert Garcia",
    dateIssued: "February 5, 2025",
    refills: 0,
    status: "Completed",
    instructions: "Take until completed. Do not stop early."
  }
];

// Sample data for appointments
const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "April 20, 2025",
    time: "10:00 AM",
    type: "In-person",
    location: "Downtown Medical Center",
    status: "Upcoming"
  },
  {
    id: 2,
    doctor: "Dr. Jessica Williams",
    specialty: "Pediatrics",
    date: "May 5, 2025",
    time: "2:30 PM",
    type: "Video Consultation",
    location: "Online",
    status: "Upcoming"
  },
  {
    id: 3,
    doctor: "Dr. Michael Chen",
    specialty: "Neurology",
    date: "March 15, 2025",
    time: "9:00 AM",
    type: "In-person",
    location: "Neurological Institute",
    status: "Completed"
  },
  {
    id: 4,
    doctor: "Dr. Robert Garcia",
    specialty: "Family Medicine",
    date: "February 28, 2025",
    time: "11:30 AM",
    type: "In-person",
    location: "Community Health Clinic",
    status: "Completed"
  }
];

// Tabs for the records page
const tabs = [
  { id: "all", label: "All Records", icon: <FileText className="h-5 w-5" /> },
  { id: "visits", label: "Doctor Visits", icon: <Calendar className="h-5 w-5" /> },
  { id: "prescriptions", label: "Prescriptions", icon: <Pill className="h-5 w-5" /> },
  { id: "vitals", label: "Vitals & Metrics", icon: <Activity className="h-5 w-5" /> }
];

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Toggle record expansion
  const toggleRecord = (id: number) => {
    if (expandedRecord === id) {
      setExpandedRecord(null);
    } else {
      setExpandedRecord(id);
    }
  };
  
  // Filter records based on search term
  const filteredRecords = medicalRecords.filter(record => 
    record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredAppointments = appointments.filter(appointment => 
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Your Health Records</h1>
            <p className="text-xl text-blue-100 mb-8">
              Access and manage your medical history, prescriptions, and appointments
            </p>
            
            {/* Search Bar */}
            <div className="relative flex items-center bg-white rounded-lg shadow-lg">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your records..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-foreground focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Records Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex overflow-x-auto mb-8 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={cn(
                    "flex items-center px-4 py-2 mr-2 rounded-lg whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
              
              <Link href="/records/upload" className="flex items-center px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground whitespace-nowrap">
                <FilePlus2 className="h-5 w-5" />
                <span className="ml-2">Upload Records</span>
              </Link>
            </div>
            
            {/* Records Content */}
            <div className="space-y-8">
              {/* Medical Records */}
              {(activeTab === "all" || activeTab === "visits") && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
                  
                  {filteredRecords.length > 0 ? (
                    <div className="space-y-4">
                      {filteredRecords.map((record) => (
                        <div 
                          key={record.id}
                          className="bg-card border border-border rounded-xl overflow-hidden"
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
                                <h3 className="font-medium">{record.type}</h3>
                                <p className="text-sm text-muted-foreground">{record.date} • {record.doctor}</p>
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
                                <h4 className="font-medium mb-2">Summary</h4>
                                <p className="text-muted-foreground">{record.summary}</p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Doctor</h4>
                                  <p>{record.doctor}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Specialty</h4>
                                  <p>{record.specialty}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Facility</h4>
                                  <p>{record.facility}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                                  <p>{record.date}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Documents</h4>
                                <div className="space-y-2">
                                  {record.documents.map((doc, index) => (
                                    <div 
                                      key={index}
                                      className="flex items-center justify-between bg-background border border-input p-3 rounded-md"
                                    >
                                      <div className="flex items-center">
                                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                                        <span>{doc}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Button variant="ghost" size="sm" className="text-blue-600">
                                          <Eye className="h-4 w-4 mr-1" /> View
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-blue-600">
                                          <Download className="h-4 w-4 mr-1" /> Download
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-card border border-border rounded-xl">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No records found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? "Try a different search term" : "You don't have any medical records yet"}
                      </p>
                      <Link href="/records/upload">
                        <Button>
                          <FilePlus2 className="mr-2 h-4 w-4" />
                          Upload Records
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Prescriptions */}
              {(activeTab === "all" || activeTab === "prescriptions") && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>
                  
                  {filteredPrescriptions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-primary/5">
                            <th className="text-left p-4 font-medium">Medication</th>
                            <th className="text-left p-4 font-medium">Dosage</th>
                            <th className="text-left p-4 font-medium">Prescribed By</th>
                            <th className="text-left p-4 font-medium">Date</th>
                            <th className="text-left p-4 font-medium">Status</th>
                            <th className="text-left p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {filteredPrescriptions.map((prescription) => (
                            <tr key={prescription.id} className="bg-card">
                              <td className="p-4">
                                <div className="font-medium">{prescription.medication}</div>
                                <div className="text-sm text-muted-foreground">{prescription.frequency}</div>
                              </td>
                              <td className="p-4">{prescription.dosage}</td>
                              <td className="p-4">{prescription.prescribedBy}</td>
                              <td className="p-4">{prescription.dateIssued}</td>
                              <td className="p-4">
                                <span className={cn(
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                  prescription.status === "Active"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                )}>
                                  {prescription.status}
                                </span>
                              </td>
                              <td className="p-4">
                                {prescription.status === "Active" && (
                                  <Link href={`/medicines?prescription=${prescription.id}`}>
                                    <Button size="sm">Refill</Button>
                                  </Link>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-card border border-border rounded-xl">
                      <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No prescriptions found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? "Try a different search term" : "You don't have any active prescriptions"}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Appointments */}
              {(activeTab === "all") && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Appointments</h2>
                    <Link href="/appointments" className="text-blue-600 font-medium inline-flex items-center">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAppointments.slice(0, 2).map((appointment) => (
                        <div 
                          key={appointment.id}
                          className="bg-card border border-border rounded-xl p-4 flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.doctor}</h3>
                              <p className="text-sm text-muted-foreground">
                                {appointment.date} • {appointment.time} • {appointment.type}
                              </p>
                            </div>
                          </div>
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            appointment.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          )}>
                            {appointment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-card border border-border rounded-xl">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No appointments found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? "Try a different search term" : "You don't have any upcoming appointments"}
                      </p>
                      <Link href="/appointments">
                        <Button>
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Appointment
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Vitals & Metrics */}
              {(activeTab === "vitals") && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Vitals & Metrics</h2>
                  
                  <div className="text-center py-8 bg-card border border-border rounded-xl">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Track your health metrics</h3>
                    <p className="text-muted-foreground mb-4">
                      Monitor your blood pressure, weight, glucose levels, and more
                    </p>
                    <Button>
                      <FilePlus2 className="mr-2 h-4 w-4" />
                      Add New Measurement
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Privacy Section */}
      <section className="py-12 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Your Privacy is Our Priority</h2>
                <p className="text-muted-foreground mb-4">
                  MediConnect is HIPAA compliant and uses industry-leading encryption to protect your health information. 
                  You control who can access your records and for how long.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/privacy">
                    <Button variant="outline">
                      Privacy Policy
                    </Button>
                  </Link>
                  <Link href="/records/sharing">
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Manage Record Sharing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
