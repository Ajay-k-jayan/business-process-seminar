import type { Metadata, Viewport } from 'next';
import { Barlow, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const barlow = Barlow({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-board', display: 'block' });

export const metadata: Metadata = {
  title: 'Business Process',
  description: 'FactsERP Book 2 (Documents, the building blocks of FactsERP) explained on a whiteboard with one 5 kg bag of rice.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlow.variable}`}>{children}</body>
    </html>
  );
}
