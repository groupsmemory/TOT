import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { destination, weight } = await req.json();

    if (!destination || !weight) {
      return NextResponse.json({ error: 'Destination and weight are required' }, { status: 400 });
    }

    const apiKey = process.env.RAJAONGKIR_API_KEY;
    if (!apiKey) {
      throw new Error('API Key is not set');
    }

    // Pamekasan City ID is 334
    // Using Komerce API structure
    const response = await fetch('https://api.komerce.id/api/v1/shipping/cost', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'key': apiKey,
      },
      body: JSON.stringify({
        origin: '334',
        destination: destination,
        weight: weight,
        courier: 'jne,jnt,sicepat', // More couriers for TRETAN
      }),
    });

    const data = await response.json();
    
    if (data.status !== 'success') {
      return NextResponse.json({ error: data.message || 'Gagal ambil ongkir dari Komerce' }, { status: 400 });
    }

    // Komerce structure: data[0].costs
    return NextResponse.json({ costs: data.data[0].costs });
  } catch (error) {
    console.error('Komerce Error:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping costs' }, { status: 500 });
  }
}
