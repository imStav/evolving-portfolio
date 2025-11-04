import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
          title: z.string(),
          description: z.string(),
          technologies: z.array(z.string()),
          details: z.object({
            company: z.string(),
            companyPageUrl: z.string(),
            location: z.string(),
            jobType: z.string(),
            isHybrid: z.boolean(),
            from: z.string(),
            to: z.string(),
          }),
        })
    })
  }
})
