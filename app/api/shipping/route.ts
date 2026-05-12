import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { destination, weight } = await req.json();

    if (!destination || !weight) {
      return NextResponse.json({ error: 'Destination and weight are required' }, { status: 400 });
    }

    const apiKey = process.env.RAJAONGKIR_API_KEY;
    if (!apiKey) {
      throw new Error('RAJAONGKIR_API_KEY is not set');
    }

    // Pamekasan City ID is 334 in RajaOngkir Starter
    const origin = '334';
    const courier = 'jne'; // Using JNE as default example

    const response = await fetch('https://api.rajaongkir.com/starter/cost', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'key': apiKey,
      },
      body: new URLSearchParams({
        origin,
        destination,
        weight: weight.toString(),
        courier,
      }),
    });

    const data = await response.json();
    
    if (data.rajaongkir.status.code !== 200) {
      return NextResponse.json({ error: data.rajaongkir.status.description }, { status: 400 });
    }

    // The frontend should receive a list of services (Reguler, Ekspres, dll.)
    return NextResponse.json({ costs: data.rajaongkir.results[0].costs });
  } catch (error) {
    console.error('RajaOngkir Error:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping costs' }, { status: 500 });
  }
}
