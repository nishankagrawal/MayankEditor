import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { siteConfig } from '@/config/site'

export async function GET() {
  try {
    // Get all published content
    const [projects, blogPosts, courses] = await Promise.all([
      prisma.project.findMany({
        where: { published: true },
        select: {
          slug: true,
          updatedAt: true
        }
      }),
      prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          slug: true,
          updatedAt: true
        }
      }),
      prisma.course.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          slug: true,
          updatedAt: true
        }
      })
    ])

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${projects.map(project => `
    <url>
      <loc>${siteUrl}/projects/${project.slug}</loc>
      <lastmod>${new Date(project.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')}
  ${blogPosts.map(post => `
    <url>
      <loc>${siteUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('')}
  ${courses.map(course => `
    <url>
      <loc>${siteUrl}/courses/${course.slug}</loc>
      <lastmod>${new Date(course.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `).join('')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    )
  }
}