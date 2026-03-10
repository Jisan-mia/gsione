import ZAI from 'z-ai-web-dev-sdk';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const zai = await ZAI.create();
    
    const result = await zai.functions.invoke('page_reader', {
      url: 'https://gsitechbd.com/'
    });
    
    return NextResponse.json(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
