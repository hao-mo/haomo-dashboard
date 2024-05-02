import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    if (!title) {
      return new Response('Slug is required', { status: 400 });
    }
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: `Please translate the following Chinese title into a simple English slug. Replace spaces and special characters with dashes, and ensure all letters are in lowercase. Title: '${title}'`,
      maxTokens: 60,
    });
    return new NextResponse(text, { status: 200 });
  } catch (error) {
    console.log('POST error', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
