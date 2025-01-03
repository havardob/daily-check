import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'My Streak',
        short_name: 'MyStreak',
        description: 'Track any daily habit',
        start_url: '/',
        display: 'standalone',
        background_color: '#d3ffc4',
        theme_color: '#0d8c00',
        icons: [
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}