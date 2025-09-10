
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  // Stripe desabilitado temporariamente
  return NextResponse.json(
    { error: 'Stripe integration is disabled on this deployment.' },
    { status: 501 }
  );
}
