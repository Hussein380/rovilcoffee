import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ROVIL Coffee & Tea Exporters Kenya',
    short_name: 'ROVIL Coffee',
    description:
      'Premier Kenyan Arabica Coffee & Single-Origin Tea Exporters. Direct Port Dispatch worldwide from Mombasa Port.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#23150c',
    theme_color: '#23150c',
    orientation: 'portrait-primary',
    categories: ['business', 'shopping', 'food'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
