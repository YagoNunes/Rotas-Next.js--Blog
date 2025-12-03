import Link from 'next/link';
import ArticleCard from '../components/ArticleCard';
import { fetchArtigos } from '../../lib/api';

export default async function AdminPage() {
  const artigos = await fetchArtigos();

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}>
      <h1>Admin — Artigos</h1>

      <section style={{ display: 'grid', gap: 12 }}>
        <div>
          <h2>Criar novo</h2>
          <Link href="/admin/novo">Ir para criação</Link>
        </div>

        <div>
          <h2>Listagem</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {artigos.map((a: any) => (
              <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <ArticleCard artigo={a} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link href={`/admin/editar/${a._id}`}>Editar</Link>
                  <button
                    onClick={async () => {
                      if (!confirm('Deletar artigo?')) return;
                      await fetch(`/api/artigos/${a._id}`, { method: 'DELETE' });
                      location.reload();
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
