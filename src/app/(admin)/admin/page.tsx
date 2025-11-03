'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BarChart3,
  Users,
  DollarSign,
  BookOpen,
  FileText,
  ShoppingCart,
  MessageSquare,
  Calendar,
  TrendingUp,
  Eye,
  Star,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react'
import Link from 'next/link'

// Mock admin data - this would come from the database
const adminStats = {
  totalUsers: 1250,
  totalCourses: 12,
  totalOrders: 450,
  totalRevenue: 45780,
  monthlyRevenue: 12450,
  totalBlogPosts: 25,
  totalProjects: 50,
  totalBookings: 89
}

const recentActivity = [
  {
    id: '1',
    type: 'order',
    title: 'New order: Complete Video Editing Masterclass',
    user: 'John Doe',
    amount: 199,
    date: '2024-07-15T14:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    type: 'booking',
    title: 'Consultation booking scheduled',
    user: 'Sarah Smith',
    date: '2024-07-15T10:15:00Z',
    status: 'scheduled'
  },
  {
    id: '3',
    type: 'user',
    title: 'New user registered',
    user: 'Michael Johnson',
    date: '2024-07-15T09:45:00Z',
    status: 'active'
  },
  {
    id: '4',
    type: 'contact',
    title: 'New contact form submission',
    user: 'Emily Davis',
    date: '2024-07-15T08:30:00Z',
    status: 'new'
  }
]

const topPages = [
  { page: '/courses', views: 12500, change: '+12%' },
  { page: '/projects', views: 8900, change: '+8%' },
  { page: '/blog', views: 5600, change: '+15%' },
  { page: '/about', views: 3400, change: '+5%' }
]

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'ADMIN') {
      router.push('/')
      return
    }
  }, [session, status, router])

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-green-400" />
      case 'booking':
        return <Calendar className="h-4 w-4 text-blue-400" />
      case 'user':
        return <Users className="h-4 w-4 text-purple-400" />
      case 'contact':
        return <MessageSquare className="h-4 w-4 text-orange-400" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">
              Manage your website, track performance, and monitor user activity.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Time Range:</span>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white px-3 py-1 rounded-md"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${adminStats.totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-sm text-green-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-sm text-blue-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+8%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{adminStats.totalOrders}</p>
                  <div className="flex items-center space-x-1 text-sm text-purple-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+15%</span>
                  </div>
                </div>
                <ShoppingCart className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Courses</p>
                  <p className="text-2xl font-bold text-white">{adminStats.totalCourses}</p>
                  <div className="flex items-center space-x-1 text-sm text-orange-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>+5%</span>
                  </div>
                </div>
                <BookOpen className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-gray-800 hover:border-primary-500 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-primary-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Blog Posts</h3>
              <p className="text-2xl font-bold text-white mt-2">{adminStats.totalBlogPosts}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                <Link href="/admin/blog">Manage</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-800 hover:border-primary-500 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Projects</h3>
              <p className="text-2xl font-bold text-white mt-2">{adminStats.totalProjects}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                <Link href="/admin/projects">Manage</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-800 hover:border-primary-500 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Courses</h3>
              <p className="text-2xl font-bold text-white mt-2">{adminStats.totalCourses}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                <Link href="/admin/courses">Manage</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-800 hover:border-primary-500 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold">Messages</h3>
              <p className="text-2xl font-bold text-white mt-2">12</p>
              <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                <Link href="/admin/messages">View</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{formatDate(activity.date)}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        activity.status === 'completed' ? 'border-green-500/30 text-green-400' :
                        activity.status === 'active' || activity.status === 'new' ? 'border-blue-500/30 text-blue-400' :
                        'border-gray-500/30 text-gray-400'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card className="border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Top Pages</CardTitle>
                <Button variant="outline" size="sm">
                  View Analytics
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm">{page.page}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Eye className="h-3 w-3" />
                        <span>{page.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm">{page.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}