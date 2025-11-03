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
  Calendar,
  Clock,
  User,
  Search,
  Filter,
  ArrowRight,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react'
import Link from 'next/link'

// Mock blog data - this would come from the database
const blogPosts = [
  {
    id: '1',
    title: '10 Essential Video Editing Tips for Beginners',
    slug: '10-essential-video-editing-tips-beginners',
    excerpt: 'Learn the fundamental video editing techniques every beginner should master to create professional, engaging videos.',
    content: 'Complete content would be here...',
    featuredImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    author: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-06-01',
    readingTime: 8,
    status: 'PUBLISHED',
    category: {
      name: 'Tutorial',
      slug: 'tutorial'
    },
    tags: [
      { name: 'Color Grading', slug: 'color-grading' },
      { name: 'Motion Graphics', slug: 'motion-graphics' },
      { name: '4K Editing', slug: '4k-editing' },
      { name: 'Social Media', slug: 'social-media' }
    ],
    views: 1250,
    comments: 23,
    likes: 89
  },
  {
    id: '2',
    title: 'The Future of Video Editing: AI and Automation',
    slug: 'future-of-video-editing-ai-automation',
    excerpt: 'Explore how artificial intelligence and automation are transforming video editing workflows and what it means for content creators.',
    content: 'Complete content would be here...',
    featuredImage: 'https://images.unsplash.com/photo-1620712943543-ccfd8a0e7409?w=800&h=400&fit=crop',
    author: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-06-15',
    readingTime: 6,
    status: 'PUBLISHED',
    category: {
      name: 'Industry',
      slug: 'industry'
    },
    tags: [
      { name: 'Motion Graphics', slug: 'motion-graphics' },
      { name: 'Corporate', slug: 'corporate' },
      { name: 'Social Media', slug: 'social-media' }
    ],
    views: 2100,
    comments: 45,
    likes: 156
  },
  {
    id: '3',
    title: 'Color Grading Basics: A Complete Guide',
    slug: 'color-grading-basics-complete-guide',
    excerpt: 'Master the fundamentals of color grading with this comprehensive guide covering theory, tools, and practical techniques.',
    content: 'Complete content would be here...',
    featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
    author: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '2024-07-01',
    readingTime: 12,
    status: 'PUBLISHED',
    category: {
      name: 'Tutorial',
      slug: 'tutorial'
    },
    tags: [
      { name: 'Color Grading', slug: 'color-grading' },
      { name: '4K Editing', slug: '4k-editing' },
      { name: 'Cinematic', slug: 'cinematic' }
    ],
    views: 3500,
    comments: 67,
    likes: 234
  }
]

const categories = [
  { name: 'All Categories', value: 'all' },
  { name: 'Tutorial', value: 'tutorial' },
  { name: 'Industry', value: 'industry' },
  { name: 'Case Study', value: 'case-study' },
  { name: 'Tips & Tricks', value: 'tips-tricks' }
]

const popularTags = [
  'Color Grading',
  'Motion Graphics',
  '4K Editing',
  'Cinematic',
  'Social Media',
  'Corporate'
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  const filterPosts = () => {
    let filtered = blogPosts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category.slug === selectedCategory)
    }

    setFilteredPosts(filtered)
  }

  useState(() => {
    filterPosts()
  }, [searchTerm, selectedCategory])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
                Blog & Insights
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Video Editing <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Tips, tutorials, and industry insights for video editors, content creators,
                and filmmakers. Learn from my experience and stay updated with the latest trends.
              </p>
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
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
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
              </div>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="text-gray-400 text-sm">Popular tags:</span>
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:border-primary-500 hover:text-primary-400 cursor-pointer"
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group cursor-pointer border-gray-800 hover:border-primary-500 transition-all duration-300 hover:-translate-y-1">
                    {/* Featured Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute top-4 left-4 bg-primary-500/20 text-primary-400 border-primary-500/30">
                        {post.category.name}
                      </Badge>
                    </div>

                    <CardHeader>
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="text-gray-600">•</span>
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime} min read</span>
                      </div>
                      <CardTitle className="text-white group-hover:text-primary-400 transition-colors text-xl line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag.slug} variant="secondary" className="text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>

                      {/* Author and Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-400">{post.author.name}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-400 text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-primary-400 hover:text-primary-300 mt-4">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                  No blog posts found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Get the latest video editing tips, tutorials, and industry insights delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
                <Button className="w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}