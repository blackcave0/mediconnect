import { NextResponse } from 'next/server';

// Sample data for medicines
const medicines = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const medicine = medicines.find(med => med.id === id);
  
  if (!medicine) {
    return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
  }
  
  return NextResponse.json(medicine);
}

export const dynamic = 'force-dynamic';
