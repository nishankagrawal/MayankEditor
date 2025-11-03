import { PrismaClient, Role, PostStatus, CourseStatus, Difficulty, OrderStatus, CouponType, BookingStatus, MessageStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clean up existing data
  await prisma.analytics.deleteMany()
  await prisma.newsletter.deleteMany()
  await prisma.contactMessage.deleteMany()
  await prisma.siteSettings.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.review.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.lessonProgress.deleteMany()
  await prisma.courseProgress.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.courseTag.deleteMany()
  await prisma.course.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.blogPostTag.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.projectTag.deleteMany()
  await prisma.project.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.category.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  console.log('👥 Creating users...')
  const adminUser = await prisma.user.create({
    data: {
      name: 'Mayank',
      email: 'admin@mayank.com',
      role: Role.ADMIN,
      bio: 'Professional video editor with 8+ years of experience in creating cinematic content for brands and creators.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      website: 'https://mayank-editor.vercel.app',
      location: 'Mumbai, India',
      socialLinks: {
        twitter: 'https://twitter.com/mayank',
        linkedin: 'https://linkedin.com/in/mayank',
        github: 'https://github.com/mayank',
        instagram: 'https://instagram.com/mayank',
        youtube: 'https://youtube.com/@mayank'
      }
    }
  })

  const testUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      role: Role.USER,
      bio: 'Content creator and YouTuber',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  })

  // Create categories
  console.log('📁 Creating categories...')
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Commercial',
        slug: 'commercial',
        description: 'Commercial video projects for brands and businesses',
        color: '#3B82F6',
        icon: 'briefcase'
      }
    }),
    prisma.category.create({
      data: {
        name: 'YouTube',
        slug: 'youtube',
        description: 'YouTube content and series',
        color: '#EF4444',
        icon: 'play-circle'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Wedding',
        slug: 'wedding',
        description: 'Wedding films and highlight reels',
        color: '#EC4899',
        icon: 'heart'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Documentary',
        slug: 'documentary',
        description: 'Documentary and narrative films',
        color: '#8B5CF6',
        icon: 'film'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Tutorial',
        slug: 'tutorial',
        description: 'Video tutorials and educational content',
        color: '#10B981',
        icon: 'graduation-cap'
      }
    })
  ])

  // Create tags
  console.log('🏷️  Creating tags...')
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Color Grading', slug: 'color-grading', color: '#F59E0B' } }),
    prisma.tag.create({ data: { name: 'Motion Graphics', slug: 'motion-graphics', color: '#8B5CF6' } }),
    prisma.tag.create({ data: { name: 'Sound Design', slug: 'sound-design', color: '#10B981' } }),
    prisma.tag.create({ data: { name: '4K Editing', slug: '4k-editing', color: '#3B82F6' } }),
    prisma.tag.create({ data: { name: 'Cinematic', slug: 'cinematic', color: '#EF4444' } }),
    prisma.tag.create({ data: { name: 'Corporate', slug: 'corporate', color: '#6B7280' } }),
    prisma.tag.create({ data: { name: 'Social Media', slug: 'social-media', color: '#EC4899' } }),
    prisma.tag.create({ data: { name: 'Documentary', slug: 'documentary-tag', color: '#14B8A6' } })
  ])

  // Create services
  console.log('💼 Creating services...')
  await Promise.all([
    prisma.service.create({
      data: {
        title: 'Short Commercial Ads',
        slug: 'short-commercial-ads',
        description: 'Professional 30-60 second commercial ads for social media and television. Perfect for product launches and brand awareness campaigns.',
        price: 1500,
        duration: '3-5 days',
        features: [
          'Professional script writing',
          'High-quality 4K footage',
          'Color grading and correction',
          'Background music and sound effects',
          'Multiple format delivery',
          '2 rounds of revisions'
        ],
        popular: true
      }
    }),
    prisma.service.create({
      data: {
        title: 'YouTube Video Editing',
        slug: 'youtube-video-editing',
        description: 'Complete YouTube video editing service including intros, outros, thumbnails, and optimization.',
        price: 300,
        duration: '2-3 days',
        features: [
          'Full video editing',
          'Custom thumbnails',
          'Intro and outro',
          'SEO optimization',
          'Caption files',
          'Unlimited revisions'
        ]
      }
    }),
    prisma.service.create({
      data: {
        title: 'Wedding Films',
        slug: 'wedding-films',
        description: 'Cinematic wedding films that capture your special day in the most beautiful way.',
        price: 2500,
        duration: '7-10 days',
        features: [
          'Cinematic highlight reel (3-5 mins)',
          'Full ceremony coverage',
          'Drone footage (if available)',
          'Professional color grading',
          'Original score composition',
          'USB delivery in custom box'
        ]
      }
    }),
    prisma.service.create({
      data: {
        title: 'Corporate Videos',
        slug: 'corporate-videos',
        description: 'Professional corporate videos for training, marketing, and internal communications.',
        price: 2000,
        duration: '5-7 days',
        features: [
          'Script development',
          'Professional filming',
          'Motion graphics',
          'Brand integration',
          'Multiple language subtitles',
          '3 rounds of revisions'
        ]
      }
    })
  ])

  // Create projects
  console.log('🎬 Creating projects...')
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Nike - "Just Do It" Campaign',
        slug: 'nike-just-do-it-campaign',
        description: 'A high-energy commercial campaign for Nike featuring dynamic athletic footage and motivational messaging.',
        content: '# Nike "Just Do It" Campaign\n\nThis project involved creating a series of high-impact commercials for Nike\'s latest "Just Do It" campaign. The challenge was to capture the raw determination and athletic excellence that Nike represents.\n\n## The Vision\n\nThe client wanted to create content that would resonate with both professional athletes and everyday fitness enthusiasts. We focused on authentic moments of athletic achievement and the mental fortitude required to push beyond limits.\n\n## Technical Approach\n\n- Shot on ARRI Alexa Mini LF\n- Color graded using DaVinci Resolve\n- Motion graphics in After Effects\n- Sound design in Pro Tools\n\n## Results\n\nThe campaign generated over 50 million views across social platforms and contributed to a 15% increase in engagement for Nike\'s digital channels.',
        excerpt: 'High-energy commercial campaign featuring dynamic athletic footage and motivational messaging.',
        clientName: 'Nike',
        clientUrl: 'https://nike.com',
        projectDate: new Date('2024-01-15'),
        featured: true,
        published: true,
        videoUrl: 'https://example.com/nike-campaign.mp4',
        videoThumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=450&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop',
        tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Pro Tools'],
        deliverables: '3x 30-second commercials, 6x social media cuts, behind-the-scenes footage',
        caseStudyUrl: '/case-studies/nike-campaign',
        metaTitle: 'Nike "Just Do It" Campaign - Mayank Video Editor',
        metaDescription: 'High-energy commercial campaign for Nike featuring dynamic athletic footage and professional video editing.',
        authorId: adminUser.id,
        categoryId: categories[0].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Tech Startup - Product Launch Video',
        slug: 'tech-startup-product-launch',
        description: 'Sleek and modern product launch video for a tech startup featuring clean animations and professional messaging.',
        content: '# Tech Startup Product Launch\n\nCreated a comprehensive product launch video package for a Silicon Valley tech startup unveiling their new SaaS platform.',
        excerpt: 'Sleek product launch video with clean animations and professional messaging.',
        clientName: 'TechCorp Solutions',
        projectDate: new Date('2024-02-20'),
        featured: true,
        published: true,
        videoUrl: 'https://example.com/tech-launch.mp4',
        videoThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
        tools: ['After Effects', 'Cinema 4D', 'Premiere Pro', 'Audition'],
        deliverables: '2-minute launch video, 30-second teaser, social media clips',
        authorId: adminUser.id,
        categoryId: categories[0].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Travel Vlogger - YouTube Series',
        slug: 'travel-vlogger-youtube-series',
        description: 'Complete YouTube series editing for a travel vlogger exploring Asian destinations.',
        content: '# Travel Vlogger YouTube Series\n\nEdited a complete 12-episode YouTube series following a travel vlogger through Southeast Asia.',
        excerpt: 'Complete YouTube series editing for travel content creator.',
        clientName: 'Wanderlust Adventures',
        clientUrl: 'https://youtube.com/wanderlust',
        projectDate: new Date('2024-03-10'),
        featured: false,
        published: true,
        videoUrl: 'https://example.com/travel-series.mp4',
        videoThumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=450&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=600&fit=crop',
        tools: ['Premiere Pro', 'Audition', 'Motion', 'Final Cut Pro'],
        deliverables: '12x 20-minute episodes, thumbnails, captions',
        authorId: adminUser.id,
        categoryId: categories[1].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Luxury Wedding - Sarah & Michael',
        slug: 'luxury-wedding-sarah-michael',
        description: 'Elegant wedding film capturing the beautiful union of Sarah and Michael at a luxury venue.',
        content: '# Luxury Wedding Film\n\nA breathtaking wedding film that captures every precious moment of Sarah and Michael\'s special day.',
        excerpt: 'Elegant wedding film with cinematic storytelling and emotional moments.',
        clientName: 'Sarah & Michael',
        projectDate: new Date('2024-04-05'),
        featured: true,
        published: true,
        videoUrl: 'https://example.com/wedding-film.mp4',
        videoThumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop',
        tools: ['DaVinci Resolve', 'Premiere Pro', 'Audition', 'Logic Pro X'],
        deliverables: '5-minute highlight film, 20-minute documentary, drone footage',
        authorId: adminUser.id,
        categoryId: categories[2].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Environmental Documentary',
        slug: 'environmental-documentary',
        description: 'Powerful documentary highlighting climate change effects on coastal communities.',
        content: '# Environmental Documentary\n\nA compelling documentary exploring the real impacts of climate change on coastal communities.',
        excerpt: 'Documentary film about climate change effects on coastal communities.',
        clientName: 'Green Planet Foundation',
        clientUrl: 'https://greenplanet.org',
        projectDate: new Date('2024-05-12'),
        featured: false,
        published: true,
        videoUrl: 'https://example.com/climate-doc.mp4',
        videoThumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=450&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=600&fit=crop',
        tools: ['Premiere Pro', 'DaVinci Resolve', 'Pro Tools', 'Frame.io'],
        deliverables: '45-minute documentary, trailer, social media content',
        authorId: adminUser.id,
        categoryId: categories[3].id
      }
    }),
    prisma.project.create({
      data: {
        title: 'Cooking Tutorial Series',
        slug: 'cooking-tutorial-series',
        description: 'Professional cooking tutorial series with multiple camera angles and clear instructions.',
        content: '# Cooking Tutorial Series\n\nA complete cooking tutorial series featuring professional chefs and recipes from around the world.',
        excerpt: 'Professional cooking tutorials with multiple angles and clear instructions.',
        clientName: 'Chef\'s Table Academy',
        clientUrl: 'https://chefstable.com',
        projectDate: new Date('2024-06-18'),
        featured: false,
        published: true,
        videoUrl: 'https://example.com/cooking-tutorial.mp4',
        videoThumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=450&fit=crop',
        heroImage: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=600&fit=crop',
        tools: ['Premiere Pro', 'Audition', 'Motion', 'Final Cut Pro'],
        deliverables: '20x 15-minute episodes, recipe cards, behind-the-scenes',
        authorId: adminUser.id,
        categoryId: categories[4].id
      }
    })
  ])

  // Add project tags
  console.log('🏷️  Adding project tags...')
  await Promise.all([
    // Nike project tags
    prisma.projectTag.create({ data: { projectId: projects[0].id, tagId: tags[0].id } }), // Color Grading
    prisma.projectTag.create({ data: { projectId: projects[0].id, tagId: tags[1].id } }), // Motion Graphics
    prisma.projectTag.create({ data: { projectId: projects[0].id, tagId: tags[2].id } }), // Sound Design
    prisma.projectTag.create({ data: { projectId: projects[0].id, tagId: tags[3].id } }), // 4K Editing
    prisma.projectTag.create({ data: { projectId: projects[0].id, tagId: tags[4].id } }), // Cinematic
    prisma.projectTag.create({ data: { projectId: projects[0].id, tagId: tags[5].id } }), // Corporate

    // Tech project tags
    prisma.projectTag.create({ data: { projectId: projects[1].id, tagId: tags[1].id } }), // Motion Graphics
    prisma.projectTag.create({ data: { projectId: projects[1].id, tagId: tags[3].id } }), // 4K Editing
    prisma.projectTag.create({ data: { projectId: projects[1].id, tagId: tags[5].id } }), // Corporate

    // YouTube project tags
    prisma.projectTag.create({ data: { projectId: projects[2].id, tagId: tags[0].id } }), // Color Grading
    prisma.projectTag.create({ data: { projectId: projects[2].id, tagId: tags[6].id } }), // Social Media

    // Wedding project tags
    prisma.projectTag.create({ data: { projectId: projects[3].id, tagId: tags[0].id } }), // Color Grading
    prisma.projectTag.create({ data: { projectId: projects[3].id, tagId: tags[2].id } }), // Sound Design
    prisma.projectTag.create({ data: { projectId: projects[3].id, tagId: tags[3].id } }), // 4K Editing
    prisma.projectTag.create({ data: { projectId: projects[3].id, tagId: tags[4].id } }), // Cinematic

    // Documentary project tags
    prisma.projectTag.create({ data: { projectId: projects[4].id, tagId: tags[0].id } }), // Color Grading
    prisma.projectTag.create({ data: { projectId: projects[4].id, tagId: tags[2].id } }), // Sound Design
    prisma.projectTag.create({ data: { projectId: projects[4].id, tagId: tags[3].id } }), // 4K Editing
    prisma.projectTag.create({ data: { projectId: projects[4].id, tagId: tags[7].id } }), // Documentary

    // Tutorial project tags
    prisma.projectTag.create({ data: { projectId: projects[5].id, tagId: tags[0].id } }), // Color Grading
    prisma.projectTag.create({ data: { projectId: projects[5].id, tagId: tags[6].id } }), // Social Media
  ])

  // Create testimonials
  console.log('💬 Creating testimonials...')
  await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Jessica Martinez',
        role: 'Marketing Director',
        company: 'Nike',
        content: 'Working with Mayank was an absolute game-changer for our campaign. His attention to detail and creative vision elevated our brand messaging to new heights. The final videos exceeded our expectations and drove incredible engagement.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b91238a6?w=150&h=150&fit=crop&crop=face',
        featured: true,
        published: true,
        projectId: projects[0].id,
        authorId: adminUser.id
      }
    }),
    prisma.testimonial.create({
      data: {
        name: 'David Chen',
        role: 'CEO',
        company: 'TechCorp Solutions',
        content: 'Mayank transformed our complex product into a compelling story that resonated with our target audience. The video quality and production value were outstanding. Highly recommended!',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        featured: true,
        published: true,
        projectId: projects[1].id,
        authorId: adminUser.id
      }
    }),
    prisma.testimonial.create({
      data: {
        name: 'Sarah Thompson',
        role: 'Content Creator',
        company: 'Wanderlust Adventures',
        content: 'Mayank has been editing our travel vlogs for over a year now, and the quality consistently amazes our audience. He understands our brand perfectly and delivers episodes that our viewers love.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        featured: false,
        published: true,
        projectId: projects[2].id,
        authorId: adminUser.id
      }
    }),
    prisma.testimonial.create({
      data: {
        name: 'Michael Roberts',
        role: 'Groom',
        company: '',
        content: 'Mayank captured our wedding day perfectly. The film is so beautiful and emotional - we watch it all the time! He was professional, unobtrusive, and truly talented.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        featured: true,
        published: true,
        projectId: projects[3].id,
        authorId: adminUser.id
      }
    })
  ])

  // Create blog posts
  console.log('📝 Creating blog posts...')
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
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
        featuredImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
        readingTime: 8,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2024-06-01'),
        metaTitle: '10 Essential Video Editing Tips for Beginners | Mayank Editor',
        metaDescription: 'Learn the fundamental video editing techniques every beginner needs to know to create professional videos.',
        authorId: adminUser.id,
        categoryId: categories[4].id
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'The Future of Video Editing: AI and Automation',
        slug: 'future-of-video-editing-ai-automation',
        content: `# The Future of Video Editing: AI and Automation

The world of video editing is undergoing a massive transformation, driven by artificial intelligence and automation technologies. What once took hours of manual work can now be accomplished in minutes with AI-powered tools.

## AI-Powered Editing Tools

### Auto-Editing Features
Modern editing software now includes AI features that can:
- Automatically select the best shots
- Sync audio with multiple camera angles
- Generate rough cuts based on scripts
- Suggest optimal pacing and transitions

### Intelligent Color Grading
AI is revolutionizing color correction by:
- Analyzing footage for consistent color matching
- Suggesting cinematic color grades
- Automatically correcting white balance and exposure
- Creating professional looks with minimal manual adjustment

## Automation in Workflow

### Template-Based Editing
Pre-built templates and automation tools help editors:
- Create consistent branding across projects
- Generate social media clips automatically
- Apply uniform transitions and effects
- Maintain visual coherence

### Metadata-Driven Editing
Smart use of metadata enables:
- Automatic organization of footage
- Quick searching and filtering of clips
- AI-based content analysis and tagging
- Automated highlight reel generation

## The Human Touch Remains Essential

While AI tools are impressive, they cannot replace human creativity and storytelling ability. The best editors of the future will be those who:

- Use AI as a tool to enhance their creativity
- Focus on storytelling and emotional impact
- Make creative decisions that algorithms cannot
- Adapt to new technologies while maintaining artistic vision

## Preparing for the Future

To stay relevant in the evolving landscape:

1. **Embrace AI tools** while maintaining your creative vision
2. **Focus on storytelling** over technical skills alone
3. **Stay updated** with new technologies and techniques
4. **Develop your unique style** that sets you apart
5. **Build strong client relationships** based on trust and results

## Conclusion

The future of video editing is not about replacing humans with machines, but about empowering creators with smarter tools. Those who learn to balance technology with creativity will thrive in this new era.

What are your thoughts on AI in video editing? Share your experiences in the comments!`,
        excerpt: 'Explore how AI and automation are transforming video editing workflows and what it means for the future of content creation.',
        featuredImage: 'https://images.unsplash.com/photo-1620712943543-ccfd8a0e7409?w=800&h=400&fit=crop',
        readingTime: 6,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2024-06-15'),
        metaTitle: 'The Future of Video Editing: AI and Automation | Mayank Editor',
        metaDescription: 'Discover how artificial intelligence is transforming video editing and what it means for content creators.',
        authorId: adminUser.id,
        categoryId: categories[4].id
      }
    }),
    prisma.blogPost.create({
      data: {
        title: 'Color Grading Basics: A Complete Guide',
        slug: 'color-grading-basics-complete-guide',
        content: `# Color Grading Basics: A Complete Guide

Color grading is one of the most powerful tools in a video editor's arsenal. It can transform the mood, enhance storytelling, and give your videos a professional, cinematic look.

## Understanding Color Theory

### The Color Wheel
Understanding basic color relationships is crucial:
- **Complementary colors**: Opposite on the color wheel (red/green, blue/orange)
- **Analogous colors**: Adjacent on the color wheel (blue, blue-green, green)
- **Triadic colors**: Three colors evenly spaced on the wheel

### Psychological Impact of Colors
Different colors evoke different emotions:
- **Warm colors** (red, orange, yellow): Energy, passion, happiness
- **Cool colors** (blue, green, purple): Calm, professional, mysterious
- **Monochromatic**: Sophisticated, elegant, focused

## Essential Color Grading Tools

### Primary Color Corrections
These adjust the overall image:
- **Exposure**: Overall brightness
- **Contrast**: Difference between light and dark areas
- **Highlights**: Brightest areas of the image
- **Shadows**: Darkest areas of the image
- **Whites**: Pure white points
- **Blacks**: Pure black points

### Secondary Color Corrections
These target specific colors or areas:
- **Saturation**: Intensity of colors
- **Hue**: Actual color values
- **Luminance**: Brightness of specific colors
- **Masking**: Isolating specific areas for adjustment

## Color Grading Workflow

### 1. Technical Correction First
Before creative grading:
- Fix exposure and white balance issues
- Ensure proper contrast levels
- Correct any color casts from lighting
- Check skin tones for natural appearance

### 2. Establish Your Look
Define the visual style:
- Decide on the overall mood and tone
- Create a consistent color palette
- Consider the story and emotional impact
- Reference films or videos with similar styles

### 3. Apply Creative Adjustments
Enhance the visual storytelling:
- Add color tints for mood
- Create contrast with complementary colors
- Use vignettes to focus attention
- Apply film grain or texture if desired

### 4. Consistency Check
Ensure coherence throughout:
- Match colors across different shots
- Check consistency in different lighting conditions
- Verify skin tones remain natural
- Test on various displays

## Practical Tips and Techniques

### Start with Good Footage
Remember: "Garbage in, garbage out"
- Shoot in flat picture profiles when possible
- Use proper lighting techniques
- Expose for highlights in digital video
- Shoot in LOG format for maximum flexibility

### Use Scopes and Tools
Don't trust your eyes alone:
- **Waveform monitor**: Check exposure levels
- **Vectorscope**: Analyze color information
- **Histogram**: Understand tonal distribution
- **False color**: Identify exposure issues

### Common Color Grades and Their Uses

#### Teal and Orange
- Popular in Hollywood blockbusters
- Complementary colors create contrast
- Skin tones naturally lean orange
- Blues create depth and atmosphere

#### S-Curve Contrast
- Increases mid-tone contrast
- Creates depth and dimension
- Maintains detail in highlights and shadows
- Professional, cinematic look

#### Cross-Processing
- Inspired by film photography techniques
- Creates unique color shifts
- High contrast, stylized appearance
- Great for music videos and commercials

## Software and Tools

### Professional Options
- **DaVinci Resolve**: Industry standard for color grading
- **Adobe Premiere Pro**: Lumetri Color panel
- **Final Cut Pro**: Color board and effects
- **Avid Media Composer**: Advanced color tools

### Budget-Friendly Alternatives
- **DaVinci Resolve Free**: Powerful free version
- **Final Cut Pro X**: One-time purchase
- **Adobe Premiere Elements**: Simplified interface
- **HitFilm Express**: Free with pro features

## Learning Resources

### Online Courses
- **LinkedIn Learning**: Comprehensive color grading courses
- **Skillshare**: Project-based learning
- **Udemy**: Structured video tutorials
- **YouTube**: Free tutorials from professionals

### Practice Projects
- Color grade short clips daily
- Recreate looks from favorite films
- Work with different footage types
- Build a portfolio of various styles

## Common Mistakes to Avoid

### Technical Errors
- Over-saturation that creates clipping
- Inconsistent skin tones across shots
- Crushing blacks or blowing out highlights
- Ignoring color theory fundamentals

### Creative Pitfalls
- Following trends without purpose
- Over-grading that looks unnatural
- Ignoring the story's emotional needs
- Not considering the target platform

## Conclusion

Color grading is both technical and creative. Master the fundamentals first, then develop your unique style. Remember that the best color grading serves the story, not overwhelms it.

Keep practicing, studying professional work, and developing your eye. The most important tool in color grading is your judgment and taste.

What are your favorite color grading techniques? Share your tips and experiences in the comments!`,
        excerpt: 'Master the fundamentals of color grading with this comprehensive guide covering theory, tools, and practical techniques.',
        featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
        readingTime: 12,
        status: PostStatus.PUBLISHED,
        publishedAt: new Date('2024-07-01'),
        metaTitle: 'Color Grading Basics: A Complete Guide | Mayank Editor',
        metaDescription: 'Learn color grading fundamentals, tools, and techniques to give your videos a professional, cinematic look.',
        authorId: adminUser.id,
        categoryId: categories[4].id
      }
    })
  ])

  // Add blog post tags
  console.log('🏷️  Adding blog post tags...')
  await Promise.all([
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[0].id, tagId: tags[0].id } }), // Color Grading
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[0].id, tagId: tags[1].id } }), // Motion Graphics
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[0].id, tagId: tags[3].id } }), // 4K Editing
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[0].id, tagId: tags[6].id } }), // Social Media

    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[1].id, tagId: tags[1].id } }), // Motion Graphics
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[1].id, tagId: tags[5].id } }), // Corporate
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[1].id, tagId: tags[6].id } }), // Social Media

    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[2].id, tagId: tags[0].id } }), // Color Grading
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[2].id, tagId: tags[3].id } }), // 4K Editing
    prisma.blogPostTag.create({ data: { blogPostId: blogPosts[2].id, tagId: tags[4].id } }), // Cinematic
  ])

  // Create courses
  console.log('📚 Creating courses...')
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Complete Video Editing Masterclass',
        slug: 'complete-video-editing-masterclass',
        description: `Master the art of video editing from beginner to professional with this comprehensive course covering everything from basic cuts to advanced color grading and motion graphics.

## What You'll Learn

This course is designed to take you from complete beginner to professional video editor. You'll learn:

- **Foundational Skills**: Timeline management, cutting techniques, audio synchronization
- **Creative Editing**: Pacing, rhythm, storytelling through editing
- **Technical Excellence**: Color correction, audio mixing, export settings
- **Advanced Techniques**: Motion graphics, visual effects, workflow optimization
- **Professional Workflow**: Client management, project organization, delivery standards

## Course Structure

The course is divided into 8 comprehensive modules with over 50 video lessons, practical projects, and downloadable resources.

### Module 1: Getting Started
- Understanding editing software interfaces
- Setting up your editing workspace
- Basic file organization and project management
- Understanding video formats and codecs

### Module 2: Basic Editing Techniques
- Importing and organizing footage
- Basic cutting and trimming
- Working with multiple camera angles
- Audio synchronization basics

### Module 3: Creative Editing
- Understanding pacing and rhythm
- J-cuts and L-cuts for smooth transitions
- Building tension and release
- Montage and sequence construction

### Module 4: Audio Excellence
- Audio mixing fundamentals
- Working with music and sound effects
- Noise reduction and cleanup
- Audio automation and keyframes

### Module 5: Color Correction and Grading
- Understanding color theory
- Primary color correction techniques
- Secondary color adjustments
- Creating cinematic color grades

### Module 6: Motion Graphics
- Working with text and typography
- Basic animation principles
- Creating lower thirds and titles
- Logo animation techniques

### Module 7: Professional Workflow
- Client communication and project management
- Export settings for different platforms
- Quality control and delivery standards
- Building your editing portfolio

### Module 8: Business and Career
- Finding clients and building relationships
- Pricing your services
- Marketing your editing business
- Scaling your operations

## Prerequisites

- Basic computer skills
- A computer capable of running video editing software
- Passion for storytelling and visual creativity

## Software Used

While the principles apply to any editing software, demonstrations use:
- Adobe Premiere Pro (primary)
- DaVinci Resolve (color grading)
- Adobe After Effects (motion graphics)

## What's Included

- 50+ video lessons (15+ hours of content)
- Downloadable project files and footage
- Practice exercises and assignments
- Private community access
- Certificate of completion
- Lifetime access to all materials

## Who This Course Is For

- Aspiring video editors
- YouTubers wanting to improve their content
- Marketing professionals
- Film students
- Anyone wanting to tell stories through video

## Course Outcome

By the end of this course, you'll be able to:
- Edit professional-quality videos
- Create compelling stories through editing
- Work efficiently with clients
- Build a portfolio that attracts work
- Start or advance your video editing career`,
        excerpt: 'Complete video editing course from beginner to professional, covering cutting, color grading, motion graphics, and business skills.',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
        price: 199,
        comparePrice: 399,
        currency: 'USD',
        status: CourseStatus.PUBLISHED,
        featured: true,
        publishedAt: new Date('2024-06-01'),
        difficulty: Difficulty.BEGINNER,
        duration: 1200, // 20 hours in minutes
        language: 'en',
        requirements: [
          'Basic computer skills',
          'Video editing software (Adobe Premiere Pro recommended)',
          'Passion for storytelling and creativity'
        ],
        objectives: [
          'Master professional video editing techniques',
          'Create compelling visual stories',
          'Develop efficient editing workflows',
          'Build a professional portfolio',
          'Start or advance a video editing career'
        ],
        metaTitle: 'Complete Video Editing Masterclass | Mayank Editor',
        metaDescription: 'Learn video editing from beginner to pro with this comprehensive course covering cutting, color grading, motion graphics, and business skills.',
        instructorId: adminUser.id,
        categoryId: categories[4].id
      }
    }),
    prisma.course.create({
      data: {
        title: 'Advanced Color Grading Techniques',
        slug: 'advanced-color-grading-techniques',
        description: `Master the art of cinematic color grading with this advanced course covering professional techniques, industry tools, and creative approaches used in Hollywood productions.

## Course Overview

This advanced color grading course is designed for editors who want to take their color work to professional levels. You'll learn the techniques used in feature films, commercials, and high-end productions.

## What You'll Master

### Technical Excellence
- Advanced color theory and its practical applications
- Professional workflows using DaVinci Resolve Studio
- Color space management and HDR workflows
- Technical aspects of color science

### Creative Techniques
- Creating cinematic looks from scratch
- Mood and emotion through color
- Period and genre-specific color grading
- Creative use of color in storytelling

### Industry Standards
- Working with RAW footage
- Color grading for different delivery platforms
- Collaboration workflows with directors and cinematographers
- Quality control and standards

## Course Modules

### Module 1: Advanced Color Theory
- Color psychology in film
- Advanced color relationships
- Cultural considerations in color
- Color in narrative storytelling

### Module 2: Technical Mastery
- Color spaces and gamma curves
- RAW workflow and color management
- HDR and Dolby Vision grading
- Technical quality control

### Module 3: Creative Techniques
- Creating signature looks
- Emulative grading (film stocks, vintage looks)
- Stylized and artistic grading
- Color grading for different genres

### Module 4: Professional Workflow
- Client collaboration and feedback
- Version control and project organization
- Delivery specifications for different platforms
- Building efficient grading workflows

## Prerequisites

- Solid understanding of basic video editing
- Familiarity with color correction basics
- Access to DaVinci Resolve (Studio version recommended)
- Understanding of video formats and codecs

## Tools and Software

- **Primary**: DaVinci Resolve Studio
- **Secondary**: Adobe Premiere Pro Lumetri
- **Reference**: Adobe SpeedGrade
- **Utilities**: Various color grading plugins and tools

## What's Included

- 40+ in-depth video lessons
- Professional RAW footage for practice
- Downloadable LUTs and presets
- Color grading project files
- Industry standard resources
- Direct instructor feedback
- Certificate of completion

## Who Should Take This Course

- Professional video editors
- Colorists wanting to advance their skills
- Cinematographers and DPs
- Post-production supervisors
- Film students and enthusiasts

## Career Benefits

- Qualify for professional color grading work
- Command higher rates for specialized skills
- Work on higher-budget productions
- Expand your service offerings
- Join the elite community of professional colorists`,
        excerpt: 'Advanced color grading course teaching professional cinematic techniques using DaVinci Resolve and industry-standard workflows.',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
        price: 0,
        currency: 'USD',
        status: CourseStatus.PUBLISHED,
        featured: false,
        publishedAt: new Date('2024-07-01'),
        difficulty: Difficulty.ADVANCED,
        duration: 900, // 15 hours in minutes
        language: 'en',
        requirements: [
          'Strong video editing foundation',
          'Experience with basic color correction',
          'DaVinci Resolve Studio (recommended)',
          'Understanding of technical video concepts'
        ],
        objectives: [
          'Master professional color grading workflows',
          'Create cinematic color grades',
          'Work with RAW footage professionally',
          'Understand advanced color theory',
          'Build a professional color grading portfolio'
        ],
        metaTitle: 'Advanced Color Grading Techniques - Free Course | Mayank Editor',
        metaDescription: 'Free advanced course on professional cinematic color grading techniques using DaVinci Resolve and industry workflows.',
        instructorId: adminUser.id,
        categoryId: categories[4].id
      }
    })
  ])

  // Create lessons for courses
  console.log('📖 Creating lessons...')

  // Lessons for Complete Video Editing Masterclass
  const masterclassLessons = [
    {
      title: 'Course Introduction and Welcome',
      description: 'Introduction to the course, what you\'ll learn, and how to get the most out of this masterclass.',
      duration: 480, // 8 minutes
      order: 1,
      isPreview: true,
      content: 'Welcome to the Complete Video Editing Masterclass! In this introductory lesson, we\'ll cover what you can expect to learn, the course structure, and how to set yourself up for success.'
    },
    {
      title: 'Setting Up Your Editing Workspace',
      description: 'Learn how to set up an efficient editing workspace for maximum productivity.',
      duration: 720, // 12 minutes
      order: 2,
      isPreview: true,
      content: 'A well-organized workspace is crucial for efficient editing. This lesson covers setting up your monitors, organizing panels, and creating custom workspaces.'
    },
    {
      title: 'Understanding Video Formats and Codecs',
      description: 'Essential knowledge about video formats, codecs, and how they affect your editing workflow.',
      duration: 900, // 15 minutes
      order: 3,
      isPreview: false,
      content: 'Understanding video formats and codecs is fundamental to professional editing. We\'ll cover H.264, ProRes, DNxHD, and when to use each format.'
    },
    {
      title: 'Basic Cutting and Trimming Techniques',
      description: 'Master the fundamental editing techniques that form the foundation of all video editing.',
      duration: 1200, // 20 minutes
      order: 4,
      isPreview: false,
      content: 'Learn the essential cutting and trimming techniques used by professional editors, including ripple edits, roll edits, and slip/slide edits.'
    },
    {
      title: 'Working with Multiple Camera Angles',
      description: 'Techniques for syncing and editing multi-camera footage like a professional.',
      duration: 1080, // 18 minutes
      order: 5,
      isPreview: false,
      content: 'Multi-camera editing is a crucial skill for events, interviews, and music videos. Learn sync methods, angle switching, and professional workflows.'
    }
  ]

  for (const lessonData of masterclassLessons) {
    await prisma.lesson.create({
      data: {
        ...lessonData,
        courseId: courses[0].id
      }
    })
  }

  // Lessons for Advanced Color Grading
  const colorGradingLessons = [
    {
      title: 'Advanced Color Theory for Editors',
      description: 'Deep dive into color theory and its psychological impact in visual storytelling.',
      duration: 900, // 15 minutes
      order: 1,
      isPreview: true,
      content: 'Understanding color theory is essential for professional color grading. We\'ll explore color relationships, psychological impact, and cultural considerations.'
    },
    {
      title: 'Color Spaces and Gamma Curves',
      description: 'Technical foundation for understanding how color works in digital video.',
      duration: 1200, // 20 minutes
      order: 2,
      isPreview: true,
      content: 'Master the technical aspects of color spaces, gamma curves, and how they affect your color grading workflow.'
    },
    {
      title: 'RAW Workflow and Color Management',
      description: 'Professional workflow for working with RAW footage and maintaining color accuracy.',
      duration: 1080, // 18 minutes
      order: 3,
      isPreview: false,
      content: 'Learn to work with cinema RAW files, maintain color accuracy throughout the pipeline, and handle large format footage professionally.'
    },
    {
      title: 'Creating Cinematic Looks from Scratch',
      description: 'Develop your signature style by creating custom cinematic color grades.',
      duration: 1500, // 25 minutes
      order: 4,
      isPreview: false,
      content: 'Move beyond presets and learn to create unique, professional color grades that enhance storytelling and visual impact.'
    },
    {
      title: 'HDR and Dolby Vision Grading',
      description: 'Advanced techniques for HDR content and next-generation display technologies.',
      duration: 1320, // 22 minutes
      order: 5,
      isPreview: false,
      content: 'Master the art of HDR grading for modern displays and future-proof your content for emerging technologies.'
    }
  ]

  for (const lessonData of colorGradingLessons) {
    await prisma.lesson.create({
      data: {
        ...lessonData,
        courseId: courses[1].id
      }
    })
  }

  // Add course tags
  console.log('🏷️  Adding course tags...')
  await Promise.all([
    prisma.courseTag.create({ data: { courseId: courses[0].id, tagId: tags[0].id } }), // Color Grading
    prisma.courseTag.create({ data: { courseId: courses[0].id, tagId: tags[1].id } }), // Motion Graphics
    prisma.courseTag.create({ data: { courseId: courses[0].id, tagId: tags[2].id } }), // Sound Design
    prisma.courseTag.create({ data: { courseId: courses[0].id, tagId: tags[3].id } }), // 4K Editing
    prisma.courseTag.create({ data: { courseId: courses[0].id, tagId: tags[6].id } }), // Social Media

    prisma.courseTag.create({ data: { courseId: courses[1].id, tagId: tags[0].id } }), // Color Grading
    prisma.courseTag.create({ data: { courseId: courses[1].id, tagId: tags[3].id } }), // 4K Editing
    prisma.courseTag.create({ data: { courseId: courses[1].id, tagId: tags[4].id } }), // Cinematic
  ])

  // Create coupons
  console.log('🎫 Creating coupons...')
  await Promise.all([
    prisma.coupon.create({
      data: {
        code: 'LAUNCH50',
        type: CouponType.PERCENTAGE,
        value: 50,
        minimum: 100,
        usageLimit: 100,
        expiresAt: new Date('2024-12-31'),
        isActive: true
      }
    }),
    prisma.coupon.create({
      data: {
        code: 'STUDENT25',
        type: CouponType.PERCENTAGE,
        value: 25,
        usageLimit: 50,
        expiresAt: new Date('2024-08-31'),
        isActive: true
      }
    })
  ])

  // Create site settings
  console.log('⚙️  Creating site settings...')
  await prisma.siteSettings.create({
    data: {
      siteName: 'Mayank Editor',
      siteUrl: 'https://mayank-editor.vercel.app',
      logo: '/images/logo.png',
      favicon: '/favicon.ico',
      primaryColor: '#ff6b4a',
      darkMode: true,
      heroVideo: 'https://example.com/showreel.mp4',
      heroTitle: 'Mayank — Cinematic Video Editor',
      heroSubtitle: 'Professional video editing services for brands, creators, and businesses. Transform your vision into stunning visual stories.',
      heroCta: 'View My Work',
      heroCtaUrl: '/projects',
      contactEmail: 'contact@mayank.com',
      socialLinks: {
        twitter: 'https://twitter.com/mayank',
        linkedin: 'https://linkedin.com/in/mayank',
        github: 'https://github.com/mayank',
        instagram: 'https://instagram.com/mayank',
        youtube: 'https://youtube.com/@mayank'
      },
      analytics: {
        googleAnalyticsId: 'G-XXXXXXXXXX',
        hotjarId: 'XXXXXX',
        facebookPixelId: 'XXXXXXXXXX'
      },
      seoSettings: {
        defaultTitle: 'Mayank — Professional Video Editor',
        defaultDescription: 'Professional video editing services for brands and creators. Specializing in cinematic content, promotional videos, and post-production excellence.',
        keywords: ['video editor', 'cinematic editing', 'post production', 'video services'],
        ogImage: '/images/og-default.jpg',
        twitterHandle: '@mayank'
      }
    }
  })

  // Create sample contact messages
  console.log('📧 Creating contact messages...')
  await Promise.all([
    prisma.contactMessage.create({
      data: {
        name: 'Alex Johnson',
        email: 'alex@company.com',
        subject: 'Video editing inquiry for product launch',
        message: 'Hi Mayank, I came across your portfolio and was really impressed with your work. We\'re launching a new product next month and need a professional video editor to create a 2-minute promotional video. Could you provide more information about your process and pricing? We\'re looking for something cinematic and modern that appeals to a tech-savvy audience. The project would include product footage, interviews with the team, and motion graphics for the product features. We\'d need the final video by the end of next month. Looking forward to hearing from you!',
        phone: '+1-555-0123',
        company: 'TechStart Inc.',
        status: MessageStatus.UNREAD
      }
    }),
    prisma.contactMessage.create({
      data: {
        name: 'Emma Wilson',
        email: 'emma@creativestudio.com',
        subject: 'Collaboration opportunity',
        message: 'Hello Mayank, I run a creative studio and we have a client who needs high-quality video editing services on a regular basis. Your portfolio aligns perfectly with the style our clients are looking for. Would you be interested in discussing a potential partnership? We typically have 2-3 projects per month ranging from social media content to longer corporate videos. Let me know if you\'d be open to a conversation about rates and availability.',
        phone: '+1-555-0124',
        company: 'Creative Studio',
        status: MessageStatus.REPLIED
      }
    })
  ])

  // Create sample analytics data
  console.log('📊 Creating analytics data...')
  const today = new Date()
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    await prisma.analytics.create({
      data: {
        date: date,
        pageViews: Math.floor(Math.random() * 500) + 100,
        uniqueVisitors: Math.floor(Math.random() * 200) + 50,
        sessions: Math.floor(Math.random() * 150) + 40,
        bounceRate: Math.random() * 0.5 + 0.3,
        avgSessionDuration: Math.random() * 300 + 60,
        topPages: [
          { page: '/', views: Math.floor(Math.random() * 100) + 50 },
          { page: '/projects', views: Math.floor(Math.random() * 80) + 30 },
          { page: '/about', views: Math.floor(Math.random() * 60) + 20 }
        ],
        referrers: [
          { source: 'google', visitors: Math.floor(Math.random() * 50) + 10 },
          { source: 'linkedin', visitors: Math.floor(Math.random() * 30) + 5 },
          { source: 'direct', visitors: Math.floor(Math.random() * 40) + 15 }
        ],
        devices: [
          { type: 'desktop', percentage: Math.random() * 20 + 50 },
          { type: 'mobile', percentage: Math.random() * 20 + 30 },
          { type: 'tablet', percentage: Math.random() * 10 + 10 }
        ],
        browsers: [
          { name: 'Chrome', percentage: Math.random() * 10 + 60 },
          { name: 'Safari', percentage: Math.random() * 10 + 20 },
          { name: 'Firefox', percentage: Math.random() * 5 + 5 }
        ]
      }
    })
  }

  // Create newsletter subscribers
  console.log('📬 Creating newsletter subscribers...')
  const newsletterEmails = [
    'john.doe@example.com',
    'jane.smith@company.com',
    'mike.johnson@startup.com',
    'sarah.wilson@creative.com',
    'david.brown@marketing.com',
    'emma.davis@production.com',
    'chris.miller@agency.com',
    'lisa.garcia@studio.com',
    'alex.rodriguez@film.com',
    'rachel.martinez@video.com'
  ]

  for (const email of newsletterEmails) {
    await prisma.newsletter.create({
      data: {
        email: email,
        status: 'active'
      }
    })
  }

  console.log('✅ Database seeding completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`- Users: ${2}`)
  console.log(`- Categories: ${categories.length}`)
  console.log(`- Tags: ${tags.length}`)
  console.log(`- Projects: ${projects.length}`)
  console.log(`- Blog Posts: ${blogPosts.length}`)
  console.log(`- Courses: ${courses.length}`)
  console.log(`- Testimonials: ${4}`)
  console.log(`- Services: ${4}`)
  console.log(`- Coupons: ${2}`)
  console.log(`- Contact Messages: ${2}`)
  console.log(`- Analytics Data: ${31} days`)
  console.log(`- Newsletter Subscribers: ${newsletterEmails.length}`)

  console.log('\n🔑 Admin Credentials:')
  console.log('Email: admin@mayank.com')
  console.log('Password: (Use OAuth or "Forgot Password" to set)')

  console.log('\n🎉 Sample data is ready for development!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })