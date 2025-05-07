import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Northwood Estates | Mobile Home Community in Northwood, Ohio',
  description: 'Discover affordable manufactured homes in a peaceful, pet-friendly community. Offering spacious lots, modern amenities, and a great location in Northwood, Ohio.',
  keywords: 'mobile home community, Northwood, Ohio, manufactured homes, affordable housing, RV lots, pet friendly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 