import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Invoice as InvoiceClient } from 'xendit-node';

export async function POST(req: Request) {
  try {
    const { name, phone, address, shippingCost, destination } = await req.json();

    if (!name || !phone || !address || shippingCost === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Sambal Price (MVP: 1 Product)
    const productPrice = 45000;
    const totalAmount = productPrice + parseInt(shippingCost.toString());

    // Setup Xendit client
    const secretKey = process.env.XENDIT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('XENDIT_SECRET_KEY is missing');
    }
    const invoiceClient = new InvoiceClient({ secretKey });

    // Upsert Customer
    const customer = await prisma.customer.upsert({
      where: { phone },
      update: { name, address },
      create: { name, phone, address },
    });

    // Create Temporary Order in DB
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        totalAmount,
        shippingCost: parseInt(shippingCost.toString()),
        paymentStatus: 'PENDING',
      },
    });

    // Create Invoice in Xendit
    const invoiceRequest = {
      externalId: order.id,
      amount: totalAmount,
      description: `Pembelian Sambal Terasi T.O.T oleh ${name}`,
      customer: {
        givenNames: name,
        mobileNumber: phone,
      },
      // You can define redirect options here if you want
      // successRedirectUrl: `${process.env.APP_URL}/success`,
    };

    const invoice = await invoiceClient.createInvoice({ data: invoiceRequest });

    // Update Order with Xendit details
    await prisma.order.update({
      where: { id: order.id },
      data: {
        xenditInvoiceId: invoice.id,
        invoiceUrl: invoice.invoiceUrl,
      },
    });

    return NextResponse.json({ invoiceUrl: invoice.invoiceUrl });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
  }
}
