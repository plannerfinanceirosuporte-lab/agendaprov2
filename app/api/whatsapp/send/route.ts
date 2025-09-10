import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone, message, template_name, template_data } = await request.json();

    // WhatsApp Business API integration
    const whatsappUrl = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    
    const messageData = template_name ? {
      messaging_product: 'whatsapp',
      to: phone,
      type: 'template',
      template: {
        name: template_name,
        language: { code: 'pt_BR' },
        components: template_data ? [
          {
            type: 'body',
            parameters: template_data.map((data: string) => ({ type: 'text', text: data }))
          }
        ] : []
      }
    } : {
      messaging_product: 'whatsapp',
      to: phone,
      type: 'text',
      text: { body: message }
    };

    const response = await fetch(whatsappUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`WhatsApp API error: ${result.error?.message || 'Unknown error'}`);
    }

    return NextResponse.json({ 
      success: true, 
      message_id: result.messages?.[0]?.id 
    });

  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return NextResponse.json(
      { error: 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}