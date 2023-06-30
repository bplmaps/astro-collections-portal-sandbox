// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const essayCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string().default('Astroship'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const teamCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

const itemCollection = defineCollection({
  type: "data",
  schema: z.object({
    itemType: z.enum(["digitalCommonwealth","internetArchive"]),
    tags: z.array(z.string()).optional()
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'essay': essayCollection,
  'item': itemCollection
};