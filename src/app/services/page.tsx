'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Clock,
  Users,
  CheckCircle,
  DollarSign,
  Calendar,
  Star,
  MessageCircle,
  Download,
  Zap,
  Target,
  Award
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'commercial-ads',
    title: 'Commercial Advertisements',
    description: 'Professional 30-60 second commercial ads for television, web, and social media platforms. Perfect for product launches, brand awareness campaigns, and promotional content.',
    price: 1500,
    duration: '3-5 days',
    features: [
      'Professional script writing',
      'High-quality 4K footage',
      'Color grading and correction',
      'Background music and sound effects',
      'Multiple format delivery',
      '2 rounds of revisions'
    ],
    deliverables: '3x 30-second commercials, 6x social media cuts, behind-the-scenes footage',
    popular: true,
    icon: Play,
    color: 'text-blue-400'
  },
  {
    id: 'youtube-content',
    title: 'YouTube Content Creation',
    description: 'Complete YouTube video editing service including intros, outros, thumbnails, and optimization. Perfect for content creators, vloggers, and educational content.',
    price: 300,
    duration: '2-3 days',
    features: [
      'Full video editing',
      'Custom thumbnails',
      'Intro and outro',
      'SEO optimization',
      'Caption files',
      'Unlimited revisions'
    ],
    deliverables: 'Edited video, custom thumbnail, SEO metadata, caption files',
    popular: false,
    icon: Play,
    color: 'text-red-400'
  },
  {
    id: 'wedding-films',
    title: 'Wedding Films & Photography',
    description: 'Cinematic wedding films that capture the beauty and emotion of your special day. From ceremony to reception, we create timeless memories.',
    price: 2500,
    duration: '7-10 days',
    features: [
      'Cinematic highlight reel (3-5 mins)',
      'Full ceremony coverage',
      'Drone footage (if available)',
      'Professional color grading',
      'Original score composition',
      'USB delivery in custom box'
    ],
    deliverables: 'Highlight film, full documentary, raw footage, music license',
    popular: true,
    icon: Heart,
    color: 'text-pink-400'
  },
  {
    id: 'corporate-videos',
    title: 'Corporate Video Production',
    description: 'Professional corporate videos for training, marketing, internal communications, and brand storytelling. Engaging content that represents your company values.',
    price: 2000,
    duration: '5-7 days',
    features: [
      'Script development',
      'Professional filming',
      'Motion graphics',
      'Brand integration',
      'Multiple language subtitles',
      '3 rounds of revisions'
    ],
    deliverables: 'Final video, raw footage, project files, subtitles',
    popular: false,
    icon: Users,
    color: 'text-green-400'
  },
  {
    id: 'documentary-production',
    title: 'Documentary Film Production',
    description: 'Full-service documentary production from concept to completion. We help tell compelling stories that matter and create impactful visual narratives.',
    price: 3500,
    duration: '4-6 weeks',
    features: [
      'Research and pre-production',
      'Professional filming crew',
      'Interview coordination',
      'Archival footage sourcing',
      'Sound design and mixing',
      'Distribution assistance'
    ],
    deliverables: 'Full documentary, teaser trailer, festival version',
    popular: false,
    icon: Star,
    color: 'text-yellow-400'
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics & Animation',
    description: 'Custom motion graphics and animation for branding, explainer videos, and digital content. Bring your ideas to life with stunning visual effects.',
    price: 800,
    duration: '3-5 days',
    features: [
      '2D and 3D animation',
      'Logo animations',
      'Lower thirds and titles',
      'Visual effects',
      'Character animation',
      'Template customization'
    ],
    deliverables: 'Animated video, project files, assets',
    popular: false,
    icon: Zap,
    color: 'text-purple-400'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary-500/20 text-primary-400 border-primary-500/30">
                Professional Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Video Editing <span className="text-gradient">Services</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Comprehensive video editing services tailored to your specific needs and budget.
                From commercials to wedding films, I create stunning visual content that tells your story.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book a Consultation
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/projects">
                    <Play className="h-5 w-5 mr-2" />
                    View Portfolio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                What I Offer
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Professional video editing services with transparent pricing and exceptional quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="group cursor-pointer border-gray-800 hover:border-primary-500 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center ${service.color}`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      {service.popular && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-white group-hover:text-primary-400 transition-colors text-xl">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 line-clamp-3">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Deliverables:</h4>
                      <p className="text-gray-300 text-sm">{service.deliverables}</p>
                    </div>

                    {/* Specs */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${service.price}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Starting at <span className="text-white font-semibold">${service.price}</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/contact?service=${service.id}`}>
                          Get Quote
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Simple, transparent process from consultation to delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">1. Consultation</h3>
                <p className="text-gray-400 text-sm">
                  We discuss your vision, goals, and budget to create the perfect plan.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">2. Planning</h3>
                <p className="text-gray-400 text-sm">
                  Detailed project planning with timelines, milestones, and deliverables.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">3. Production</h3>
                <p className="text-gray-400 text-sm">
                  Professional editing, color grading, and post-production work.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">4. Delivery</h3>
                <p className="text-gray-400 text-sm">
                  Final delivery with all requested formats and revisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Client Testimonials
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                What clients say about working with me on their video projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-gray-800">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-gray-300 italic mb-4">
                    "Working with Mayank was an absolute game-changer for our campaign. His attention to detail and creative vision elevated our brand messaging to new heights."
                  </p>
                  <div>
                    <div className="text-white font-medium">Jessica Martinez</div>
                    <div className="text-gray-400 text-sm">Marketing Director, Nike</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-800">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-gray-300 italic mb-4">
                    "Mayank transformed our complex product into a compelling story that resonated with our target audience. The video quality was outstanding."
                  </p>
                  <div>
                    <div className="text-white font-medium">David Chen</div>
                    <div className="text-gray-400 text-sm">CEO, TechCorp Solutions</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-800">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-gray-300 italic mb-4">
                    "Mayank has been editing our travel vlogs for over a year. The quality consistently amazes our audience and engagement has never been higher."
                  </p>
                  <div>
                    <div className="text-white font-medium">Sarah Thompson</div>
                    <div className="text-gray-400 text-sm">Content Creator, Wanderlust Adventures</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with professional video editing.
              Schedule a consultation or request a quote today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/contact">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book a Call
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link href="/contact">
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}