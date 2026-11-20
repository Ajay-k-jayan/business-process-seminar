import type { Metadata, Viewport } from 'next';
import { Inter, Kalam } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const kalam = Kalam({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-kalam', display: 'block' });

export const metadata: Metadata = {
  title: 'Business Process',
  description: 'FactsERP Book 2 (Documents, the building blocks of FactsERP) explained on a whiteboard with one 5 kg bag of rice.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${kalam.variable}`}>{children}</body>
    </html>
  );
}
