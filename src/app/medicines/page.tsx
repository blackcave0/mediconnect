"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Filter, Star, ShoppingCart, ChevronRight, Pill, Heart, Stethoscope } from "lucide-react";

// Sample data for medicines
const medicines = [{
  id: 1,
  name: "Vitamin D3 Supplements",
  category: "Vitamins & Supplements",
  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&h=300&auto=format&fit=crop",
  price: 24.99,
  rating: 4.8,
  reviews: 342,
  description: "High-potency vitamin D3 supplements to support bone health and immune function.",
  prescription: false,
  stock: "In Stock",
  dosage: "1000 IU",
  quantity: "60 capsules"
}, {
  id: 2,
  name: "Omega-3 Fish Oil",
  category: "Vitamins & Supplements",
  image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=300&h=300&auto=format&fit=crop",
  price: 19.95,
  rating: 4.7,
  reviews: 218,
  description: "Pure fish oil supplements rich in EPA and DHA to support heart and brain health.",
  prescription: false,
  stock: "In Stock",
  dosage: "1000mg",
  quantity: "90 softgels"
}, {
  id: 3,
  name: "Probiotics Complex",
  category: "Digestive Health",
  image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=300&h=300&auto=format&fit=crop",
  price: 29.99,
  rating: 4.5,
  reviews: 176,
  description: "Multi-strain probiotic formula to support digestive health and immune function.",
  prescription: false,
  stock: "In Stock",
  dosage: "50 billion CFU",
  quantity: "30 capsules"
}, {
  id: 4,
  name: "Immune Support",
  category: "Immune Health",
  image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&h=300&auto=format&fit=crop",
  price: 34.50,
  rating: 4.9,
  reviews: 289,
  description: "Comprehensive formula with vitamin C, zinc, elderberry, and echinacea.",
  prescription: false,
  stock: "In Stock",
  dosage: "As directed",
  quantity: "60 tablets"
}, {
  id: 5,
  name: "Lisinopril",
  category: "Prescription Medications",
  image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=300&h=300&auto=format&fit=crop",
  price: 12.99,
  rating: 4.6,
  reviews: 412,
  description: "ACE inhibitor used to treat high blood pressure and heart failure.",
  prescription: true,
  stock: "Prescription Required",
  dosage: "10mg",
  quantity: "30 tablets"
}, {
  id: 6,
  name: "Metformin",
  category: "Prescription Medications",
  image: "https://picsum.photos/200",
  price: 8.99,
  rating: 4.7,
  reviews: 356,
  description: "Oral diabetes medicine that helps control blood sugar levels.",
  prescription: true,
  stock: "Prescription Required",
  dosage: "500mg",
  quantity: "60 tablets"
}, {
  id: 7,
  name: "Pain Relief Gel",
  category: "Pain Management",
  image: "https://picsum.photos/200",
  price: 15.75,
  rating: 4.4,
  reviews: 189,
  description: "Fast-acting topical gel for muscle and joint pain relief.",
  prescription: false,
  stock: "In Stock",
  dosage: "External use",
  quantity: "100g tube"
}, {
  id: 8,
  name: "Allergy Relief",
  category: "Allergy & Sinus",
  image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=300&h=300&auto=format&fit=crop",
  price: 18.49,
  rating: 4.5,
  reviews: 231,
  description: "Non-drowsy formula for 24-hour relief from seasonal allergies.",
  prescription: false,
  stock: "In Stock",
  dosage: "10mg",
  quantity: "30 tablets"
}];

