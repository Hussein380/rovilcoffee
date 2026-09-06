import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${inter.className}`}>
      <head>
        <link rel="preload" href="/textures/earth_atmos_2048.jpg" as="image" />
        <link rel="preload" href="/textures/earth_clouds_1024.png" as="image" />
      </head>
      <body className={`${inter.className} bg-white text-[#1f1610] antialiased selection:bg-[#6f4327] selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
