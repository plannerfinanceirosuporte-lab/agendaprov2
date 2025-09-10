import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AgendaPro - Sistema de Agendamento para Salões e Clínicas',
  description: 'Plataforma completa para gestão de agendamentos, clientes e pagamentos para salões de beleza, barbearias e clínicas estéticas.',
  keywords: 'agendamento, salão, barbearia, clínica estética, sistema, SaaS',
  authors: [{ name: 'AgendaPro Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AgendaPro - Sistema de Agendamento Profissional',
    description: 'Revolucione a gestão do seu salão com nossa plataforma completa de agendamentos.',
    type: 'website',
    locale: 'pt_BR',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}