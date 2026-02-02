import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md'
    }),
    courses: defineCollection({
      type: 'page',
      source: {
        include: 'courses/**/*.md',
        prefix: '/'
      },
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        slug: z.string(),
        seo: z.object({
          title: z.string(),
          description: z.string()
        }).optional(),
        hero: z.object({
          title: z.string(),
          subtitle: z.string().optional(),
          price: z.string(),
          oldPrice: z.string().optional(),
          ctaText: z.string().optional(),
          urgencyText: z.string().optional(),
          features: z.array(z.string()).optional(),
          images: z.array(z.string()).optional(),
          badgeText: z.string().optional()
        }).optional(),
        courseContentTitle: z.string().optional()
      })
    }),
    faq: defineCollection({
      type: 'page',
      source: 'faq/**/*.md',
      schema: z.object({
        title: z.string(),
        order: z.number().default(0),
        link: z.string().optional(),
        linkText: z.string().optional()
      })
    })
  }
})
