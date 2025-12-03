import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const API_URL = process.env.API_URL;
  const { id } = params;

  if (!API_URL) {
    return NextResponse.json({ error: 'API_URL não configurada' }, { status: 500 });
  }

  const res = await fetch(`${API_URL}/artigos/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const API_URL = process.env.API_URL;
  const { id } = params;

  if (!API_URL) {
    return NextResponse.json({ error: 'API_URL não configurada' }, { status: 500 });
  }

  const body = await request.json();

  const res = await fetch(`${API_URL}/artigos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Falha ao atualizar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const API_URL = process.env.API_URL;
  const { id } = params;

  if (!API_URL) {
    return NextResponse.json({ error: 'API_URL não configurada' }, { status: 500 });
  }

  const res = await fetch(`${API_URL}/artigos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Falha ao deletar' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

