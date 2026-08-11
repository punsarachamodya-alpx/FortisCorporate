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

export const collections = {
  services,
  faq,
  guides,
  blog,
  complianceDeadlines,
};
