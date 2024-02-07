"use server"

import { db } from "@/db/db";
import { resources, usersToBookmarks } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { resource, resourceSchema, user, userSchema, usersToBookmarksType } from "@/types"
import { eq, sql, and } from "drizzle-orm";
import { getServerSession } from "next-auth"

export async function bookmarkResource(userIdObj: Pick<user, "id">, resourceIdObj: Pick<resource, "id">) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    resourceSchema.pick({ id: true }).parse(resourceIdObj)
    userSchema.pick({ id: true }).parse(userIdObj)

    await db.insert(usersToBookmarks).values({
        userId: userIdObj.id,
        resourceId: resourceIdObj.id
    });

    //update number on resource
    await db.update(resources)
        .set({
            amountOfUserBookmarks: sql`${resources.amountOfUserBookmarks} + 1`,
        })
        .where(eq(resources.id, resourceIdObj.id));
}

export async function removeResourceBookmark(userIdObj: Pick<user, "id">, resourceIdObj: Pick<resource, "id">) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    resourceSchema.pick({ id: true }).parse(resourceIdObj)
    userSchema.pick({ id: true }).parse(userIdObj)

    await db.delete(usersToBookmarks).where(
        and(
            eq(usersToBookmarks.resourceId, resourceIdObj.id),
            eq(usersToBookmarks.userId, userIdObj.id),
        )
    )

    //update number on resource
    await db.update(resources)
        .set({
            amountOfUserBookmarks: sql`${resources.amountOfUserBookmarks} - 1`,
        })
        .where(eq(resources.id, resourceIdObj.id));
}

export async function checkIfResourceIsBookmarked(userIdObj: Pick<user, "id">, resourceIdObj: Pick<resource, "id">): Promise<boolean> {
    const session = await getServerSession(authOptions)
    if (!session) return false

    resourceSchema.pick({ id: true }).parse(resourceIdObj)
    userSchema.pick({ id: true }).parse(userIdObj)

    const result = await db.query.usersToBookmarks.findFirst({
        where: and(
            eq(usersToBookmarks.resourceId, resourceIdObj.id),
            eq(usersToBookmarks.userId, userIdObj.id),
        )
    })

    return result ? true : false
}

export async function getUserBookmarks(userIdObj: Pick<user, "id">, limit = 50, offset = 0): Promise<usersToBookmarksType[]> {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    userSchema.pick({ id: true }).parse(userIdObj)

    const results = await db.query.usersToBookmarks.findMany({
        where: eq(usersToBookmarks.userId, userIdObj.id),
        limit: limit,
        offset: offset,
        with: {
            resource: true
        }
    })

    return results
}