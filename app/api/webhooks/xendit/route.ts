import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Twilio } from 'twilio';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;
    const xenditWebhookToken = headers.get('x-callback-token');

    // Verify Xendit Webhook Token
    if (xenditWebhookToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Xendit sends an invoice status
    if (payload.status === 'PAID' || payload.status === 'SETTLED') {
      const order = await prisma.order.updateMany({
        where: { xenditInvoiceId: payload.id },
        data: { paymentStatus: 'PAID' },
      });

      if (order.count > 0) {
        // Find order again to get customer details for WA Notification
        const updatedOrder = await prisma.order.findFirst({
          where: { xenditInvoiceId: payload.id },
          include: { customer: true }
        });

        if (updatedOrder && updatedOrder.customer) {
          await sendWhatsAppNotification(updatedOrder.customer.phone, updatedOrder.customer.name, updatedOrder.id);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function sendWhatsAppNotification(customerPhone: string, customerName: string, orderId: string) {
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!twilioSid || !twilioToken || !fromNumber) {
    console.log('Twilio config missing. Skipping WA notification.');
    return;
  }

  const client = new Twilio(twilioSid, twilioToken);
  
  // Clean phone number: Convert to E.164 format roughly (assumes Indonesian number starting with 0 or 62)
  let toPhone = customerPhone;
  if (toPhone.startsWith('0')) {
    toPhone = '+62' + toPhone.substring(1);
  } else if (!toPhone.startsWith('+')) {
    toPhone = '+' + toPhone;
  }

  const message = `Halo TRETAN ${customerName}! 

Alhamdulillah pembayaran untuk ID Pesanan: ${orderId} udah masuk! Skalangkong banyak ya TRETAN udah pesen Sambal Terasi T.O.T. 

Pastiin perut udah siap, soalnya sambalnya lagi diproses se-berse mungkin dan bakal langsung dikirim. Nanti resi di-update ya. 

Nyaman Ongghu, TRETAN 🔥`;

  try {
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: `whatsapp:${toPhone}`
    });
    console.log(`WhatsApp sent successfully to ${toPhone}`);
  } catch (error) {
    console.error('Twilio Error:', error);
  }
}
