import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md'
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
