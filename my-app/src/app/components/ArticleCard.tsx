import Link from 'next/link';

type Props = {
  artigo: any;
};

export default function ArticleCard({ artigo }: Props) {
  return (
    <article style={{ border: '1px solid #eee', padding: 18, borderRadius: 8 }}>
      <h2>
        <Link href={`/artigos/${artigo.slug}`}>{artigo.title}</Link>
      </h2>
      <p style={{ color: '#666', fontSize: 13 }}>
        {artigo.author} — {new Date(artigo.publishedAt).toLocaleDateString('pt-BR')}
      </p>
      <p>{artigo.description}</p>
    </article>
  );
}
