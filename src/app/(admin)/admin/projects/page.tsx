'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Users,
  Play,
  CheckCircle,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

// Mock projects data - this would come from the database
const projects = [
  {
    id: '1',
    title: 'Nike - "Just Do It" Campaign',
    slug: 'nike-just-do-it-campaign',
    description: 'High-energy commercial campaign for Nike featuring dynamic athletic footage and motivational messaging.',
    clientName: 'Nike',
    projectDate: '2024-01-15',
    featured: true,
    published: true,
    videoUrl: 'https://example.com/nike-campaign.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=225&fit=crop',
    category: { name: 'Commercial', slug: 'commercial' },
    tags: ['Color Grading', 'Motion Graphics', 'Sound Design', '4K Editing', 'Cinematic'],
    stats: { views: 15420, likes: 890, shares: 245 }
  },
  {
    id: '2',
    title: 'Tech Startup - Product Launch Video',
    slug: 'tech-startup-product-launch',
    description: 'Sleek and modern product launch video for a tech startup featuring clean animations.',
    clientName: 'TechCorp Solutions',
    projectDate: '2024-02-20',
    featured: false,
    published: true,
    videoUrl: 'https://example.com/tech-launch.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    category: { name: 'Corporate', slug: 'corporate' },
    tags: ['Motion Graphics', '4K Editing'],
    stats: { views: 8750, likes: 234, shares: 89 }
  },
  {
    id: '3',
    title: 'Luxury Wedding - Sarah & Michael',
    slug: 'luxury-wedding-sarah-michael',
    description: 'Elegant wedding film capturing the beautiful union of Sarah and Michael.',
    clientName: 'Sarah & Michael',
    projectDate: '2024-04-05',
    featured: true,
    published: true,
    videoUrl: 'https://example.com/wedding-film.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=225&fit=crop',
    category: { name: 'Wedding', slug: 'wedding' },
    tags: ['Color Grading', 'Sound Design', '4K Editing', 'Cinematic'],
    stats: { views: 12500, likes: 567, shares: 189 }
  },
  {
    id: '4',
    title: 'YouTube Series - Travel Vlogger',
    slug: 'travel-vlogger-youtube-series',
    description: 'Complete YouTube series editing for a travel vlogger exploring Asian destinations.',
    clientName: 'Wanderlust Adventures',
    projectDate: '2024-03-10',
    featured: false,
    published: false,
    videoUrl: 'https://example.com/travel-series.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=225&fit=crop',
    category: { name: 'YouTube', slug: 'youtube' },
    tags: ['Color Grading', 'Social Media'],
    stats: { views: 6780, likes: 123, shares: 45 }
  }
]

const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Commercial', value: 'commercial' },
  { name: 'Corporate', value: 'corporate' },
  { name: 'YouTube', value: 'youtube' },
  { name: 'Wedding', value: 'wedding' },
  { name: 'Documentary', value: 'documentary' }
]

const statuses = [
  { name: 'All Status', value: 'all' },
  { name: 'Published', value: 'published' },
  { name: 'Draft', value: 'draft' }
]

export default function AdminProjectsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/')
      return
    }

    filterProjects()
  }, [session, status, router])

  const filterProjects = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category.slug === selectedCategory)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => {
        if (selectedStatus === 'published') return project.published
        if (selectedStatus === 'draft') return !project.published
        return true
      })
    }

    setFilteredProjects(filtered)
  }

  const handleDelete = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      // Delete project logic here
      console.log('Deleting project:', projectId)
      // Would call API route to delete project
    }
  }

  const togglePublished = async (projectId: string, currentStatus: boolean) => {
    // Toggle published status logic here
    console.log('Toggling project:', projectId, currentStatus)
    // Would call API route to update project
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <p className="text-gray-400">
              Manage your portfolio projects and showcase your best work.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-gray-800/50 rounded-lg">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-gray-300 hover:text-white"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {statuses.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                    className="text-gray-300 hover:text-white"
                  >
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="border-gray-800 hover:border-primary-500 transition-colors">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {project.featured && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          Featured
                        </Badge>
                      )}
                      <Badge
                        className={`${
                          project.published
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}
                      >
                        {project.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <h3 className="text-white font-semibold mb-1 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(project.projectDate)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                      {project.category.name}
                    </Badge>
                    {project.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{project.stats.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="h-4 w-4" />
                      <span>{project.stats.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(project.id, project.published)}
                    >
                      {project.published ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters.'
                : 'Start by adding your first project.'}
            </p>
            <Button asChild>
              <Link href="/admin/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Link>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}