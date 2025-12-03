import '../styles/globals.css';

export const metadata = {
  title: 'Meu Blog',
  description: 'Blog com Next.js App Router e CRUDCRUD',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header style={{ borderBottom: '1px solid #eee', padding: 12 }}>
          <nav style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 12 }}>
            <a href="/">Home</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
