import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Mail,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  Target,
  Heart,
  Download,
  ExternalLink,
  Play,
  Star,
  CheckCircle,
  Users,
  Video,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const skills = [
    { name: 'Video Editing', level: 95, icon: Video },
    { name: 'Color Grading', level: 90, icon: TrendingUp },
    { name: 'Motion Graphics', level: 85, icon: Target },
    { name: 'Sound Design', level: 80, icon: Heart },
    { name: 'Storytelling', level: 95, icon: Star },
    { name: 'Project Management', level: 85, icon: Users }
  ]

  const experience = [
    {
      year: '2024 - Present',
      role: 'Senior Video Editor & Director',
      company: 'Freelance',
      description: 'Leading video production projects for major brands and creators, specializing in commercial content and narrative films.'
    },
    {
      year: '2020 - 2024',
      role: 'Video Editor & Post-Production Specialist',
      company: 'Creative Studios Mumbai',
      description: 'Managed post-production workflow for corporate clients, advertising agencies, and independent filmmakers.'
    },
    {
      year: '2018 - 2020',
      role: 'Junior Video Editor',
      company: 'Digital Media Agency',
      description: 'Edited social media content, promotional videos, and assisted in documentary post-production.'
    },
    {
      year: '2016 - 2018',
      role: 'Video Production Intern',
      company: 'Broadcast Network',
      description: 'Learned professional editing workflows, assisted in live production, and gained experience in broadcast standards.'
    }
  ]

  const achievements = [
    {
      icon: Video,
      title: '50+ Projects Completed',
      description: 'Successfully delivered video editing projects across various industries and formats.'
    },
    {
      icon: Users,
      title: '30+ Happy Clients',
      description: 'Built long-term relationships with brands, creators, and businesses worldwide.'
    },
    {
      icon: Award,
      title: 'Award-Winning Work',
      description: 'Recognized for excellence in commercial and documentary video editing.'
    },
    {
      icon: Clock,
      title: '8+ Years Experience',
      description: 'Professional expertise in video editing and post-production workflows.'
    }
  ]

  const clientLogos = [
    { name: 'Nike', url: '#' },
    { name: 'TechCorp', url: '#' },
    { name: 'Creative Studio', url: '#' },
    { name: 'Green Planet', url: '#' },
    { name: 'Chef\'s Table', url: '#' },
    { name: 'Wanderlust', url: '#' }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-primary-500/20 text-primary-400 border-primary-500/30">
                  About Mayank
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Crafting <span className="text-gradient">Visual Stories</span> That Matter
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Professional video editor with 8+ years of experience transforming raw footage
                  into compelling cinematic content. Specializing in commercial videos, documentaries,
                  and digital content that captivates audiences and drives results.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" asChild>
                    <Link href="/contact" className="flex items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <span>Get In Touch</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/projects">
                      View My Work
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Avatar className="w-full h-80 lg:h-96 rounded-lg">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Mayank"
                  />
                  <AvatarFallback className="text-4xl">MK</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white p-6 rounded-lg">
                  <div className="text-3xl font-bold">8+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Expertise & Skills
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Comprehensive skills covering the entire video production and post-production pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <Card key={index} className="border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <skill.icon className="h-6 w-6 text-primary-400" />
                        <h3 className="text-white font-semibold">{skill.name}</h3>
                      </div>
                      <span className="text-primary-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-400 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-20 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Professional Journey
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                My career path from intern to senior video editor, working with diverse clients and projects.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {experience.map((job, index) => (
                <div key={index} className="relative flex items-start space-x-8 pb-12">
                  {/* Timeline Line */}
                  {index !== experience.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-700" />
                  )}

                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>

                  {/* Job Content */}
                  <Card className="flex-1 border-gray-800">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <CardTitle className="text-white">{job.role}</CardTitle>
                          <CardDescription className="text-primary-400 font-medium">
                            {job.company}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="mt-2 sm:mt-0 border-gray-600">
                          {job.year}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{job.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Achievements & Impact
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Numbers that reflect the quality and impact of my work over the years.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-gray-800 text-center">
                  <CardContent className="p-6">
                    <achievement.icon className="h-12 w-12 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Software & Tools */}
        <section className="py-20 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Software & Tools
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Professional tools and software I master to deliver exceptional results.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                'Adobe Premiere Pro',
                'DaVinci Resolve',
                'After Effects',
                'Cinema 4D',
                'Pro Tools',
                'Logic Pro X'
              ].map((tool, index) => (
                <Card key={index} className="border-gray-800 text-center p-6">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Play className="h-8 w-8 text-primary-400" />
                    </div>
                    <h3 className="text-white font-medium text-sm">{tool}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Client Logos */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Trusted By
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Brands and organizations I've had the pleasure of working with.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {clientLogos.map((client, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 font-medium">{client.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Story */}
        <section className="py-20 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                My Philosophy
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Video editing isn't just about cutting footage—it's about storytelling. Every frame,
                  every transition, every color grade serves a purpose in conveying emotion and meaning.
                </p>
                <p>
                  I believe in the power of visual storytelling to inspire, educate, and move audiences.
                  Whether it's a 30-second commercial or a feature-length documentary, the goal remains
                  the same: create content that resonates and leaves a lasting impact.
                </p>
                <p>
                  Collaboration is at the heart of great work. I partner closely with clients to understand
                  their vision and bring it to life with technical excellence and creative innovation.
                </p>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild>
                  <Link href="/contact" className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Let's Work Together</span>
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#" className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download CV</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with professional video editing
              that captivates your audience and achieves your goals.
            </p>
            <Button size="xl" variant="secondary" asChild>
              <Link href="/contact" className="flex items-center space-x-2">
                <span>Start a Conversation</span>
                <ExternalLink className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}