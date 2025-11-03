'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Filter, Calendar, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectsPage() {
  const projects = [
    {
      id: 'nike-just-do-it-campaign',
      title: 'Nike - "Just Do It" Campaign',
      category: 'Commercial',
      client: 'Nike',
      description: 'A high-energy commercial campaign for Nike featuring dynamic athletic footage and motivational messaging.',
      excerpt: 'High-energy commercial campaign featuring dynamic athletic footage and motivational messaging.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=450&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=225&fit=crop',
      videoUrl: 'https://example.com/nike-campaign.mp4',
      projectDate: '2024-01-15',
      featured: true,
      tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Pro Tools'],
      tags: ['Color Grading', 'Motion Graphics', 'Sound Design', '4K Editing', 'Cinematic', 'Corporate']
    },
    {
      id: 'tech-startup-product-launch',
      title: 'Tech Startup - Product Launch Video',
      category: 'Corporate',
      client: 'TechCorp Solutions',
      description: 'Sleek and modern product launch video for a tech startup featuring clean animations and professional messaging.',
      excerpt: 'Sleek product launch video with clean animations and professional messaging.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      videoUrl: 'https://example.com/tech-launch.mp4',
      projectDate: '2024-02-20',
      featured: false,
      tools: ['After Effects', 'Cinema 4D', 'Premiere Pro', 'Audition'],
      tags: ['Motion Graphics', '4K Editing', 'Corporate']
    },
    {
      id: 'travel-vlogger-youtube-series',
      title: 'Travel Vlogger - YouTube Series',
      category: 'YouTube',
      client: 'Wanderlust Adventures',
      description: 'Complete YouTube series editing for a travel vlogger exploring Asian destinations.',
      excerpt: 'Complete YouTube series editing for travel content creator.',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=450&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=225&fit=crop',
      videoUrl: 'https://example.com/travel-series.mp4',
      projectDate: '2024-03-10',
      featured: false,
      tools: ['Premiere Pro', 'Audition', 'Motion', 'Final Cut Pro'],
      tags: ['Color Grading', 'Social Media']
    },
    {
      id: 'luxury-wedding-sarah-michael',
      title: 'Luxury Wedding - Sarah & Michael',
      category: 'Wedding',
      client: 'Sarah & Michael',
      description: 'Elegant wedding film capturing the beautiful union of Sarah and Michael at a luxury venue.',
      excerpt: 'Elegant wedding film with cinematic storytelling and emotional moments.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=225&fit=crop',
      videoUrl: 'https://example.com/wedding-film.mp4',
      projectDate: '2024-04-05',
      featured: true,
      tools: ['DaVinci Resolve', 'Premiere Pro', 'Audition', 'Logic Pro X'],
      tags: ['Color Grading', 'Sound Design', '4K Editing', 'Cinematic']
    },
    {
      id: 'environmental-documentary',
      title: 'Environmental Documentary',
      category: 'Documentary',
      client: 'Green Planet Foundation',
      description: 'Powerful documentary highlighting climate change effects on coastal communities.',
      excerpt: 'Documentary film about climate change effects on coastal communities.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=450&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=225&fit=crop',
      videoUrl: 'https://example.com/climate-doc.mp4',
      projectDate: '2024-05-12',
      featured: false,
      tools: ['Premiere Pro', 'DaVinci Resolve', 'Pro Tools', 'Frame.io'],
      tags: ['Color Grading', '4K Editing', 'Documentary']
    },
    {
      id: 'cooking-tutorial-series',
      title: 'Cooking Tutorial Series',
      category: 'Tutorial',
      client: 'Chef\'s Table Academy',
      description: 'Professional cooking tutorial series with multiple camera angles and clear instructions.',
      excerpt: 'Professional cooking tutorials with multiple angles and clear instructions.',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=450&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=225&fit=crop',
      videoUrl: 'https://example.com/cooking-tutorial.mp4',
      projectDate: '2024-06-18',
      featured: false,
      tools: ['Premiere Pro', 'Audition', 'Motion', 'Final Cut Pro'],
      tags: ['Color Grading', 'Social Media']
    }
  ]

  const categories = ['All', 'Commercial', 'Corporate', 'YouTube', 'Wedding', 'Documentary', 'Tutorial']
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const filterProjects = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === category))
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                My <span className="text-gradient">Portfolio</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Explore a diverse collection of video editing projects spanning commercials,
                documentaries, wedding films, and digital content for brands and creators worldwide.
              </p>
              <div className="flex items-center justify-center space-x-4 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>50+ Projects</span>
                </div>
                <div className="text-gray-600">•</div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>8+ Years</span>
                </div>
                <div className="text-gray-600">•</div>
                <div>Multiple Categories</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">Filter by category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => filterProjects(category)}
                    className={selectedCategory === category ? 'bg-primary-500' : 'border-gray-700 text-gray-300'}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group cursor-pointer overflow-hidden border-gray-800 hover:border-primary-500 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/projects/${project.id}`}>
                        <Button size="icon" className="bg-primary-500 hover:bg-primary-600">
                          <Play className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Featured
                      </Badge>
                    )}
                    <Badge className="absolute top-4 right-4 bg-primary-500/20 text-primary-400 border-primary-500/30">
                      {project.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-primary-400 transition-colors text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {project.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-primary-400 hover:text-primary-300">
                        View Project
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No projects found in the "{selectedCategory}" category.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => filterProjects('All')}
                >
                  View All Projects
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Whether it's a commercial, wedding film,
              or digital content, I'm here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <Link href="/contact" className="flex items-center space-x-2">
                  <span>Get Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">
                  View Services
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