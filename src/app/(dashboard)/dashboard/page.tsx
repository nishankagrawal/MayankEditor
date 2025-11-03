'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  Mail,
  Calendar,
  Video,
  BookOpen,
  ShoppingBag,
  MessageCircle,
  LogOut,
  Settings,
  CreditCard,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userStats, setUserStats] = useState({
    enrolledCourses: 0,
    ordersCount: 0,
    bookingsCount: 0,
    totalSpent: 0
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Fetch user stats (mock data for now)
    setUserStats({
      enrolledCourses: 2,
      ordersCount: 3,
      bookingsCount: 1,
      totalSpent: 398
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

  const quickActions = [
    {
      title: 'Browse Courses',
      description: 'Explore our video editing courses',
      icon: BookOpen,
      href: '/courses',
      color: 'text-blue-400'
    },
    {
      title: 'View Projects',
      description: 'Check out latest portfolio work',
      icon: Video,
      href: '/projects',
      color: 'text-green-400'
    },
    {
      title: 'Book a Call',
      description: 'Schedule consultation with Mayank',
      icon: Calendar,
      href: '/contact',
      color: 'text-purple-400'
    },
    {
      title: 'Contact Support',
      description: 'Get help with your account',
      icon: MessageCircle,
      href: '/contact',
      color: 'text-yellow-400'
    }
  ]

  const recentActivity = [
    {
      type: 'course',
      title: 'Complete Video Editing Masterclass',
      date: '2024-07-15',
      status: 'completed'
    },
    {
      type: 'booking',
      title: 'Consultation Call with Mayank',
      date: '2024-07-10',
      status: 'completed'
    },
    {
      type: 'order',
      title: 'Advanced Color Grading Course',
      date: '2024-07-05',
      status: 'completed'
    }
  ]

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {session.user?.name}!
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your account today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-gray-800">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={session.user?.image || ''} />
                  <AvatarFallback className="text-2xl">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{session.user?.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {session.user?.email}
                </CardDescription>
                <Badge className="mt-2 bg-primary-500/20 text-primary-400 border-primary-500/30">
                  {session.user?.role}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{userStats.enrolledCourses}</p>
                      <p className="text-sm text-gray-400">Courses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <ShoppingBag className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{userStats.ordersCount}</p>
                      <p className="text-sm text-gray-400">Orders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{userStats.bookingsCount}</p>
                      <p className="text-sm text-gray-400">Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">${userStats.totalSpent}</p>
                      <p className="text-sm text-gray-400">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-400">
                  What would you like to do today?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Card className="border-gray-700 hover:border-primary-500 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <action.icon className={`h-6 w-6 ${action.color}`} />
                            <div>
                              <h3 className="text-white font-medium">{action.title}</h3>
                              <p className="text-sm text-gray-400">{action.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Your latest account activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'course' ? 'bg-blue-500/10' :
                          activity.type === 'booking' ? 'bg-purple-500/10' :
                          'bg-green-500/10'
                        }`}>
                          {activity.type === 'course' && <BookOpen className="h-4 w-4 text-blue-400" />}
                          {activity.type === 'booking' && <Calendar className="h-4 w-4 text-purple-400" />}
                          {activity.type === 'order' && <ShoppingBag className="h-4 w-4 text-green-400" />}
                        </div>
                        <div>
                          <p className="text-white font-medium">{activity.title}</p>
                          <p className="text-sm text-gray-400 flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(activity.date).toLocaleDateString()}</span>
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        activity.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}