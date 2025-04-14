import { NextResponse } from 'next/server';

// Sample data for appointments
const appointments = [
  {
    id: 1,
    doctorId: 1,
    patientId: 1,
    date: "2025-04-20",
    time: "10:00 AM",
    type: "in-person",
    status: "confirmed",
    notes: "Annual checkup"
  },
  {
    id: 2,
    doctorId: 3,
    patientId: 1,
    date: "2025-05-05",
    time: "2:30 PM",
    type: "video",
    status: "confirmed",
    notes: "Follow-up appointment"
  },
  {
    id: 3,
    doctorId: 2,
    patientId: 1,
    date: "2025-03-15",
    time: "9:00 AM",
    type: "in-person",
    status: "completed",
    notes: "Neurological evaluation"
  }
];

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, validate the appointment data and save to database
    const newAppointment = {
      id: appointments.length + 1,
      ...body,
      status: "confirmed"
    };
    
    // For demo purposes, we'll just return the new appointment
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 400 }
    );
  }
}

export const dynamic = 'force-dynamic';
