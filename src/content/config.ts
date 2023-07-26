// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const discoverCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string()
  }),
});

const collectionGroupCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(z.object({ "identifier": z.string(), "featured": z.boolean().optional() }))
  }),
});

const itemCollection = defineCollection({
  type: "data",
  schema: z.object({
    itemType: z.enum(["digitalCommonwealth", "internetArchive"]),
    tags: z.array(z.string()).optional()
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'discover': discoverCollection,
  'collection-group': collectionGroupCollection,
  'item': itemCollection
};