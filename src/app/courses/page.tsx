'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  BookOpen,
  Play,
  DollarSign,
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

// Mock course data - this would come from the database
const courses = [
  {
    id: '1',
    title: 'Complete Video Editing Masterclass',
    slug: 'complete-video-editing-masterclass',
    description: 'Master video editing from beginner to professional with this comprehensive course covering everything from basic cuts to advanced color grading and motion graphics.',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    price: 199,
    comparePrice: 399,
    currency: 'USD',
    status: 'PUBLISHED',
    featured: true,
    publishedAt: '2024-06-01',
    difficulty: 'BEGINNER',
    duration: 1200, // 20 hours in minutes
    language: 'en',
    instructor: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Professional video editor with 8+ years of experience'
    },
    category: {
      name: 'Video Editing',
      slug: 'video-editing'
    },
    tags: [
      { name: 'Color Grading', slug: 'color-grading' },
      { name: 'Motion Graphics', slug: 'motion-graphics' },
      { name: 'Sound Design', slug: 'sound-design' },
      { name: '4K Editing', slug: '4k-editing' }
    ],
    stats: {
      enrolledStudents: 1250,
      rating: 4.8,
      reviews: 89,
      lessons: 45
    },
    objectives: [
      'Master professional video editing techniques',
      'Create compelling visual stories',
      'Develop efficient editing workflows',
      'Build a professional portfolio'
    ],
    requirements: [
      'Basic computer skills',
      'Video editing software (Adobe Premiere Pro recommended)',
      'Passion for storytelling and creativity'
    ]
  },
  {
    id: '2',
    title: 'Advanced Color Grading Techniques',
    slug: 'advanced-color-grading-techniques',
    description: 'Master the art of cinematic color grading with this advanced course covering professional techniques, industry tools, and creative approaches used in Hollywood productions.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    price: 0,
    currency: 'USD',
    status: 'PUBLISHED',
    featured: false,
    publishedAt: '2024-07-01',
    difficulty: 'ADVANCED',
    duration: 900, // 15 hours in minutes
    language: 'en',
    instructor: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Professional video editor with 8+ years of experience'
    },
    category: {
      name: 'Color Grading',
      slug: 'color-grading'
    },
    tags: [
      { name: 'Color Grading', slug: 'color-grading' },
      { name: '4K Editing', slug: '4k-editing' },
      { name: 'Cinematic', slug: 'cinematic' }
    ],
    stats: {
      enrolledStudents: 3500,
      rating: 4.9,
      reviews: 156,
      lessons: 25
    },
    objectives: [
      'Master professional color grading workflows',
      'Create cinematic color grades',
      'Work with RAW footage professionally',
      'Understand advanced color theory'
    ],
    requirements: [
      'Strong video editing foundation',
      'Experience with basic color correction',
      'DaVinci Resolve Studio (recommended)'
    ]
  },
  {
    id: '3',
    title: 'YouTube Content Creation Mastery',
    slug: 'youtube-content-creation-mastery',
    description: 'Complete guide to creating successful YouTube content, from video production to channel growth strategies and monetization.',
    thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
    price: 149,
    comparePrice: 299,
    currency: 'USD',
    status: 'PUBLISHED',
    featured: true,
    publishedAt: '2024-08-01',
    difficulty: 'INTERMEDIATE',
    duration: 800, // 13+ hours in minutes
    language: 'en',
    instructor: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      bio: 'Professional video editor with 8+ years of experience'
    },
    category: {
      name: 'YouTube',
      slug: 'youtube'
    },
    tags: [
      { name: 'Social Media', slug: 'social-media' },
      { name: 'Content Strategy', slug: 'content-strategy' },
      { name: 'Monetization', slug: 'monetization' }
    ],
    stats: {
      enrolledStudents: 890,
      rating: 4.7,
      reviews: 67,
      lessons: 35
    },
    objectives: [
      'Create engaging YouTube content',
      'Grow your channel effectively',
      'Monetize your content successfully',
      'Build a loyal audience'
    ],
    requirements: [
      'Basic video editing skills',
      'Smartphone or camera for filming',
      'Interest in content creation'
    ]
  }
]

const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Video Editing', value: 'video-editing' },
  { name: 'Color Grading', value: 'color-grading' },
  { name: 'YouTube', value: 'youtube' },
  { name: 'Motion Graphics', value: 'motion-graphics' }
]

const difficulties = [
  { name: 'All Levels', value: 'all' },
  { name: 'Beginner', value: 'beginner' },
  { name: 'Intermediate', value: 'intermediate' },
  { name: 'Advanced', value: 'advanced' }
]

