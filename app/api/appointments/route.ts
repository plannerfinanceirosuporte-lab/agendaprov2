import { NextRequest, NextResponse } from 'next/server';
import { appointmentService, clientService } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      salon_id,
      service_id,
      professional_id,
      date,
      time,
      duration,
      price,
      client_data,
      payment_method
    } = body;

    // Create or get client
    let client = await clientService.getByPhone(client_data.phone);
    
    if (!client) {
      client = await clientService.create({
        name: client_data.name,
        email: client_data.email,
        phone: client_data.phone,
        whatsapp: client_data.phone,
        loyalty_points: 0,
        total_visits: 0
      });
    }

    // Create appointment
    const appointment = await appointmentService.create({
      salon_id,
      client_id: client.id,
      service_id,
      professional_id,
      date,
      time,
      duration,
      price,
      status: 'pending',
      payment_status: payment_method === 'cash' ? 'pending' : 'pending',
      payment_method: payment_method || 'cash'
    });

    return NextResponse.json({ 
      success: true, 
      appointment,
      client 
    });

  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const salon_id = searchParams.get('salon_id');
    const date = searchParams.get('date');

    if (!salon_id) {
      return NextResponse.json(
        { error: 'Salon ID is required' },
        { status: 400 }
      );
    }

    const appointments = await appointmentService.getBySalon(salon_id, date || undefined);

    return NextResponse.json({ appointments });

  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}