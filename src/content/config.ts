import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    anchor: z.string(),
    order: z.number(),
    summary: z.string(),
    subservices: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    ),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    order: z.number(),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().default('Fortis Corporate Services'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
  }),
});

const complianceDeadlines = defineCollection({
  type: 'data',
  schema: z.object({
    deadlines: z.array(
      z.object({
        obligation: z.string(),
        appliesTo: z.string(),
        indicativeTiming: z.string(),
        notes: z.string().optional(),
      })
    ),
  }),
});

// --- Site-wide settings & per-page copy ---------------------------------
// These exist so an editor can change firm details and page copy from the
// Decap CMS admin panel without touching code. Navigation structure
// (primaryNav, footerLegalLinks, serviceCategorySlugs) and technical config
// (the live domain, GA4 wiring) stay in src/lib/site.ts — editing those
// wrong would break routing/build, so they're not exposed as free-text CMS
// fields.

const siteSettings = defineCollection({
  type: 'data',
  schema: z.object({
    legalName: z.string(),
    tradingName: z.string(),
    registrationNo: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    phoneDisplay: z.string(),
    phoneE164: z.string(),
    whatsappNumber: z.string(),
    email: z.string(),
    officeHours: z.string(),
    footerTagline: z.string(),
  }),
});

const homeContent = defineCollection({
  type: 'data',
  schema: z.object({
    heroEyebrow: z.string(),
    heroHeadline: z.string(),
    heroSubheadline: z.string(),
    stats: z.array(
      z.object({
        value: z.number(),
        suffix: z.string().optional(),
        label: z.string(),
      })
    ),
    servicesEyebrow: z.string(),
    servicesHeading: z.string(),
    whyFortisEyebrow: z.string(),
    whyFortisHeading: z.string(),
    whyFortis: z.array(z.object({ title: z.string(), body: z.string() })),
    whoWeServeEyebrow: z.string(),
    whoWeServeHeading: z.string(),
    whoWeServe: z.array(z.object({ group: z.string(), line: z.string() })),
    coverageLine: z.string(),
    ctaHeading: z.string(),
    ctaBody: z.string(),
  }),
});

const aboutContent = defineCollection({
  type: 'data',
  schema: z.object({
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    paragraphs: z.array(z.string()),
    statsEyebrow: z.string(),
    statsHeading: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    ctaHeading: z.string(),
    ctaBody: z.string(),
  }),
});

const servicesContent = defineCollection({
  type: 'data',
  schema: z.object({
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    heroSubheading: z.string(),
    ctaHeading: z.string(),
    ctaBody: z.string(),
  }),
});

const resourcesContent = defineCollection({
  type: 'data',
  schema: z.object({
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    heroSubheading: z.string(),
    guidesEyebrow: z.string(),
    guidesHeading: z.string(),
    complianceEyebrow: z.string(),
    complianceHeading: z.string(),
    complianceIntro: z.string(),
    complianceDisclaimer: z.string(),
    downloadGateHeading: z.string(),
    downloadGateBody: z.string(),
    ctaHeading: z.string(),
    ctaBody: z.string(),
  }),
});

const faqContent = defineCollection({
  type: 'data',
  schema: z.object({
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    ctaHeading: z.string(),
    ctaBody: z.string(),
  }),
});

const contactContent = defineCollection({
  type: 'data',
  schema: z.object({
    heroEyebrow: z.string(),
    heroHeading: z.string(),
    heroSubheading: z.string(),
    whatsappButtonLabel: z.string(),
    formHeading: z.string(),
    formIntro: z.string(),
  }),
});

const legalPages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string(),
  }),
});

export const collections = {
  services,
  faq,
  guides,
  blog,
  complianceDeadlines,
  siteSettings,
  homeContent,
  aboutContent,
  servicesContent,
  resourcesContent,
  faqContent,
  contactContent,
  legalPages,
};