// Categories for filter
const categories = ["All Categories", "Vitamins & Supplements", "Prescription Medications", "Pain Management", "Digestive Health", "Immune Health", "Allergy & Sinus", "Heart Health", "Diabetes Care", "First Aid"];
export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter medicines based on search term, category and prescription status
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) || medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || medicine.category === selectedCategory;
    const matchesPrescription = !showPrescriptionOnly || medicine.prescription;
    return matchesSearch && matchesCategory && matchesPrescription;
  });
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Browse Our Medicine Catalog</h1>
            <p className="text-xl text-blue-100 mb-8">
              Find prescription medications, supplements, and healthcare products with doorstep delivery
            </p>
            
            {/* Search Bar */}
            <div className="relative flex items-center bg-white rounded-lg shadow-lg">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input type="text" placeholder="Search for medicines, supplements, or health products..." className="w-full pl-12 pr-4 py-4 rounded-lg text-foreground focus:outline-none" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <Button className="absolute right-2 bg-blue-600 hover:bg-blue-700" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {/* Filters */}
            {showFilters && <div className="mt-4 bg-white rounded-lg shadow-lg p-6 text-left text-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Category
                    </label>
                    <select className="w-full p-3 border border-input rounded-md bg-background" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                      {categories.map(category => <option key={category} value={category}>
                          {category}
                        </option>)}
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="prescription" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={showPrescriptionOnly} onChange={e => setShowPrescriptionOnly(e.target.checked)} />
                    <label htmlFor="prescription" className="ml-2 block text-sm text-gray-900">
                      Show prescription medications only
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => {
                setSelectedCategory("All Categories");
                setShowPrescriptionOnly(false);
              }}>
                    Reset Filters
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <button className={cn("p-4 rounded-xl border text-center hover:border-blue-600 transition", selectedCategory === "Vitamins & Supplements" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-border")} onClick={() => setSelectedCategory("Vitamins & Supplements")}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Capsule className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">Vitamins & Supplements</span>
            </button>
            
            <button className={cn("p-4 rounded-xl border text-center hover:border-blue-600 transition", selectedCategory === "Prescription Medications" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-border")} onClick={() => setSelectedCategory("Prescription Medications")}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Pill className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">Prescription Medications</span>
            </button>
            
            <button className={cn("p-4 rounded-xl border text-center hover:border-blue-600 transition", selectedCategory === "Pain Management" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-border")} onClick={() => setSelectedCategory("Pain Management")}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Tablets className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">Pain Management</span>
            </button>
            
            <button className={cn("p-4 rounded-xl border text-center hover:border-blue-600 transition", selectedCategory === "Heart Health" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-border")} onClick={() => setSelectedCategory("Heart Health")}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">Heart Health</span>
            </button>
            
            <button className={cn("p-4 rounded-xl border text-center hover:border-blue-600 transition", selectedCategory === "All Categories" ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-border")} onClick={() => setSelectedCategory("All Categories")}>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">All Categories</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredMedicines.length} {filteredMedicines.length === 1 ? 'Product' : 'Products'} Found
            </h2>
            <div className="flex items-center">
              <span className="mr-2 text-muted-foreground">Sort by:</span>
              <select className="p-2 border border-input rounded-md bg-background">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
          
          {/* Medicine Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMedicines.map(medicine => <div key={medicine.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative">
                  <div className="aspect-square">
                    <Image src={medicine.image} alt={medicine.name} fill className="object-cover" />
                  </div>
                  
                  {medicine.prescription && <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Prescription Required
                    </div>}
                </div>
                
                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{medicine.category}</div>
                  <h3 className="font-medium text-lg mb-1">{medicine.name}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{medicine.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{medicine.reviews} reviews</span>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-lg font-semibold">${medicine.price.toFixed(2)}</div>
                    <div className={cn("text-sm font-medium", medicine.prescription ? "text-blue-600" : "text-green-600")}>
                      {medicine.stock}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <Link href={`/medicines/${medicine.id}`} className="text-blue-600 font-medium hover:underline">
                      View Details
                    </Link>
                    
                    {!medicine.prescription ? <Button size="sm">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button> : <Link href="/prescriptions/upload">
                        <Button size="sm" variant="outline">
                          Upload Prescription
                        </Button>
                      </Link>}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="py-12 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Medication Information</h2>
            
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Prescription Medications</h3>
              <p className="text-muted-foreground mb-4">
                Prescription medications require a valid prescription from a licensed healthcare provider. 
                You can upload your prescription during checkout or have your doctor send it directly to us.
              </p>
              <Link href="/prescriptions/upload" className="text-blue-600 font-medium inline-flex items-center">
                Learn how to upload your prescription <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Medication Safety</h3>
              <p className="text-muted-foreground mb-4">
                All medications sold through MediConnect are sourced from licensed pharmacies and manufacturers. 
                We ensure proper storage, handling, and verification of all products.
              </p>
              <Link href="/medication-safety" className="text-blue-600 font-medium inline-flex items-center">
                Read our quality assurance policy <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
}
function Capsule(props: React.ComponentProps<typeof Pill>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19.2 5.4-3.6 3.6M15.6 9l-1.8 1.8M10.2 14.4l-5.4 5.4a2 2 0 1 0 2.8 2.8l5.4-5.4M17.4 3.6a2 2 0 1 1 2.8 2.8l-5.4 5.4a2 2 0 0 1-2.8 0L8.2 8a2 2 0 0 1 0-2.8l5.4-5.4a2 2 0 0 1 2.8 0z" />
    </svg>;
}
function Tablets(props: React.ComponentProps<typeof Pill>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5" />
      <circle cx="17" cy="17" r="5" />
      <path d="M12 17h10" />
      <path d="M3.46 10.54l7.08-7.08" />
    </svg>;
}