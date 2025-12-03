const BASE = process.env.API_URL;

export async function fetchArtigos() {
  const res = await fetch(`${BASE}/artigos`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao buscar artigos');
  return res.json();
}

export async function fetchArtigoById(id: string) {
  const res = await fetch(`${BASE}/artigos/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Artigo não encontrado');
  return res.json();
}

export async function createArtigo(payload: any) {
  const res = await fetch(`${BASE}/artigos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Falha ao criar artigo');
  return res.json();
}

export async function updateArtigo(id: string, payload: any) {
  const res = await fetch(`${BASE}/artigos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Falha ao atualizar artigo');
  return true;
}

export async function deleteArtigo(id: string) {
  const res = await fetch(`${BASE}/artigos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Falha ao deletar artigo');
  return true;
}
