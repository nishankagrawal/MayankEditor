'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Play,
  BookOpen,
  Clock,
  CheckCircle,
  Star,
  Users,
  Download,
  Award,
  BarChart,
  Calendar,
  Filter
} from 'lucide-react'

// Mock enrolled courses data - this would come from the database
const enrolledCourses = [
  {
    id: '1',
    title: 'Complete Video Editing Masterclass',
    slug: 'complete-video-editing-masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
    instructor: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    progress: {
      completed: false,
      progress: 65, // 65% complete
      completedLessons: 29,
      totalLessons: 45,
      timeSpent: 780, // minutes
      lastAccessed: '2024-07-15T10:30:00Z',
      certificate: false
    },
    stats: {
      rating: 4.8,
      reviews: 89,
      enrolledStudents: 1250
    }
  },
  {
    id: '2',
    title: 'Advanced Color Grading Techniques',
    slug: 'advanced-color-grading-techniques',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
    instructor: {
      name: 'Mayank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    progress: {
      completed: true,
      progress: 100,
      completedLessons: 25,
      totalLessons: 25,
      timeSpent: 900,
      lastAccessed: '2024-07-10T15:45:00Z',
      certificate: true,
      certificateUrl: '/certificates/advanced-color-grading.pdf'
    },
    stats: {
      rating: 4.9,
      reviews: 156,
      enrolledStudents: 3500
    }
  }
]

const achievements = [
  {
    title: 'Fast Learner',
    description: 'Complete a course in record time',
    icon: Zap,
    unlocked: true,
    color: 'text-yellow-400'
  },
  {
    title: 'Dedicated Student',
    description: 'Maintain a 7-day learning streak',
    icon: Calendar,
    unlocked: true,
    color: 'text-blue-400'
  },
  {
    title: 'Course Master',
    description: 'Complete 5 courses',
    icon: Award,
    unlocked: false,
    color: 'text-gray-400'
  },
  {
    title: 'Community Leader',
    description: 'Help 10 fellow students',
    icon: Users,
    unlocked: false,
    color: 'text-gray-400'
  }
]

export default function DashboardCoursesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [stats, setStats] = useState({
    totalCourses: 2,
    completedCourses: 1,
    inProgressCourses: 1,
    totalHours: 28,
    certificates: 1
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Calculate stats from enrolled courses
    const completed = enrolledCourses.filter(course => course.progress.completed).length
    const inProgress = enrolledCourses.filter(course => !course.progress.completed).length
    const totalMinutes = enrolledCourses.reduce((acc, course) => acc + course.progress.timeSpent, 0)
    const certificates = enrolledCourses.filter(course => course.progress.certificate).length

    setStats({
      totalCourses: enrolledCourses.length,
      completedCourses: completed,
      inProgressCourses: inProgress,
      totalHours: Math.round(totalMinutes / 60),
      certificates: certificates
    })
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const filteredCourses = enrolledCourses.filter(course => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'in-progress') return !course.progress.completed
    if (selectedFilter === 'completed') return course.progress.completed
    return true
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
          <p className="text-gray-400">
            Track your learning progress and access your enrolled courses.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Courses</p>
                  <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-green-400">{stats.completedCourses}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Hours Learned</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalHours}h</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Certificates</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.certificates}</p>
                </div>
                <Award className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`border-gray-800 ${achievement.unlocked ? '' : 'opacity-50'}`}>
                <CardContent className="p-4 text-center">
                  <achievement.icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`} />
                  <h3 className="text-white font-medium mb-1">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                  {achievement.unlocked && (
                    <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                      Unlocked
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Courses List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Enrolled Courses</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                All ({stats.totalCourses})
              </Button>
              <Button
                variant={selectedFilter === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('in-progress')}
              >
                In Progress ({stats.inProgressCourses})
              </Button>
              <Button
                variant={selectedFilter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('completed')}
              >
                Completed ({stats.completedCourses})
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="border-gray-800 hover:border-primary-500 transition-colors">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        {course.progress.completed && (
                          <div className="absolute inset-0 bg-green-500/80 rounded-lg flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-1 truncate">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                        <Avatar className="w-4 h-4">
                          <AvatarImage src={course.instructor.avatar} />
                          <AvatarFallback className="text-xs">
                            {course.instructor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{course.instructor.name}</span>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">
                            Progress: {course.progress.completedLessons}/{course.progress.totalLessons} lessons
                          </span>
                          <span className="text-gray-400">{course.progress.progress}%</span>
                        </div>
                        <Progress
                          value={course.progress.progress}
                          className="h-2 bg-gray-700"
                        />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{course.stats.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(course.progress.timeSpent)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{course.stats.enrolledStudents}</span>
                        </div>
                      </div>

                      {/* Last Accessed */}
                      <div className="text-sm text-gray-400 mb-4">
                        Last accessed: {formatDate(course.progress.lastAccessed)}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.slug}`}>
                            {course.progress.completed ? (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                Review
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                Continue
                              </>
                            )}
                          </Link>
                        </Button>

                        {course.progress.certificate && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={course.progress.certificateUrl || '#'}>
                              <Download className="h-4 w-4 mr-1" />
                              Certificate
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
              <p className="text-gray-400 mb-6">
                {selectedFilter === 'completed' && 'You haven\'t completed any courses yet.'}
                {selectedFilter === 'in-progress' && 'You\'re not currently enrolled in any active courses.'}
                {selectedFilter === 'all' && 'You haven\'t enrolled in any courses yet.'}
              </p>
              <Button asChild>
                <Link href="/courses">
                  Browse Courses
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}