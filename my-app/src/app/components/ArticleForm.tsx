'use client';
import { useState } from 'react';

type Props = {
  initial?: any;
  onSuccess?: () => void;
};

export default function ArticleForm({ initial, onSuccess }: Props) {
  const [title, setTitle] = useState(initial?.title || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [author, setAuthor] = useState(initial?.author || '');
  const [publishedAt, setPublishedAt] = useState(initial?.publishedAt || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [content, setContent] = useState(initial?.content || '');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = { title, slug, author, publishedAt, description, content };

    try {
      if (initial?._id) {
        await fetch(`/api/artigos/${initial._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/artigos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
      <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      <input placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
      <input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
      <textarea placeholder="Conteúdo (HTML ou Markdown)" rows={8} value={content} onChange={(e) => setContent(e.target.value)} />

      <div>
        <button type="submit" disabled={loading}>
          {initial?._id ? 'Salvar' : 'Criar'}
        </button>
      </div>
    </form>
  );
}
