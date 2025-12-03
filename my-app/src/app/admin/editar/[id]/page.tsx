import ArticleForm from '../../../../app/components/ArticleForm';
import { fetchArtigoById } from '../../../../lib/api';

export default async function Editar({ params }: { params: { id: string } }) {
  const artigo = await fetchArtigoById(params.id);
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Editar Artigo</h1>
      <ArticleForm initial={artigo} onSuccess={() => (location.href = '/admin')} />
    </main>
  );
}
