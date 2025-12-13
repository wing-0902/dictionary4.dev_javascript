// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import cloudflare from '@astrojs/cloudflare';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  site: 'https://js.dictionary4.dev',
  integrations: [
    svelte(),
    vue(),
    mdx(),
    sitemap(),
    markdoc(),
    alpinejs({
      entrypoint: '/src/entrypoint',
    })
  ],
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Fira Code",
        cssVariable: "--font-fira-code"
      },
      {
        provider: fontProviders.google(),
        name: 'M PLUS 1 Code',
        cssVariable: "--font-m-plus-1-code"
      },
      {
        provider: fontProviders.google(),
        name: 'Zen Kaku Gothic New',
        cssVariable: '--font-zen-kaku-gothic-new'
      },
    ]
  },

  markdown: {
    syntaxHighlight: false,
    shikiConfig: {
      theme: 'night-owl',
    },
  },

  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.jsonc',
    },
    routes: {
      extend: {
        exclude: [
          {pattern: '/content/*'},
          {pattern: '/_astro/*'},
          {pattern: '/code_only_search/*'},
          {pattern: '/content_search/*'},
          {pattern: '/title_only_search/*'},
        ],
        include: [
          {pattern: '/api/*'},
        ],
      }
    },
  }),
  output: 'static',
});