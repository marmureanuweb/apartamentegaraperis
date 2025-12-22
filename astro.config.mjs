import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://apartamentegaraperis.web.app',
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: {
          ro: 'ro-RO',
        },
      },
    }),
  ],
  build: {
    assets: 'assets',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
