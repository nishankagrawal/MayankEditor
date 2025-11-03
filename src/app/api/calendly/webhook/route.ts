import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import crypto from 'crypto'
import { prisma } from '@/lib/db'
import { sendBookingConfirmationEmail } from '@/lib/email'

const calendlyWebhookSecret = process.env.CALENDLY_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('Calendly-Webhook-Signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    // Verify webhook signature
    const [t, timestamp, signatureHash] = signature.split(',')
    const expectedSignature = crypto
      .createHmac('sha256', calendlyWebhookSecret!)
      .update(`${t}.${timestamp}.${body}`)
      .digest('hex')

    if (signatureHash !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const { event: eventType, payload } = event

    console.log('Calendly webhook event:', eventType, payload)

    switch (eventType) {
      case 'invitee.created':
        await handleInviteeCreated(payload)
        break
      case 'invitee.canceled':
        await handleInviteeCanceled(payload)
        break
      case 'invitee.no_show':
        await handleInviteeNoShow(payload)
        break
      case 'invitee.active':
        await handleInviteeActive(payload)
        break
      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Calendly webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleInviteeCreated(payload: any) {
  try {
    const { email, name, event, questions_and_answers } = payload

    // Check if user exists, create if not
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email,
          role: 'USER',
          emailVerified: new Date()
        }
      })
    }

    // Create booking record
    const booking = await prisma.booking.create({
      data: {
        eventName: event.name,
        startTime: new Date(event.start_time),
        endTime: new Date(event.end_time),
        timezone: payload.event.timezone || 'UTC',
        status: 'SCHEDULED',
        calendlyId: payload.uri,
        notes: questions_and_answers ? JSON.stringify(questions_and_answers) : null,
        clientId: user.id
      }
    })

    // Send confirmation email
    await sendBookingConfirmationEmail({
      to: user.email,
      name: user.name || email,
      eventName: event.name,
      startTime: event.start_time,
      endTime: event.end_time,
      meetingUrl: event.location?.join_url || '',
      cancelUrl: payload.cancel_url,
      rescheduleUrl: payload.reschedule_url
    })

    console.log('Booking created successfully:', booking.id)
  } catch (error) {
    console.error('Error handling invitee.created:', error)
  }
}

async function handleInviteeCanceled(payload: any) {
  try {
    const calendlyId = payload.uri

    // Update booking status
    await prisma.booking.updateMany({
      where: { calendlyId },
      data: { status: 'CANCELED' }
    })

    console.log('Booking canceled:', calendlyId)
  } catch (error) {
    console.error('Error handling invitee.canceled:', error)
  }
}

async function handleInviteeNoShow(payload: any) {
  try {
    const calendlyId = payload.uri

    // Update booking status
    await prisma.booking.updateMany({
      where: { calendlyId },
      data: { status: 'NO_SHOW' }
    })

    console.log('Booking marked as no-show:', calendlyId)
  } catch (error) {
    console.error('Error handling invitee.no_show:', error)
  }
}

async function handleInviteeActive(payload: any) {
  try {
    const calendlyId = payload.uri

    // Update booking status
    await prisma.booking.updateMany({
      where: { calendlyId },
      data: { status: 'COMPLETED' }
    })

    console.log('Booking marked as completed:', calendlyId)
  } catch (error) {
    console.error('Error handling invitee.active:', error)
  }
}