const priceRanges = [
  { name: 'All Prices', value: 'all' },
  { name: 'Free', value: 'free' },
  { name: 'Under $100', value: 'under-100' },
  { name: '$100 - $200', value: '100-200' },
  { name: 'Over $200', value: 'over-200' }
]

export default function CoursesPage() {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [filteredCourses, setFilteredCourses] = useState(courses)

  const filterCourses = () => {
    let filtered = courses

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category.slug === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty.toLowerCase() === selectedDifficulty)
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      if (selectedPriceRange === 'free') {
        filtered = filtered.filter(course => course.price === 0)
      } else if (selectedPriceRange === 'under-100') {
        filtered = filtered.filter(course => course.price > 0 && course.price < 100)
      } else if (selectedPriceRange === '100-200') {
        filtered = filtered.filter(course => course.price >= 100 && course.price <= 200)
      } else if (selectedPriceRange === 'over-200') {
        filtered = filtered.filter(course => course.price > 200)
      }
    }

    setFilteredCourses(filtered)
  }

  useState(() => {
    filterCourses()
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedPriceRange])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'INTERMEDIATE':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'ADVANCED':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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
              <Badge className="mb-6 bg-primary-500/20 text-primary-400 border-primary-500/30">
                Online Courses
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Learn <span className="text-gradient">Video Editing</span> from Industry Experts
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Comprehensive courses covering video editing, color grading, motion graphics, and content creation.
                Join thousands of students and master your craft.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-6 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary-400" />
                    <span className="font-semibold">5,000+</span>
                    <span>Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.8</span>
                    <span>Average Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-green-400" />
                    <span className="font-semibold">100+</span>
                    <span>Lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white min-w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
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

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white min-w-[120px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {difficulties.map((difficulty) => (
                      <SelectItem
                        key={difficulty.value}
                        value={difficulty.value}
                        className="text-gray-300 hover:text-white"
                      >
                        {difficulty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white min-w-[120px]">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {priceRanges.map((range) => (
                      <SelectItem
                        key={range.value}
                        value={range.value}
                        className="text-gray-300 hover:text-white"
                      >
                        {range.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        {filteredCourses.some(course => course.featured) && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Featured Courses
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredCourses.filter(course => course.featured).map((course) => (
                  <Card key={course.id} className="group cursor-pointer border-gray-800 hover:border-primary-500 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <Badge className="absolute top-4 left-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Featured
                      </Badge>
                      {course.price === 0 && (
                        <Badge className="absolute top-4 right-4 bg-green-500/20 text-green-400 border-green-500/30">
                          Free
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{course.stats.rating}</span>
                          <span>({course.stats.reviews})</span>
                        </div>
                      </div>
                      <CardTitle className="text-white group-hover:text-primary-400 transition-colors text-xl mb-2">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDuration(course.duration)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.stats.lessons} lessons</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.stats.enrolledStudents}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          {course.price === 0 ? (
                            <span className="text-2xl font-bold text-green-400">Free</span>
                          ) : (
                            <div>
                              <span className="text-2xl font-bold text-white">${course.price}</span>
                              {course.comparePrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ${course.comparePrice}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.slug}`}>
                            View Course
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Courses Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              All Courses
            </h2>
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="group cursor-pointer border-gray-800 hover:border-primary-500 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {course.price === 0 && (
                        <Badge className="absolute top-4 left-4 bg-green-500/20 text-green-400 border-green-500/30">
                          Free
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-gray-700 text-gray-300 text-xs">
                          {course.category.name}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{course.stats.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-white group-hover:text-primary-400 transition-colors text-lg mb-2 line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDuration(course.duration)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{course.stats.enrolledStudents}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          {course.price === 0 ? (
                            <span className="text-lg font-bold text-green-400">Free</span>
                          ) : (
                            <div>
                              <span className="text-lg font-bold text-white">${course.price}</span>
                              {course.comparePrice && (
                                <span className="text-xs text-gray-500 line-through ml-1">
                                  ${course.comparePrice}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.slug}`}>
                            View Course
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                  No courses found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedDifficulty('all')
                    setSelectedPriceRange('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Master Video Editing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their skills with our comprehensive courses.
            </p>
            {!session ? (
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="xl" variant="secondary" asChild>
                  <Link href="/auth/signup">
                    Sign Up Now
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary-600">
                  <Link href="/courses">
                    Browse Courses
                  </Link>
                </Button>
              </div>
            ) : (
              <Button size="xl" variant="secondary" asChild>
                <Link href="/dashboard/courses">
                  My Dashboard
                </Link>
              </Button>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}