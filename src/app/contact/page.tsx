'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  ExternalLink,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@mayank.com',
      href: 'mailto:contact@mayank.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mumbai, India',
      href: '#'
    },
    {
      icon: Calendar,
      label: 'Available',
      value: 'Mon-Fri, 9AM-6PM IST',
      href: '#'
    }
  ]

  const services = [
    'Commercial Video Editing',
    'YouTube Content Creation',
    'Wedding Films',
    'Documentary Editing',
    'Corporate Videos',
    'Color Grading',
    'Motion Graphics',
    'Sound Design'
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary-500/20 text-primary-400 border-primary-500/30">
                Get In Touch
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Let's Create <span className="text-gradient">Something Amazing</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Have a project in mind or want to discuss how we can work together?
                I'd love to hear from you and explore how we can bring your vision to life.
              </p>
              <div className="flex items-center justify-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Quick Response</span>
                </div>
                <div className="text-gray-600">•</div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>5.0 Rating</span>
                </div>
                <div className="text-gray-600">•</div>
                <div>30+ Happy Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-gray-800 text-center">
                  <CardContent className="p-6">
                    <info.icon className="h-8 w-8 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">{info.label}</h3>
                    {info.href.startsWith('mailto:') || info.href.startsWith('tel:') ? (
                      <Link
                        href={info.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors"
                      >
                        {info.value}
                      </Link>
                    ) : (
                      <p className="text-gray-300">{info.value}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Send Me a Message</CardTitle>
                    <CardDescription className="text-gray-400">
                      Fill out the form below and I'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-gray-400">
                          Thank you for reaching out. I'll get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-gray-300">
                              Name *
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="mt-1"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-gray-300">
                              Email *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="mt-1"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="company" className="text-gray-300">
                              Company
                            </Label>
                            <Input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleChange}
                              className="mt-1"
                              placeholder="Your company (optional)"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-gray-300">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              className="mt-1"
                              placeholder="Your phone number (optional)"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="subject" className="text-gray-300">
                            Subject *
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="mt-1"
                            placeholder="What's this about?"
                          />
                        </div>

                        <div>
                          <Label htmlFor="message" className="text-gray-300">
                            Message *
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-1"
                            placeholder="Tell me about your project..."
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Services Card */}
                <Card className="border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {services.map((service, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Calendly Card */}
                <Card className="border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Book a Call</CardTitle>
                    <CardDescription className="text-gray-400">
                      Schedule a free 30-minute consultation to discuss your project.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="lg" className="w-full" asChild>
                      <Link href="#" className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Meeting</span>
                      </Link>
                    </Button>
                    <p className="text-gray-400 text-sm mt-3 text-center">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Usually available within 24 hours
                    </p>
                  </CardContent>
                </Card>

                {/* Response Time Card */}
                <Card className="border-gray-800 bg-gradient-to-br from-primary-500/10 to-primary-600/5">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <MessageCircle className="h-6 w-6 text-primary-400" />
                      <h3 className="text-white font-semibold">Quick Response</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      I typically respond to all inquiries within 24 hours. For urgent projects,
                      please call me directly.
                    </p>
                    <div className="flex items-center space-x-2 text-primary-400 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Average response time: 2-4 hours</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Common questions about working together. Don't see yours? Feel free to ask!
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: 'What is your typical turnaround time?',
                  answer: 'Turnaround time varies depending on project complexity. A simple YouTube video might take 2-3 days, while a commercial could take 1-2 weeks. We\'ll discuss timelines during our initial consultation.'
                },
                {
                  question: 'What information do you need to get started?',
                  answer: 'I typically need your raw footage, project brief or creative brief, any specific requirements (brand guidelines, music preferences, etc.), and your target timeline. The more information you provide, the better the result!'
                },
                {
                  question: 'Do you offer revisions?',
                  answer: 'Yes! I include 2-3 rounds of revisions depending on the project scope. This ensures we can fine-tune the edit until you\'re completely satisfied with the final result.'
                },
                {
                  question: 'What formats do you deliver in?',
                  answer: 'I can deliver in any format you need. Common formats include MP4 (H.264), MOV, ProRes for professional editing, and platform-specific formats for YouTube, Instagram, TikTok, etc.'
                },
                {
                  question: 'How do you handle payment?',
                  answer: 'For smaller projects, I typically require 50% upfront and 50% upon completion. For larger projects, we can work on a milestone-based payment schedule. I accept bank transfers, PayPal, and other payment methods.'
                }
              ].map((faq, index) => (
                <Card key={index} className="border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-12">
                What Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Jessica Martinez',
                    role: 'Marketing Director',
                    company: 'Nike',
                    content: 'Mayank delivered exceptional work that exceeded our expectations. Professional, creative, and always on time.'
                  },
                  {
                    name: 'David Chen',
                    role: 'CEO',
                    company: 'TechCorp Solutions',
                    content: 'Working with Mayank was a game-changer for our brand. His attention to detail and creative vision are unmatched.'
                  },
                  {
                    name: 'Sarah Thompson',
                    role: 'Content Creator',
                    company: 'Wanderlust Adventures',
                    content: 'Mayank has been editing our content for over a year. The quality and consistency are always outstanding.'
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-300 italic mb-4">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}