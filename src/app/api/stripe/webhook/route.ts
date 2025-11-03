import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const sig = headers().get('stripe-signature')

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleSuccessfulPayment(session)
        break
      }
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Checkout session expired:', session.id)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { courseId, userId } = session.metadata!

  if (!courseId || !userId) {
    console.error('Missing metadata in session:', session.id)
    return
  }

  try {
    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        status: 'COMPLETED',
        total: session.amount_total! / 100, // Convert from cents
        subtotal: session.amount_total! / 100,
        currency: session.currency!,
        paymentId: session.payment_intent as string,
        paymentMethod: 'stripe',
        customerId: userId,
        items: {
          create: {
            title: session.display_items?.[0]?.custom?.name || 'Course Purchase',
            description: `Course ID: ${courseId}`,
            price: session.amount_total! / 100,
            quantity: 1,
            total: session.amount_total! / 100,
            courseId: courseId,
          }
        }
      },
      include: {
        items: true,
        customer: true,
      }
    })

    // Create course progress for the user
    await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      }
    }).then(async (existingProgress) => {
      if (!existingProgress) {
        return prisma.courseProgress.create({
          data: {
            userId: userId,
            courseId: courseId,
            completed: false,
            progress: 0,
          }
        })
      }
    })

    console.log('Order created successfully:', order.id)

    // TODO: Send confirmation email
    // TODO: Update course enrollment count

  } catch (error) {
    console.error('Error creating order:', error)
  }
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `ORD-${timestamp}-${random}`
}