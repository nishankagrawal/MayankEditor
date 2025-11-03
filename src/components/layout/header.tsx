'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Play, Calendar, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { mainNav } from '@/config/site'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b border-gray-800 bg-dark-900/95 backdrop-blur supports-[backdrop-filter]:bg-dark-900/60',
      className
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary-500 flex items-center justify-center">
              <Play className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Mayank</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-400',
                  'text-gray-300'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Get Quote</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/contact" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Book Call</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col space-y-4 pb-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary-400',
                    'text-gray-300 py-2'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Get Quote
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    Book Call
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}