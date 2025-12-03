import ArticleForm from '../../../app/components/ArticleForm';

export default function Novo() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Novo Artigo</h1>
      <ArticleForm onSuccess={() => (location.href = '/admin')} />
    </main>
  );
}
