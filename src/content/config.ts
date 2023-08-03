// 1. Import utilities from `astro:content`
import { z, reference, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const discover = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string()
  }),
});


const itemCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(reference('item')),
    featured: reference('item')
  }).superRefine(
    ({items, featured}, ctx) => {
      if (!items.map((d) => d.id).includes(featured.id)) {
        ctx.addIssue({
          code: "custom",
          message: "`featured` must be included in `items`",
          path: ["featured"]
        })
      }
    }
  ),
}); 

const item = defineCollection({
  type: "data",
  schema: z.object({
    itemType: z.enum(["digitalCommonwealth", "internetArchive"]),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional()
  })
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'discover': discover,
  'collection-group': itemCollection,
  'item': item
};