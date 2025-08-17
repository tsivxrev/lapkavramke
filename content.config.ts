import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            type: "page",
            source: "*.md",
        }),
        pets: defineCollection({
            type: "page",
            source: "pets/**.yml",
            schema: z.object({
                name: z.string(),
                cover: z.string(),
                avatar: z.string(),
                description: z.string(),
                birthday: z.string(),
                funFacts: z.array(z.string()),
                favorites: z.array(
                    z.object({
                        icon: z.string(),
                        label: z.string(),
                        content: z.string(),
                    }),
                ),
                photos: z.array(
                    z.object({ url: z.string(), caption: z.string() }),
                ),
                theme: z.object({
                    colorMode: z.string(),
                    primary: z.string(),
                    neutral: z.string(),
                }),
                type: z.string(),
                sex: z.string(),
            }),
        }),
    }
});
