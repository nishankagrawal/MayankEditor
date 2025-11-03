import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Calendar, ExternalLink, Download, Share2, Clock, User, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// This would normally come from the database
const projectData = {
  'nike-just-do-it-campaign': {
    title: 'Nike - "Just Do It" Campaign',
    slug: 'nike-just-do-it-campaign',
    description: 'A high-energy commercial campaign for Nike featuring dynamic athletic footage and motivational messaging.',
    content: `# Nike "Just Do It" Campaign

This project involved creating a series of high-impact commercials for Nike's latest "Just Do It" campaign. The challenge was to capture the raw determination and athletic excellence that Nike represents.

## The Vision

The client wanted to create content that would resonate with both professional athletes and everyday fitness enthusiasts. We focused on authentic moments of athletic achievement and the mental fortitude required to push beyond limits.

## Technical Approach

- Shot on ARRI Alexa Mini LF
- Color graded using DaVinci Resolve
- Motion graphics in After Effects
- Sound design in Pro Tools

## Results

The campaign generated over 50 million views across social platforms and contributed to a 15% increase in engagement for Nike's digital channels.`,
    excerpt: 'High-energy commercial campaign featuring dynamic athletic footage and motivational messaging.',
    clientName: 'Nike',
    clientUrl: 'https://nike.com',
    projectDate: '2024-01-15',
    featured: true,
    published: true,
    videoUrl: 'https://example.com/nike-campaign.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=675&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&h=1080&fit=crop',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Pro Tools'],
    deliverables: '3x 30-second commercials, 6x social media cuts, behind-the-scenes footage',
    caseStudyUrl: '/case-studies/nike-campaign',
    metaTitle: 'Nike "Just Do It" Campaign - Mayank Video Editor',
    metaDescription: 'High-energy commercial campaign for Nike featuring dynamic athletic footage and professional video editing.',
    category: 'Commercial',
    tags: ['Color Grading', 'Motion Graphics', 'Sound Design', '4K Editing', 'Cinematic', 'Corporate'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
    ]
  }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectData[params.slug as keyof typeof projectData]

  if (!project) {
    notFound()
  }

  const relatedProjects = Object.values(projectData)
    .filter(p => p.slug !== project.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main>
        {/* Back Navigation */}
        <section className="py-8 border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/projects" className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </section>

        {/* Hero Video/Image */}
        <section className="relative aspect-video bg-black">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button size="icon" className="h-16 w-16 rounded-full bg-primary-500 hover:bg-primary-600">
              <Play className="h-8 w-8" fill="white" />
            </Button>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <Badge className="mb-4 bg-primary-500/20 text-primary-400 border-primary-500/30">
                    {project.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {project.title}
                  </h1>
                  <p className="text-xl text-gray-300 mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Project Content */}
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed">
                    {project.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
                            {paragraph.replace('# ', '')}
                          </h2>
                        )
                      } else if (paragraph.startsWith('## ')) {
                        return (
                          <h3 key={index} className="text-xl font-semibold text-white mt-6 mb-3">
                            {paragraph.replace('## ', '')}
                          </h3>
                        )
                      } else if (paragraph.startsWith('- ')) {
                        return (
                          <li key={index} className="text-gray-300 ml-4">
                            {paragraph.replace('- ', '')}
                          </li>
                        )
                      } else if (paragraph.trim()) {
                        return (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>

                {/* Project Gallery */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Project Info Card */}
                  <Card className="border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-400">Client</div>
                          <div className="text-white font-medium">
                            {project.clientName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-400">Date</div>
                          <div className="text-white font-medium">
                            {new Date(project.projectDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-400">Duration</div>
                          <div className="text-white font-medium">2 weeks</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tools Used */}
                  <Card className="border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Tools Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card className="border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-sm border-gray-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/contact">
                        Get Quote for Similar Project
                      </Link>
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-dark-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Related Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <Card key={relatedProject.slug} className="group cursor-pointer overflow-hidden border-gray-800 hover:border-primary-500 transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={relatedProject.videoThumbnail}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="absolute top-4 left-4 bg-primary-500/20 text-primary-400 border-primary-500/30">
                        {relatedProject.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white group-hover:text-primary-400 transition-colors text-lg">
                        {relatedProject.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {relatedProject.clientName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/projects/${relatedProject.slug}`}>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-primary-400 hover:text-primary-300">
                          View Project
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Like What You See?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together.
              Whether it's a commercial, documentary, or digital content, I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/contact">
                  Start Your Project
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link href="/projects">
                  View More Work
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