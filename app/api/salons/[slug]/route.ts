import { NextRequest, NextResponse } from 'next/server';
import { salonService, serviceService } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const salon = await salonService.getBySlug(params.slug);
    
    if (!salon) {
      return NextResponse.json(
        { error: 'Salon not found' },
        { status: 404 }
      );
    }

    const services = await serviceService.getBySalon(salon.id);

    return NextResponse.json({
      salon,
      services
    });

  } catch (error) {
    console.error('Error fetching salon:', error);
    return NextResponse.json(
      { error: 'Failed to fetch salon data' },
      { status: 500 }
    );
  }
}