import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md'
    }),
    courses: defineCollection({
      type: 'data',
      source: 'courses/**/*.yml',
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
          images: z.array(z.string()).optional(),
          badgeText: z.string().optional()
        }).optional(),
        courseContent: z.object({
          title: z.string().optional(),
          content: z.string()
        }).optional(),
        credentials: z.object({
          title: z.string().optional(),
          licenseNumber: z.string().optional(),
          licenseOrg: z.string().optional(),
          accreditations: z.array(z.object({
            title: z.string(),
            icon: z.string().optional(),
            description: z.string()
          })).optional(),
          documents: z.array(z.object({
            title: z.string(),
            image: z.string(),
            description: z.string()
          })).optional(),
          verifyLink: z.string().optional(),
          verifyText: z.string().optional()
        }).optional(),
        steps: z.object({
          title: z.string().optional(),
          subtitle: z.string().optional(),
          items: z.array(z.object({
            number: z.string(),
            title: z.string(),
            description: z.string()
          })).optional()
        }).optional(),
        salary: z.object({
          title: z.string().optional(),
          amount: z.string().optional(),
          period: z.string().optional(),
          description: z.string().optional(),
          industries: z.array(z.string()).optional()
        }).optional(),
        faq: z.array(z.object({
          question: z.string(),
          answer: z.string(),
          link: z.string().optional(),
          linkText: z.string().optional()
        })).optional()
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
