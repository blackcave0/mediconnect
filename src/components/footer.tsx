import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold">MediConnect</h2>
            </Link>
            <p className="mb-6 text-primary-foreground/80 max-w-md">
              Connecting patients with quality healthcare services, licensed doctors,
              and affordable medicines in one seamless platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Find Doctors', href: '/doctors' },
                { label: 'Browse Medicines', href: '/medicines' },
                { label: 'Book Appointment', href: '/appointments' },
                { label: 'Health Records', href: '/records' },
                { label: 'Emergency Services', href: '/emergency' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">For Doctors</h3>
            <ul className="space-y-3">
              {[
                { label: 'Join Network', href: '/doctor-signup' },
                { label: 'Doctor Dashboard', href: '/doctor-portal' },
                { label: 'Resources', href: '/doctor-resources' },
                { label: 'Telemedicine', href: '/telemedicine' },
                { label: 'License Verification', href: '/verification' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  123 Healthcare Plaza, Medical District, City, State 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0" />
                <a 
                  href="tel:+1-888-123-4567" 
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  1-888-123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0" />
                <a 
                  href="mailto:contact@mediconnect.com" 
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  contact@mediconnect.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/60 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MediConnect. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/60">
            <Link href="/privacy" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground">
              Terms of Service
            </Link>
            <Link href="/hipaa" className="hover:text-primary-foreground">
              HIPAA Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
