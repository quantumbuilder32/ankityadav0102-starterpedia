import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string().min(1).nullable(),
    userName: z.string().min(1),
    bio: z.string().min(1).nullable(),
    role: z.string().min(1).nullable(),
    createdAt: z.date(),
})

export type user = z.infer<typeof userSchema> & {
    resourcesPosted?: resource[],
    bookmarks?: resource[],
}
export type newUser = Omit<user, "id" | "createdAt">







export const resourceSchema = z.object({
    id: z.number(),
    authorId: z.number(),
    name: z.string().min(1),
    link: z.string().min(1),
    description: z.string().min(1).nullable(),
    createdAt: z.date(),
    approved: z.boolean(),
})

export type resource = z.infer<typeof resourceSchema> & {
    author?: user,
    tags?: tag[],
    categories?: category[],
    usersThatBookmarked?: user[],
}
export type newResource = Omit<resource, "id" | "createdAt">










export const categorySchema = z.object({
    name: z.string().min(1),
})

export type category = z.infer<typeof categorySchema> & {
    resources?: resource[],
}











export const tagSchema = z.object({
    name: z.string().min(1),
})

export type tag = z.infer<typeof tagSchema> & {
    resources?: resource[],
}