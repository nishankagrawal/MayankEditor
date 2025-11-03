import sgMail from '@sendgrid/mail'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  from?: string
}

interface BookingConfirmationEmail {
  to: string
  name: string
  eventName: string
  startTime: string
  endTime: string
  meetingUrl: string
  cancelUrl: string
  rescheduleUrl: string
}

interface OrderConfirmationEmail {
  to: string
  name: string
  orderNumber: string
  courseTitle: string
  amount: number
  paymentDate: string
}

const fromEmail = process.env.FROM_EMAIL || 'contact@mayank.com'

export async function sendEmail({ to, subject, html, text, from = fromEmail }: EmailOptions) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('SendGrid API key not found. Skipping email send.')
    return { success: false, error: 'SendGrid API key not configured' }
  }

  try {
    const sg = sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to,
      from,
      subject,
      html,
      text: text || html,
    }

    await sg.send(msg)
    console.log('Email sent successfully to:', to)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendBookingConfirmationEmail({
  to,
  name,
  eventName,
  startTime,
  endTime,
  meetingUrl,
  cancelUrl,
  rescheduleUrl
}: BookingConfirmationEmail) {
  const subject = `Booking Confirmed: ${eventName}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0b0b0b; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: #ff6b4a; margin: 0; font-size: 28px; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .btn { display: inline-block; padding: 12px 24px; background: #ff6b4a; color: white; text-decoration: none; border-radius: 6px; margin: 10px 5px 0 0; }
        .btn:hover { background: #e55a39; }
        .btn-secondary { background: #6c757d; }
        .btn-secondary:hover { background: #5a6268; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed! 🎉</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thank you for scheduling a meeting! Your booking has been confirmed. Here are the details:</p>

          <div class="booking-details">
            <h3>Booking Details</h3>
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Date & Time:</strong> ${new Date(startTime).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} - ${new Date(endTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            ${meetingUrl ? `<p><strong>Meeting URL:</strong> <a href="${meetingUrl}">${meetingUrl}</a></p>` : ''}
          </div>

          <div style="text-align: center;">
            ${meetingUrl ? `<a href="${meetingUrl}" class="btn">Join Meeting</a>` : ''}
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              Need to make changes?<br>
              <a href="${cancelUrl}" class="btn btn-secondary">Cancel</a> or
              <a href="${rescheduleUrl}" class="btn btn-secondary">Reschedule</a>
            </p>
          </div>

          <p>We look forward to speaking with you!</p>

          <div class="footer">
            <p>Best regards,<br>Mayank</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({
    to,
    subject,
    html
  })
}

export async function sendOrderConfirmationEmail({
  to,
  name,
  orderNumber,
  courseTitle,
  amount,
  paymentDate
}: OrderConfirmationEmail) {
  const subject = `Order Confirmation: ${orderNumber}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0b0b0b; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: #ff6b4a; margin: 0; font-size: 28px; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .btn { display: inline-block; padding: 12px 24px; background: #ff6b4a; color: white; text-decoration: none; border-radius: 6px; }
        .btn:hover { background: #e55a39; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Confirmed! 🎓</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thank you for your purchase! Your order has been confirmed. Here are the details:</p>

          <div class="order-details">
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Course:</strong> ${courseTitle}</p>
            <p><strong>Amount Paid:</strong> $${amount.toFixed(2)}</p>
            <p><strong>Payment Date:</strong> ${new Date(paymentDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          </div>

          <div style="text-align: center;">
            <a href="/dashboard/courses" class="btn">Access Your Course</a>
          </div>

          <p>You now have full access to the course materials. You can start learning immediately!</p>

          <div class="footer">
            <p>Best regards,<br>Mayank</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({
    to,
    subject,
    html
  })
}

export async function sendWelcomeEmail(to: string, name: string) {
  const subject = 'Welcome to Mayank\'s Video Editing Courses!'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0b0b0b; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: #ff6b4a; margin: 0; font-size: 28px; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; }
        .btn { display: inline-block; padding: 12px 24px; background: #ff6b4a; color: white; text-decoration: none; border-radius: 6px; }
        .btn:hover { background: #e55a39; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to the Community! 🎉</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Welcome to Mayank's Video Editing Courses! We're excited to have you join our community of passionate creators and editors.</p>

          <p>What you can do next:</p>
          <ul>
            <li>Browse our course catalog</li>
            <li>Join our community forum</li>
            <li>Follow our YouTube channel</li>
            <li>Book a 1-on-1 consultation</li>
          </ul>

          <div style="text-align: center;">
            <a href="/courses" class="btn">Explore Courses</a>
          </div>

          <p>If you have any questions, don't hesitate to reach out to our support team.</p>

          <div class="footer">
            <p>Best regards,<br>Mayank</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail({
    to,
    subject,
    html
  })
}