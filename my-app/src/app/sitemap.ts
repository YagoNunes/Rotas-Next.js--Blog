export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seu-dominio.vercel.app';
  const res = await fetch(`${process.env.API_URL}/artigos`, { cache: 'no-store' });
  const artigos = (await res.json()) || [];

  const pages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...artigos.map((a: any) => ({
      url: `${baseUrl}/artigos/${a.slug}`,
      lastModified: new Date(a.publishedAt).toISOString(),
    })),
  ];

  return pages;
}
