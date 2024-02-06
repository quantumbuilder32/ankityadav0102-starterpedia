import { z } from "zod";
//changes to schema must be reflected here for zod, server functions must also be updates with any new fields 

export const userSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).nullable(),
    email: z.string().min(1),
    emailVerified: z.date().nullable(),
    image: z.string().min(1),
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






//i like this
export const resourceSchema = z.object({
    id: z.number(),
    userId: z.string().min(1),
    name: z.string().min(1),
    link: z.string().min(1),
    description: z.string().min(1).nullable(),
    createdAt: z.date(),
    approved: z.boolean(),
    amountOfUserBookmarks: z.number(),
})
export const newResourceSchema = resourceSchema.omit({ id: true, createdAt: true, amountOfUserBookmarks: true })


export type resource = z.infer<typeof resourceSchema> & {
    author?: user,
    tags?: tag[],
    categories?: category[],
    usersThatBookmarked?: user[],
}
export type newResource = z.infer<typeof newResourceSchema>








export const categorySchema = z.object({
    name: z.string().min(1),
    amountOfResources: z.number()
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