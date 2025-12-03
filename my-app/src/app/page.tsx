import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Artigo = {
  _id: string;
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  description: string;
};

async function getArtigos(): Promise<Artigo[]> {
  const res = await fetch(`${process.env.API_URL}/artigos`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const artigos = await getArtigos();

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>Blog — Artigos</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {artigos.map((a) => (
          <li key={a._id} style={{ marginBottom: 25 }}>
            <Link href={`/artigos/${a.slug}`} style={{ fontSize: 20, fontWeight: 600 }}>
              {a.title}
            </Link>

            <p style={{ fontSize: 14, color: '#666' }}>
              {a.author} — {new Date(a.publishedAt).toLocaleDateString('pt-BR')}
            </p>

            <p>{a.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}