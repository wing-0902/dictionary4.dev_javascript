import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    code: {
      render: component('./src/components/CodeLayout.astro'),
      attributes: {
        // https://markdoc.dev/docs/attributes#defining-attributes
        title: { type: String },
      },
    },
  },
});