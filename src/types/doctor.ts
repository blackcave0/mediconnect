export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  availableDates: string[];
  availableTimeSlots: string[];
  appointmentTypes: string[];
  insurances: string[];
}
