import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Retrieve the checkout session
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    if (!checkoutSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (checkoutSession.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    // Find the order associated with this session
    const order = await prisma.order.findFirst({
      where: {
        paymentId: checkoutSession.payment_intent as string,
        customerId: session.user.id,
      },
      include: {
        items: {
          include: {
            course: true
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Get card details from the payment intent
    let cardLast4 = '****'
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        checkoutSession.payment_intent as string
      )
      if (paymentIntent.payment_method) {
        const paymentMethod = await stripe.paymentMethods.retrieve(
          paymentIntent.payment_method as string
        )
        if (paymentMethod.card) {
          cardLast4 = paymentMethod.card.last4 || '****'
        }
      }
    } catch (error) {
      console.error('Error retrieving card details:', error)
    }

    const courseItem = order.items[0]
    const course = courseItem?.course

    return NextResponse.json({
      orderNumber: order.orderNumber,
      courseTitle: course?.title || 'Course Purchase',
      amount: order.total,
      cardLast4,
      paymentStatus: checkoutSession.payment_status,
      customerEmail: checkoutSession.customer_email || session.user.email
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}