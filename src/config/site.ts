export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    email: string
    github: string
    linkedin: string
    twitter: string
    instagram: string
    youtube: string
  }
  author: {
    name: string
    email: string
    url: string
    twitter: string
  }
  keywords: string[]
  verification: {
    google: string
    yandex: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'Mayank — Cinematic Video Editor',
  description: 'Professional video editing services for brands, creators, and businesses. Specializing in cinematic content, promotional videos, and post-production excellence.',
  url: 'https://mayank-editor.vercel.app',
  ogImage: '/images/og-image.jpg',
  links: {
    email: 'contact@mayank.com',
    github: 'https://github.com/mayank',
    linkedin: 'https://linkedin.com/in/mayank',
    twitter: 'https://twitter.com/mayank',
    instagram: 'https://instagram.com/mayank',
    youtube: 'https://youtube.com/@mayank',
  },
  author: {
    name: 'Mayank',
    email: 'contact@mayank.com',
    url: 'https://mayank-editor.vercel.app',
    twitter: '@mayank',
  },
  keywords: [
    'video editor',
    'cinematic editing',
    'post production',
    'video production',
    'content creator',
    'freelance editor',
    'promotional videos',
    'brand videos',
    'youtube editing',
    'social media videos',
    'wedding films',
    'corporate videos',
    'video marketing',
    'visual storytelling',
  ],
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export type NavItem = {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export const mainNav: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'Services', href: '/services' },
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
  { title: 'Courses', href: '/courses' },
  { title: 'Contact', href: '/contact' },
]

export const sidebarNav: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Profile', href: '/dashboard/profile' },
  { title: 'My Courses', href: '/dashboard/courses' },
  { title: 'Orders', href: '/dashboard/orders' },
  { title: 'Bookings', href: '/dashboard/bookings' },
]

export const adminNav: NavItem[] = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Projects', href: '/admin/projects' },
  { title: 'Blog Posts', href: '/admin/blog' },
  { title: 'Courses', href: '/admin/courses' },
  { title: 'Orders', href: '/admin/orders' },
  { title: 'Users', href: '/admin/users' },
  { title: 'Analytics', href: '/admin/analytics' },
  { title: 'Settings', href: '/admin/settings' },
]