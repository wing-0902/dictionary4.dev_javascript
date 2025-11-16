// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import svelte from '@astrojs/svelte';

import vue from '@astrojs/vue';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://ts.dictionary4.dev',
  integrations: [svelte(), vue(), mdx()],
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
      }
    ]
  }
});