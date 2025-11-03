import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, ArrowRight, Star, Calendar, Mail, PlayCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=1080&fit=crop&crop=center"
                alt="Video editing background"
                className="w-full h-full object-cover opacity-30"
              />
            </div>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <Badge className="mb-6 bg-primary-500/20 text-primary-400 border-primary-500/30">
                Available for Projects
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Mayank —{' '}
                <span className="text-gradient">
                  Cinematic Video Editor
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Professional video editing services for brands, creators, and businesses.
                Transform your vision into stunning visual stories with cinematic excellence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <Button size="xl" asChild className="group">
                  <Link href="/projects" className="flex items-center space-x-2">
                    <PlayCircle className="h-5 w-5" />
                    <span>View My Work</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/contact" className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Book a Call</span>
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>5.0 Rating</span>
                </div>
                <div className="text-gray-600">•</div>
                <div>50+ Projects</div>
                <div className="text-gray-600">•</div>
                <div>8+ Years Experience</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Explore my latest work spanning commercial content, YouTube series,
                wedding films, and documentary projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Cards */}
              {[
                {
                  title: 'Nike - "Just Do It" Campaign',
                  category: 'Commercial',
                  description: 'High-energy commercial campaign featuring dynamic athletic footage and motivational messaging.',
                  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
                  link: '/projects/nike-just-do-it-campaign'
                },
                {
                  title: 'Tech Startup Product Launch',
                  category: 'Corporate',
                  description: 'Sleek product launch video with clean animations and professional messaging.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                  link: '/projects/tech-startup-product-launch'
                },
                {
                  title: 'Luxury Wedding Film',
                  category: 'Wedding',
                  description: 'Elegant wedding film capturing beautiful moments with cinematic storytelling.',
                  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
                  link: '/projects/luxury-wedding-sarah-michael'
                }
              ].map((project, index) => (
                <Card key={index} className="group cursor-pointer overflow-hidden border-gray-800 hover:border-primary-500 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-primary-500/20 text-primary-400 border-primary-500/30">
                      {project.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects" className="flex items-center space-x-2">
                  <span>View All Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Services & Expertise
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Comprehensive video editing services tailored to your specific needs and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Commercial Ads',
                  description: 'Professional 30-60 second commercials for brands and products',
                  price: 'From $1,500',
                  features: ['Script writing', '4K footage', 'Color grading', 'Multiple formats']
                },
                {
                  title: 'YouTube Content',
                  description: 'Complete YouTube video editing with thumbnails and optimization',
                  price: 'From $300',
                  features: ['Full editing', 'Custom thumbnails', 'SEO optimization', 'Captions']
                },
                {
                  title: 'Wedding Films',
                  description: 'Cinematic wedding films that capture your special day',
                  price: 'From $2,500',
                  features: ['Highlight reel', 'Full coverage', 'Drone footage', 'Custom music']
                },
                {
                  title: 'Corporate Videos',
                  description: 'Professional corporate videos for training and marketing',
                  price: 'From $2,000',
                  features: ['Script development', 'Motion graphics', 'Brand integration', 'Subtitles']
                }
              ].map((service, index) => (
                <Card key={index} className="border-gray-800 hover:border-primary-500 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-primary-400 font-semibold mb-4">{service.price}</div>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-gray-300 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/services" className="flex items-center space-x-2">
                  <span>View All Services</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Client Testimonials
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Don't just take my word for it. Here's what clients have to say about working together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Jessica Martinez',
                  role: 'Marketing Director',
                  company: 'Nike',
                  content: 'Working with Mayank was an absolute game-changer for our campaign. His attention to detail and creative vision elevated our brand messaging to new heights.',
                  rating: 5,
                  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b91238a6?w=100&h=100&fit=crop&crop=face'
                },
                {
                  name: 'David Chen',
                  role: 'CEO',
                  company: 'TechCorp Solutions',
                  content: 'Mayank transformed our complex product into a compelling story that resonated with our target audience. The video quality was outstanding.',
                  rating: 5,
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
                },
                {
                  name: 'Sarah Thompson',
                  role: 'Content Creator',
                  company: 'Wanderlust Adventures',
                  content: 'Mayank has been editing our travel vlogs for over a year. The quality consistently amazes our audience and engagement has never been higher.',
                  rating: 5,
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life with professional video editing that captivates your audience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/contact" className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Get Started</span>
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link href="/projects" className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>View Portfolio</span>
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