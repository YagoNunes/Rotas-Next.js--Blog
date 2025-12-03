import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`${process.env.API_URL}/artigos`);
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${process.env.API_URL}/artigos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
