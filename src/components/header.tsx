"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { UserCircle, Menu, X, ShoppingCart, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const menuItems = [
    { title: 'Find Doctors', href: '/doctors' },
    { title: 'Medicines', href: '/medicines' },
    { title: 'Appointments', href: '/appointments' },
    { title: 'Health Records', href: '/records' },
    { title: 'For Doctors', href: '/doctor-portal' },
  ]

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full transition-all duration-200',
      isScrolled ? 'bg-background/95 shadow-sm backdrop-blur' : 'bg-transparent'
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              MediConnect
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link 
              key={item.title} 
              href={item.href}
              className={cn(
                "font-medium transition",
                pathname === item.href 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <Link href="/cart" className="p-2 rounded-full hover:bg-accent transition relative">
            <ShoppingCart size={20} />
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/doctor-signup" 
              className="font-medium text-blue-600 hover:text-blue-700 transition"
            >
              For Doctors
            </Link>
            <Link 
              href="/account" 
              className="flex items-center gap-2 font-medium text-muted-foreground hover:text-foreground transition"
            >
              <UserCircle size={20} />
              <span>Account</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-full hover:bg-accent transition"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between h-16 border-b">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  MediConnect
                </span>
              </Link>
              <button
                className="p-2 rounded-full hover:bg-accent transition"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 pt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "text-lg font-medium py-2",
                    pathname === item.href ? "text-blue-600" : ""
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link
                href="/doctor-signup"
                className="text-lg font-medium py-2 text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                For Doctors
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-2 text-lg font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCircle size={20} />
                <span>Account</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
