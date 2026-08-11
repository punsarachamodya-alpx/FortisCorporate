import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// TODO: confirm domain — fortiscorporate.com is a placeholder until the client
// registers/confirms the domain (business email kavindu.abesuriya@fortiscorporate.com
// implies this domain, but it has not been confirmed as owned/registered).
const SITE_URL = 'https://fortiscorporate.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
