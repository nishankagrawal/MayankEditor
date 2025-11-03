'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  DollarSign,
  BookOpen,
  Award,
  Download,
  Share2,
  Heart,
  ChevronRight,
  ArrowLeft,
  ShoppingCart,
  User,
  Target,
  Zap,
  Lock
} from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

// Mock course data - this would come from the database
const courseData = {
  'complete-video-editing-masterclass': {
    id: '1',
    title: 'Complete Video Editing Masterclass',
    slug: 'complete-video-editing-masterclass',
    description: 'Master video editing from beginner to professional with this comprehensive course covering everything from basic cuts to advanced color grading and motion graphics.',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop',
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
      bio: 'Professional video editor with 8+ years of experience in creating cinematic content for brands and creators.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      website: 'https://mayank-editor.vercel.app'
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
      lessons: 45,
      hours: 20
    },
    objectives: [
      'Master professional video editing techniques',
      'Create compelling visual stories',
      'Develop efficient editing workflows',
      'Build a professional portfolio',
      'Understand advanced color grading',
      'Create stunning motion graphics'
    ],
    requirements: [
      'Basic computer skills',
      'Video editing software (Adobe Premiere Pro recommended)',
      'Passion for storytelling and creativity',
      '8GB+ RAM computer (recommended)'
    ],
    lessons: [
      {
        id: '1',
        title: 'Course Introduction and Welcome',
        description: 'Introduction to the course, what you\'ll learn, and how to get the most out of this masterclass.',
        duration: 480, // 8 minutes
        order: 1,
        isPreview: true,
        videoUrl: 'https://example.com/intro.mp4'
      },
      {
        id: '2',
        title: 'Setting Up Your Editing Workspace',
        description: 'Learn how to set up an efficient editing workspace for maximum productivity.',
        duration: 720, // 12 minutes
        order: 2,
        isPreview: true,
        videoUrl: 'https://example.com/workspace.mp4'
      },
      {
        id: '3',
        title: 'Understanding Video Formats and Codecs',
        description: 'Essential knowledge about video formats, codecs, and how they affect your editing workflow.',
        duration: 900, // 15 minutes
        order: 3,
        isPreview: false
      },
      {
        id: '4',
        title: 'Basic Cutting and Trimming Techniques',
        description: 'Master the fundamental editing techniques that form the foundation of all video editing.',
        duration: 1200, // 20 minutes
        order: 4,
        isPreview: false
      }
    ],
    whatYoullGet: [
      '45+ video lessons (20+ hours of content)',
      'Downloadable project files and footage',
      'Practice exercises and assignments',
      'Private community access',
      'Certificate of completion',
      'Lifetime access to all materials',
      'Mobile app access',
      'Offline downloads available'
    ],
    targetAudience: [
      'Aspiring video editors',
      'YouTubers wanting to improve their content',
      'Marketing professionals',
      'Film students',
      'Anyone wanting to tell stories through video'
    ]
  }
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { data: session } = useSession()
  const [selectedTab, setSelectedTab] = useState('overview')
  const [isLiked, setIsLiked] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const course = courseData[params.slug as keyof typeof courseData]

  if (!course) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Course Not Found</h1>
          <p className="text-gray-400 mb-8">The course you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handlePurchase = async () => {
    if (!session) {
      window.location.href = '/auth/signin'
      return
    }

    setIsPurchasing(true)

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          courseTitle: course.title,
          price: course.price,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Purchase error:', error)
    } finally {
      setIsPurchasing(false)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
        {/* Back Navigation */}
        <section className="py-8 border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/courses" className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Courses</span>
            </Link>
          </div>
        </section>

        {/* Course Hero */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <Badge className="mb-4 bg-primary-500/20 text-primary-400 border-primary-500/30">
                    {course.category.name}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {course.title}
                  </h1>
                  <p className="text-lg text-gray-300 mb-6">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-white">{course.stats.rating}</span>
                      <span>({course.stats.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>{course.stats.enrolledStudents.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>{formatDuration(course.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>{course.stats.lessons} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Video Preview */}
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-8">
                  <div className="relative h-full flex items-center justify-center">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button size="lg" className="bg-primary-500 hover:bg-primary-600">
                        <Play className="h-6 w-6 mr-2" fill="white" />
                        Preview Course
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
                    <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum" className="text-gray-300 data-[state=active]:text-white">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor" className="text-gray-300 data-[state=active]:text-white">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews" className="text-gray-300 data-[state=active]:text-white">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-8">
                    <div className="space-y-8">
                      {/* What You'll Learn */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">What You'll Learn</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.objectives.map((objective, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                              <span className="text-gray-300">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Requirements</h3>
                        <ul className="space-y-2">
                          {course.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Target className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Target Audience */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Who This Course Is For</h3>
                        <ul className="space-y-2">
                          {course.targetAudience.map((audience, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Users className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{audience}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="mt-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white mb-6">Course Curriculum</h3>
                      {course.lessons.map((lesson, index) => (
                        <Card key={lesson.id} className="border-gray-800">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="text-gray-400 font-medium">#{lesson.order}</div>
                                <div>
                                  <h4 className="text-white font-medium">{lesson.title}</h4>
                                  <p className="text-gray-400 text-sm">{lesson.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="text-gray-400 text-sm">
                                  {formatDuration(lesson.duration)}
                                </div>
                                {lesson.isPreview ? (
                                  <Button variant="outline" size="sm">
                                    <Play className="h-4 w-4 mr-1" />
                                    Preview
                                  </Button>
                                ) : (
                                  <Button variant="ghost" size="sm" disabled>
                                    <Lock className="h-4 w-4 mr-1" />
                                    Enroll to Access
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="instructor" className="mt-8">
                    <Card className="border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={course.instructor.avatar} />
                            <AvatarFallback>
                              {course.instructor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {course.instructor.name}
                            </h3>
                            <p className="text-gray-300 mb-4">
                              {course.instructor.bio}
                            </p>
                            <div className="flex items-center space-x-4">
                              <Button variant="outline" size="sm" asChild>
                                <Link href="/about">
                                  View Profile
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={course.instructor.website} target="_blank">
                                  Website
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-8">
                    <div className="text-center py-12">
                      <Star className="h-12 w-12 text-yellow-400 fill-current mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {course.stats.rating} Course Rating
                      </h3>
                      <p className="text-gray-400 mb-8">
                        Based on {course.stats.reviews} reviews from {course.stats.enrolledStudents} students
                      </p>
                      <Button variant="outline" size="lg">
                        Write a Review
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Price Card */}
                  <Card className="border-gray-800">
                    <CardHeader>
                      <div className="text-center">
                        {course.price === 0 ? (
                          <div className="text-3xl font-bold text-green-400">Free</div>
                        ) : (
                          <div>
                            <div className="text-3xl font-bold text-white">${course.price}</div>
                            {course.comparePrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ${course.comparePrice}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mt-2">
                          <Award className="h-4 w-4" />
                          <span>Certificate of Completion</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEnrolled ? (
                        <Button size="lg" className="w-full" asChild>
                          <Link href={`/dashboard/courses/${course.id}`}>
                            <Play className="h-4 w-4 mr-2" />
                            Start Learning
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          size="lg"
                          className="w-full"
                          onClick={handlePurchase}
                          disabled={isPurchasing}
                        >
                          {isPurchasing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Enroll Now
                            </>
                          )}
                        </Button>
                      )}

                      <div className="text-center text-sm text-gray-400">
                        30-day money-back guarantee
                      </div>

                      <Separator className="border-gray-700" />

                      <div>
                        <h4 className="text-white font-semibold mb-3">This course includes:</h4>
                        <ul className="space-y-2">
                          {course.whatYoullGet.map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="border-gray-700" />

                      <div className="text-center space-y-2">
                        <div className="text-gray-400 text-sm">Share this course:</div>
                        <div className="flex justify-center space-x-2">
                          <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Stats */}
                  <Card className="border-gray-800">
                    <CardContent className="p-6">
                      <h4 className="text-white font-semibold mb-4">Course Stats</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Students</span>
                          <span className="text-white font-medium">{course.stats.enrolledStudents.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lessons</span>
                          <span className="text-white font-medium">{course.stats.lessons}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white font-medium">{formatDuration(course.duration)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Skill Level</span>
                          <Badge className={getDifficultyColor(course.difficulty)}>
                            {course.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Language</span>
                          <span className="text-white font-medium">English</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}