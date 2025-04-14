import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Calendar, Pill, Stethoscope, ShieldCheck, Zap, Clock, Heart, Award, Star, ArrowRight, ShoppingCart } from "lucide-react";

// Simulated data for the landing page
const specialties = ["Cardiology", "Neurology", "Pediatrics", "Dermatology", "Orthopedics", "Gynecology", "Oncology", "Psychiatry"];
const trendingMedicines = [{
  id: 1,
  name: "Vitamin D3 Supplements",
  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&h=300&auto=format&fit=crop",
  price: 24.99,
  rating: 4.8,
  reviews: 342
}, {
  id: 2,
  name: "Omega-3 Fish Oil",
  image: "https://picsum.photos/200",
  price: 19.95,
  rating: 4.7,
  reviews: 218
}, {
  id: 3,
  name: "Probiotics Complex",
  image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=300&h=300&auto=format&fit=crop",
  price: 29.99,
  rating: 4.5,
  reviews: 176
}, {
  id: 4,
  name: "Immune Support",
  image: "https://picsum.photos/200",
  price: 34.50,
  rating: 4.9,
  reviews: 289
}];
const featuredDoctors = [{
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
  rating: 4.9,
  reviews: 142,
  education: "Harvard Medical School",
  experience: "15+ years"
}, {
  id: 2,
  name: "Dr. Michael Chen",
  specialty: "Neurology",
  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
  rating: 4.8,
  reviews: 126,
  education: "Johns Hopkins School of Medicine",
  experience: "12+ years"
}, {
  id: 3,
  name: "Dr. Jessica Williams",
  specialty: "Pediatrics",
  image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop",
  rating: 4.9,
  reviews: 198,
  education: "Stanford University School of Medicine",
  experience: "10+ years"
}];
const testimonials = [{
  id: 1,
  name: "Rebecca Thompson",
  role: "Patient",
  quote: "MediConnect made it so easy to find specialists and book appointments. The medication delivery service is incredibly convenient and the AI recommendations have been spot-on!",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
}, {
  id: 2,
  name: "Dr. Andrew Roberts",
  role: "Cardiologist",
  quote: "The platform streamlines my practice operations. I can manage appointments, issue prescriptions, and review patient histories all in one secure place.",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
}, {
  id: 3,
  name: "Maria Garcia",
  role: "Patient",
  quote: "Being able to access my medical records and prescriptions digitally has changed how I manage my health. The emergency contact feature gave me peace of mind.",
  image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=200&auto=format&fit=crop"
}];
const partnerHospitals = [{
  name: "City General Hospital",
  logo: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=150&h=80&auto=format&fit=crop"
}, {
  name: "Memorial Health Center",
  logo: "https://picsum.photos/200"
}, {
  name: "University Medical",
  logo: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=150&h=80&auto=format&fit=crop"
}, {
  name: "St. Mary's Hospital",
  logo: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=150&h=80&auto=format&fit=crop"
}, {
  name: "Valley Care Network",
  logo: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=150&h=80&auto=format&fit=crop"
}];
export default function HomePage() {
  return <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop')] bg-cover opacity-10"></div>
        </div>
        <div className="container relative px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Your Health, Our Priority:
                <span className="block text-blue-600 dark:text-blue-400">
                  Experience Modern Healthcare
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Connect with certified doctors, schedule appointments, manage your health records, and order prescribed medications all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/appointments" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition">
                  Book Appointment
                  <Calendar className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/medicines" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 rounded-md shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition">
                  Find Medicines
                  <Pill className="ml-2 h-5 w-5" />
                </Link>
              </div>
              
              {/* Emergency Contact Button */}
              <div className="pt-4">
                <Link href="/emergency" className="inline-flex items-center text-red-600 dark:text-red-400 font-medium">
                  <Zap className="mr-2 h-5 w-5" />
                  Emergency Contact
                </Link>
              </div>
            </div>
            
            <div className="relative rounded-2xl shadow-xl overflow-hidden border border-border">
              <Image src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=600&h=500&auto=format&fit=crop" alt="Doctor with patient" width={600} height={500} className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-border max-w-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />)}
                      </div>
                      <span className="text-sm font-medium">4.9/5 from 2,000+ patients</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Trusted by patients and doctors nationwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Specialty Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Care by Specialty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our network of specialists and book an appointment with the right doctor for your needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder="Search for doctors, specialties, or conditions..." className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition" />
            </div>
          </div>

          {/* Specialty Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {specialties.map((specialty, index) => <Link key={index} href={`/doctors?specialty=${encodeURIComponent(specialty)}`} className="group p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition flex items-center justify-between">
                <span className="font-medium">{specialty}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
              </Link>)}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Healthcare Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              MediConnect offers a comprehensive range of services to meet all your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Appointments</h3>
              <p className="text-muted-foreground mb-4">
                Book appointments with AI-powered matching to find the perfect specialist for your needs.
              </p>
              <Link href="/appointments" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                Book Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medicine Marketplace</h3>
              <p className="text-muted-foreground mb-4">
                Browse and purchase prescribed medications with doorstep delivery and refill reminders.
              </p>
              <Link href="/medicines" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                Shop Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Doctors</h3>
              <p className="text-muted-foreground mb-4">
                All healthcare providers undergo rigorous license verification and credential checks.
              </p>
              <Link href="/doctors" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                Find Doctors <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Service 4 */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Health Records</h3>
              <p className="text-muted-foreground mb-4">
                Access and manage your medical history, prescriptions, and test results securely.
              </p>
              <Link href="/records" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
                View Records <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Medicines Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Medicines</h2>
              <p className="text-muted-foreground">Popular health products with verified quality</p>
            </div>
            <Link href="/medicines" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingMedicines.map(medicine => (
              <div key={medicine.id} className="group bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
                <div className="relative h-40 w-full">
                  <Image 
                    src={medicine.image} 
                    alt={medicine.name} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-sm">
                    <Heart className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
                
                <div className="p-3 flex flex-col flex-grow">
                  <div className="flex items-center mb-1">
                    <div className="flex">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <span className="ml-1 text-xs font-medium">{medicine.rating}</span>
                    <span className="mx-1 text-muted-foreground text-xs">•</span>
                    <span className="text-xs text-muted-foreground">{medicine.reviews}</span>
                  </div>
                  
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-1">
                    {medicine.name}
                  </h3>
                  
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <div className="text-base font-semibold">${medicine.price.toFixed(2)}</div>
                    <Link href={`/medicines/${medicine.id}`}>
                      <Button size="sm" variant="outline" className="h-8 px-2">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/medicines">
              <Button size="lg" variant="blue">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctor Highlights Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Specialists</h2>
              <p className="text-muted-foreground">Top-rated doctors in our network</p>
            </div>
            <Link href="/doctors" className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDoctors.map(doctor => <Link href={`/doctors/${doctor.id}`} key={doctor.id} className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative h-56">
                  <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className={cn("h-4 w-4", i < Math.floor(doctor.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300")} />)}
                      </div>
                      <span className="ml-2 text-sm text-white font-medium">
                        {doctor.rating} ({doctor.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {doctor.name}
                  </h3>
                  <p className="text-muted-foreground">{doctor.specialty}</p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{doctor.education}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">{doctor.experience}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-medium text-blue-600 dark:text-blue-400">Book Appointment</span>
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-blue-800 transition">
                      <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition" />
                    </div>
                  </div>
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="bg-blue-600 dark:bg-blue-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex items-center">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-4">Are You a Healthcare Provider?</h2>
                  <p className="text-blue-100 mb-8 max-w-md">
                    Join our growing network of doctors and specialists. Manage appointments, issue e-prescriptions, and grow your practice with our platform.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 bg-white/20 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="ml-3 text-blue-50">Simple license verification process</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-white/20 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="ml-3 text-blue-50">Intuitive schedule management tools</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 bg-white/20 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="ml-3 text-blue-50">Secure patient communication system</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link href="/doctor-signup" className="inline-flex items-center justify-center px-6 py-3 font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 transition">
                      Register as a Doctor
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <Image src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" alt="Healthcare professional" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from patients and doctors who have experienced the benefits of MediConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => <div key={testimonial.id} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <Image src={testimonial.image} alt={testimonial.name} width={60} height={60} className="rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />)}
                  </div>
                </div>
                <p className="italic text-muted-foreground">{`"${testimonial.quote}"`}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Partner Hospitals */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Hospital Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with leading healthcare institutions to provide you with quality care
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {partnerHospitals.map((hospital, index) => <div key={index} className="grayscale hover:grayscale-0 transition duration-300">
                <Image src={hospital.logo} alt={hospital.name} width={150} height={80} className="object-contain h-16" />
              </div>)}
          </div>
        </div>
      </section>
    </div>;
}
function Check(props: React.ComponentProps<typeof Stethoscope>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>;
}
