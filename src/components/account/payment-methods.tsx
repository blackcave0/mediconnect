"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Trash2, CheckCircle } from "lucide-react"

export function PaymentMethods() {
  const [showAddCard, setShowAddCard] = useState(false)
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "09/26",
      name: "Sarah Thompson",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "5678",
      expiry: "12/25",
      name: "Sarah Thompson",
      isDefault: false
    }
  ])
  
  const handleSetDefault = (id: number) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })))
  }
  
  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id))
  }
  
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    setShowAddCard(false)
    // Mock adding a new card
    const newCard = {
      id: cards.length + 1,
      type: "Visa",
      last4: "1234",
      expiry: "10/27",
      name: "Sarah Thompson",
      isDefault: false
    }
    setCards([...cards, newCard])
  }
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold">Payment Methods</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Saved Cards */}
          <div>
            <h3 className="text-lg font-medium mb-4">Saved Payment Methods</h3>
            
            {cards.length > 0 ? (
              <div className="space-y-4">
                {cards.map((card) => (
                  <div 
                    key={card.id}
                    className="flex items-center justify-between p-4 bg-background border border-border rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center mr-4">
                        <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{card.type} •••• {card.last4}</p>
                          {card.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expires {card.expiry}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!card.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefault(card.id)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Set Default
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-background border border-border rounded-lg">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No payment methods</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't added any payment methods yet
                </p>
              </div>
            )}
            
            {!showAddCard ? (
              <div className="mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setShowAddCard(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            ) : (
              <div className="mt-6 p-6 bg-background border border-border rounded-lg">
                <h4 className="font-medium mb-4">Add New Card</h4>
                <form onSubmit={handleAddCard}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-muted-foreground mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-muted-foreground mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        placeholder="John Doe"
                        className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-muted-foreground mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-muted-foreground mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          placeholder="123"
                          className="w-full p-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center">
                      <input
                        type="checkbox"
                        id="defaultCard"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="defaultCard" className="ml-2 block text-sm text-gray-900">
                        Set as default payment method
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowAddCard(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      Add Card
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Billing History */}
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-medium mb-4">Billing History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Description</th>
                    <th className="text-left p-4 font-medium">Amount</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="p-4">Apr 10, 2025</td>
                    <td className="p-4">Appointment with Dr. Sarah Johnson</td>
                    <td className="p-4">$150.00</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Paid
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="p-4">Mar 22, 2025</td>
                    <td className="p-4">Prescription Refill - Lisinopril</td>
                    <td className="p-4">$25.99</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Paid
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="p-4">Mar 15, 2025</td>
                    <td className="p-4">Appointment with Dr. Michael Chen</td>
                    <td className="p-4">$200.00</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Paid
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="p-4">Feb 28, 2025</td>
                    <td className="p-4">Lab Tests - Complete Blood Count</td>
                    <td className="p-4">$75.50</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Paid
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
