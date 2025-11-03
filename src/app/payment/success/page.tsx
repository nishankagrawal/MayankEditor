'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Download, BookOpen, Users, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')

    if (sessionId) {
      // Verify the payment and get order details
      fetch('/api/stripe/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })
        .then(response => response.json())
        .then(data => {
          setOrderDetails(data)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Error verifying payment:', error)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Processing your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-gray-800">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  Payment Successful!
                </CardTitle>
                <CardDescription className="text-lg text-gray-400">
                  Thank you for your purchase. Your enrollment is confirmed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {orderDetails && (
                  <div className="bg-gray-800/50 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Order Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Order Number:</span>
                        <span className="text-white font-medium">{orderDetails.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Course:</span>
                        <span className="text-white font-medium">{orderDetails.courseTitle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Amount Paid:</span>
                        <span className="text-white font-medium">${orderDetails.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Method:</span>
                        <span className="text-white font-medium">Card ending in {orderDetails.cardLast4}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">What's Next?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-primary-400" />
                      <div>
                        <div className="text-white font-medium">Start Learning</div>
                        <div className="text-gray-400 text-sm">Access your course dashboard and begin your journey</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Download className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Download Resources</div>
                        <div className="text-gray-400 text-sm">Get project files and course materials</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-white font-medium">Join Community</div>
                        <div className="text-gray-400 text-sm">Connect with fellow students and instructors</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button size="lg" className="flex-1" asChild>
                    <Link href="/dashboard/courses">
                      Go to My Courses
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/courses">
                      Browse More Courses
                    </Link>
                  </Button>
                </div>

                <div className="text-center pt-6 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-4">
                    A confirmation email has been sent to your registered email address.
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 text-sm">
                      Need help? <Link href="/contact" className="text-primary-400 hover:text-primary-300">Contact Support</Link>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}