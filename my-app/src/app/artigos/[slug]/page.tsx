import { notFound } from 'next/navigation';
import { markdownToHtml } from '../../../lib/markdown';

export const dynamic = 'force-dynamic';

type Artigo = {
  _id: string;
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  description: string;
  content: string;
};

async function getArtigos(): Promise<Artigo[]> {
  const res = await fetch(`${process.env.API_URL}/artigos`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getArtigoBySlug(slug: string) {
  const artigos = await getArtigos();
  return artigos.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artigo = await getArtigoBySlug(params.slug);
  if (!artigo) {
    return {
      title: 'Artigo não encontrado',
      description: 'Não foi possível localizar o artigo',
    };
  }

  return {
    title: artigo.title,
    description: artigo.description,
    openGraph: {
      title: artigo.title,
      description: artigo.description,
      type: 'article',
      publishedTime: artigo.publishedAt,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/artigos/${artigo.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: artigo.title,
      description: artigo.description,
    },
  };
}

export default async function ArtigoPage({ params }: { params: { slug: string } }) {
  const artigo = await getArtigoBySlug(params.slug);
  if (!artigo) return notFound();
  
  const isMarkdown = !artigo.content.trim().startsWith('<');
  const contentHtml = isMarkdown ? await markdownToHtml(artigo.content) : artigo.content;

  return (
    <article style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>{artigo.title}</h1>

      <p style={{ color: '#666', marginBottom: 20 }}>
        {artigo.author} — {new Date(artigo.publishedAt).toLocaleDateString('pt-BR')}
      </p>

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
