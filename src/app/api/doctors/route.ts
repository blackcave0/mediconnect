import { NextResponse } from 'next/server';

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviews: 142,
    location: "Downtown Medical Center",
    distance: "1.2 miles away",
    availableDates: ["2025-04-14", "2025-04-15", "2025-04-16", "2025-04-17", "2025-04-18"],
    availableTimeSlots: [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
    ],
    appointmentTypes: ["In-person", "Video consultation"],
    insurances: ["Blue Cross", "Aetna", "Medicare"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
    rating: 4.8,
    reviews: 126,
    location: "Neurological Institute",
    distance: "2.5 miles away",
    availableDates: ["2025-04-13", "2025-04-14", "2025-04-17", "2025-04-18", "2025-04-19"],
    availableTimeSlots: [
      "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", 
      "01:00 PM", "01:30 PM", "02:00 PM", "04:30 PM", "05:00 PM"
    ],
    appointmentTypes: ["In-person", "Video consultation", "Home visit"],
    insurances: ["United Healthcare", "Cigna", "Medicare"]
  },
  {
    id: 3,
    name: "Dr. Jessica Williams",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop",
    rating: 4.9,
    reviews: 198,
    location: "Children's Medical Center",
    distance: "0.8 miles away",
    availableDates: ["2025-04-12", "2025-04-13", "2025-04-15", "2025-04-16", "2025-04-19"],
    availableTimeSlots: [
      "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
    ],
    appointmentTypes: ["In-person", "Video consultation", "Home visit"],
    insurances: ["Blue Cross", "Cigna", "Medicaid"]
  }
];

export async function GET() {
  return NextResponse.json(doctors);
}

export const dynamic = 'force-dynamic';
