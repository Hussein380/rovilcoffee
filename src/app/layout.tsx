import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Rovil Coffee & Tea | Licensed Kenyan Exporters',
  description: 'We grow, source, and export quality Kenyan coffee and tea in bulk to international buyers worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-white text-[#1f1610] font-sans antialiased selection:bg-[#6f4327] selection:text-white">
        {children}
      </body>
    </html>
  );
}
