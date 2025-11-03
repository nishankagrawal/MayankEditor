'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Calendar,
  Clock,
  User,
  Eye,
  MessageCircle,
  Share2,
  Heart,
  Bookmark,
  ArrowLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

// Mock blog post data - this would come from the database
const blogPost = {
  id: '1',
  title: '10 Essential Video Editing Tips for Beginners',
  slug: '10-essential-video-editing-tips-beginners',
  content: `# 10 Essential Video Editing Tips for Beginners

Video editing is both an art and a science. Whether you're just starting out or looking to improve your skills, these essential tips will help you create more engaging and professional videos.

## 1. Master the Basics First

Before diving into complex effects and transitions, make sure you have a solid grasp of the fundamentals:

- Understanding timeline and sequencing
- Basic cutting and trimming techniques
- Audio synchronization
- Color correction basics

## 2. Organize Your Footage

Nothing wastes more time than disorganized footage. Create a systematic approach:

- Create folders for different types of shots
- Label your clips clearly
- Use metadata to tag important moments
- Create selects sequences with best takes

## 3. Story is Everything

Technical skills are important, but storytelling is what captivates audiences:

- Start with a clear narrative structure
- Use the rule of thirds in composition
- Pay attention to pacing and rhythm
- Create emotional connections through music and timing

## 4. Audio Quality Matters More Than Video Quality

Viewers will tolerate mediocre video quality, but poor audio immediately turns them away:

- Invest in a good microphone
- Learn basic audio cleanup techniques
- Use background music appropriately
- Ensure consistent audio levels throughout

## 5. Less is More with Effects

Don't overwhelm your videos with unnecessary effects:

- Use transitions purposefully
- Avoid cheesy effects (unless intentionally comedic)
- Keep color grading natural and consistent
- Let the content shine, not the effects

## 6. Understand Color Theory

Color grading can transform the mood of your video:

- Learn basic color correction
- Understand warm vs. cool tones
- Use LUTs (Look-Up Tables) efficiently
- Maintain consistency across scenes

## 7. Master Pacing and Rhythm

Good editing has a natural flow:

- Vary shot lengths to maintain interest
- Use J-cuts and L-cuts for smoother transitions
- Pay attention to the rhythm of your cuts
- Match editing to music when appropriate

## 8. Export in the Right Format

Different platforms require different settings:

- YouTube: 1080p or 4K, H.264 codec
- Instagram: Square or vertical formats
- Vimeo: Higher quality settings
- Always keep a master file

## 9. Get Feedback Early

Don't work in isolation:

- Share rough cuts with trusted friends
- Join online video editing communities
- Be open to constructive criticism
- Learn from others' work

## 10. Keep Learning

Video editing is constantly evolving:

- Follow industry professionals
- Watch tutorials regularly
- Experiment with new techniques
- Stay updated on new software and tools

## Conclusion

Mastering video editing takes time and practice, but focusing on these fundamentals will accelerate your growth. Remember that every professional editor started as a beginner, and consistent practice is the key to improvement.

What are your favorite video editing tips? Share them in the comments below!`,
  excerpt: 'Learn the essential video editing techniques every beginner should master to create professional, engaging videos.',
  featuredImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop',
  author: {
    name: 'Mayank',
    bio: 'Professional video editor with 8+ years of experience in creating cinematic content for brands and creators.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    website: 'https://mayank-editor.vercel.app'
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
  likes: 89,
  seo: {
    metaTitle: '10 Essential Video Editing Tips for Beginners | Mayank Editor',
    metaDescription: 'Learn the fundamental video editing techniques every beginner needs to know to create professional videos.',
    keywords: ['video editing', 'beginner tips', 'video production', 'content creation']
  }
}

// Related posts
const relatedPosts = [
  {
    id: '2',
    title: 'The Future of Video Editing: AI and Automation',
    slug: 'future-of-video-editing-ai-automation',
    excerpt: 'Explore how AI is transforming video editing workflows.',
    featuredImage: 'https://images.unsplash.com/photo-1620712943543-ccfd8a0e7409?w=400&h=225&fit=crop',
    publishedAt: '2024-06-15',
    readingTime: 6
  },
  {
    id: '3',
    title: 'Color Grading Basics: A Complete Guide',
    slug: 'color-grading-basics-complete-guide',
    excerpt: 'Master color grading fundamentals with this comprehensive guide.',
    featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
    publishedAt: '2024-07-01',
    readingTime: 12
  }
]

// Comments data
const comments = [
  {
    id: '1',
    author: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Great article! These tips are really helpful for beginners. I especially appreciate the emphasis on organizing footage - that\'s something I struggled with when starting out.',
    publishedAt: '2024-06-02',
    likes: 5
  },
  {
    id: '2',
    author: 'Sarah Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b91238a6?w=100&h=100&fit=crop&crop=face',
    content: 'Thank you for sharing these tips! I\'ve been editing videos for about a year now and still found some valuable insights here. The section on color grading was particularly useful.',
    publishedAt: '2024-06-03',
    likes: 8
  }
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(blogPost.likes)
  const [newComment, setNewComment] = useState('')

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle comment submission
    console.log('Submitting comment:', newComment)
    setNewComment('')
  }

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
        {/* Back Navigation */}
        <section className="py-8 border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <Badge className="mb-6 bg-primary-500/20 text-primary-400 border-primary-500/30">
                {blogPost.category.name}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {blogPost.title}
              </h1>

              {/* Article Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={blogPost.author.avatar} />
                    <AvatarFallback>
                      {blogPost.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-medium">{blogPost.author.name}</div>
                    <div className="text-gray-400 text-sm">{blogPost.author.bio}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blogPost.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{blogPost.readingTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{blogPost.views} views</span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={blogPost.featuredImage}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Social Actions */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center space-x-2 ${isLiked ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'border-gray-700 text-gray-300'}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likeCount}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center space-x-2 ${isBookmarked ? 'bg-primary-500/10 border-primary-500/30 text-primary-400' : 'border-gray-700 text-gray-300'}`}
                    onClick={handleBookmark}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span>Save</span>
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>

                <div className="text-gray-400 text-sm">
                  {blogPost.comments} comments
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {blogPost.tags.map((tag) => (
                  <Badge key={tag.slug} variant="secondary" className="text-sm">
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  className="prose-headings:text-white prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-300 prose-strong:text-white prose-a:text-primary-400 prose-code:text-primary-400 prose-blockquote:border-gray-700 prose-blockquote:text-gray-300 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-pre:bg-gray-800 prose-code:bg-gray-800"
                >
                  {blogPost.content}
                </ReactMarkdown>
              </article>

              {/* Author Bio */}
              <Separator className="my-12 border-gray-800" />
              <Card className="border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={blogPost.author.avatar} />
                      <AvatarFallback>
                        {blogPost.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        About {blogPost.author.name}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {blogPost.author.bio}
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/about">
                            View Profile
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={blogPost.author.website} target="_blank">
                            Website
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-12 bg-dark-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Comments ({comments.length})</h2>

              {/* Comment Form */}
              <Card className="border-gray-800 mb-8">
                <CardContent className="p-6">
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Leave a Comment
                      </label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Share your thoughts..."
                        required
                      />
                    </div>
                    <Button type="submit">
                      Post Comment
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>
                        {comment.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{comment.author}</h4>
                        <span className="text-gray-400 text-sm">
                          {formatDate(comment.publishedAt)}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Heart className="h-4 w-4 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Card key={post.id} className="group cursor-pointer border-gray-800 hover:border-primary-500 transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="text-gray-600">•</span>
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime} min read</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-primary-400 hover:text-primary-300">
                          Read More
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Enjoyed This Article?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get more video editing tips and tutorials delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button size="lg" variant="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}