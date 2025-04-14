"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Award, 
  Filter, 
  ChevronDown, 
  Calendar, 
  CheckCircle2
} from "lucide-react"

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviews: 142,
    education: "Harvard Medical School",
    experience: "15+ years",
    location: "Downtown Medical Center",
    distance: "1.2 miles away",
    availability: "Available today",
    insurances: ["Blue Cross", "Aetna", "Medicare"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    rating: 4.8,
    reviews: 126,
    education: "Johns Hopkins School of Medicine",
    experience: "12+ years",
    location: "Neurological Institute",
    distance: "2.5 miles away",
    availability: "Next available: Tomorrow",
    insurances: ["United Healthcare", "Cigna", "Medicare"]
  },
  {
    id: 3,
    name: "Dr. Jessica Williams",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviews: 198,
    education: "Stanford University School of Medicine",
    experience: "10+ years",
    location: "Children's Medical Center",
    distance: "0.8 miles away",
    availability: "Available today",
    insurances: ["Blue Cross", "Cigna", "Medicaid"]
  },
  {
    id: 4,
    name: "Dr. Robert Garcia",
    specialty: "Dermatology",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
    rating: 4.7,
    reviews: 89,
    education: "Yale School of Medicine",
    experience: "8+ years",
    location: "Skin & Wellness Center",
    distance: "3.1 miles away",
    availability: "Next available: Friday",
    insurances: ["Aetna", "United Healthcare", "Kaiser"]
  },
  {
    id: 5,
    name: "Dr. Emily Patel",
    specialty: "Orthopedics",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=300&auto=format&fit=crop",
    rating: 4.8,
    reviews: 156,
    education: "University of Pennsylvania",
    experience: "14+ years",
    location: "Orthopedic Specialists",
    distance: "1.7 miles away",
    availability: "Available today",
    insurances: ["Blue Cross", "Medicare", "Cigna"]
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Psychiatry",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviews: 112,
    education: "Columbia University",
    experience: "11+ years",
    location: "Mental Health Institute",
    distance: "2.3 miles away",
    availability: "Next available: Thursday",
    insurances: ["Aetna", "Blue Cross", "Optum"]
  }
];

// Specialties for filter
const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
  "Psychiatry",
  "Gynecology",
  "Oncology",
  "Ophthalmology",
  "Urology"
];

// Insurance providers for filter
const insuranceProviders = [
  "All Insurance",
  "Blue Cross",
  "Aetna",
  "Cigna",
  "United Healthcare",
  "Medicare",
  "Medicaid",
  "Kaiser",
  "Optum",
  "Humana"
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedInsurance, setSelectedInsurance] = useState("All Insurance")
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter doctors based on search term, specialty and insurance
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                            doctor.specialty === selectedSpecialty;
    
    const matchesInsurance = selectedInsurance === "All Insurance" || 
                            doctor.insurances.includes(selectedInsurance);
    
    return matchesSearch && matchesSpecialty && matchesInsurance;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find the Right Doctor for You</h1>
            <p className="text-xl text-blue-100 mb-8">
              Search our network of verified specialists and book appointments with confidence
            </p>
            
            {/* Search Bar */}
            <div className="relative flex items-center bg-white rounded-lg shadow-lg">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or condition..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-foreground focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                className="absolute right-2 bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-6 text-left text-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Specialty
                    </label>
                    <select
                      className="w-full p-3 border border-input rounded-md bg-background"
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Insurance
                    </label>
                    <select
                      className="w-full p-3 border border-input rounded-md bg-background"
                      value={selectedInsurance}
                      onChange={(e) => setSelectedInsurance(e.target.value)}
                    >
                      {insuranceProviders.map((insurance) => (
                        <option key={insurance} value={insurance}>
                          {insurance}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => {
                    setSelectedSpecialty("All Specialties");
                    setSelectedInsurance("All Insurance");
                  }}>
                    Reset Filters
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
            </h2>
            <div className="flex items-center">
              <span className="mr-2 text-muted-foreground">Sort by:</span>
              <select className="p-2 border border-input rounded-md bg-background">
                <option>Recommended</option>
                <option>Highest Rated</option>
                <option>Nearest</option>
                <option>Earliest Available</option>
              </select>
            </div>
          </div>
          
          {/* Doctor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <div 
                key={doctor.id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 relative">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {doctor.specialty}
                  </div>
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                        </div>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{doctor.reviews} reviews</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {doctor.availability}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{doctor.education}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{doctor.location} • {doctor.distance}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-muted-foreground mb-1">Accepts:</div>
                    <div className="flex flex-wrap gap-2">
                      {doctor.insurances.map((insurance) => (
                        <span 
                          key={insurance}
                          className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full"
                        >
                          {insurance}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <Link href={`/doctors/${doctor.id}`} className="text-blue-600 font-medium hover:underline">
                      View Profile
                    </Link>
                    <Link href={`/appointments?doctor=${doctor.id}`}>
                      <Button>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MediConnect Doctors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our network includes only verified healthcare professionals who meet our strict quality standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Credentials</h3>
              <p className="text-muted-foreground">
                All doctors undergo rigorous license verification and credential checks before joining our platform.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Patient-Reviewed</h3>
              <p className="text-muted-foreground">
                Read authentic reviews from verified patients to help you make informed decisions about your care.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-muted-foreground">
                Book appointments instantly with real-time availability and receive confirmation immediately.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
