"use server"

import { db } from "@/db/db";
import { categories, resources, users } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { newResource, newResourceSchema, resource, resourceSchema } from "@/types"
import { eq, ilike, desc, sql } from "drizzle-orm";
import { getServerSession } from "next-auth"

export async function getAllApprovedResources(seenLimit = 50, seenOffset = 0): Promise<resource[]> {
    const results = await db.query.resources.findMany({
        limit: seenLimit,
        offset: seenOffset,
        where: eq(resources.approved, true),
        with: {
            resourcesToTags: true
        }
    });

    return results
}

export async function getTopBookmarkedResources(seenLimit = 50, seenOffset = 0): Promise<resource[]> {
    const results = await db.query.resources.findMany({
        limit: seenLimit,
        offset: seenOffset,
        where: eq(resources.approved, true),
        orderBy: [desc(resources.amountOfUserBookmarks)],
    });

    return results
}

export async function getAmountOfResourceBookmarks(resourceIdObj: Pick<resource, "id">): Promise<number> {
    resourceSchema.pick({ id: true }).parse(resourceIdObj)

    const results = await db.query.resources.findFirst({
        where: eq(resources.id, resourceIdObj.id),
    });

    return results ? results.amountOfUserBookmarks : 0
}

export async function getAllUnapprovedResources(seenLimit = 50, seenOffset = 0): Promise<resource[]> {
    const results = await db.query.resources.findMany({
        limit: seenLimit,
        offset: seenOffset,
        where: eq(resources.approved, false),
    });

    return results
}

export async function updateResource(seenResource: resource) {

    const newResource = resourceSchema.omit({ createdAt: true }).parse(seenResource)

    const session = await getServerSession(authOptions)
    if (!session) throw new Error("No session")

    if (seenResource.userId !== session.user.id && session.user.role !== "Admin") throw new Error("Not correct user to update this resource")

    return await db.update(resources)
        .set({
            ...newResource,
        })
        .where(eq(resources.id, newResource.id))
        .returning();
}

export async function searchForResource(resourceName: string): Promise<resource[]> {
    const seenResources = await db.query.resources.findMany({
        where: ilike(resources.name, `%${resourceName.toLowerCase()}%`),
    });

    return seenResources
}

export async function addResource(seenResource: newResource) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    const finalResource = {
        ...seenResource,
        userId: session.user.id,
    }

    newResourceSchema.parse(finalResource)

    await db.insert(resources).values(finalResource);

    //update user column
    await db.update(users)
        .set({
            amtOfResourcesPosted: sql`${users.amtOfResourcesPosted} + 1`
        }).where(eq(users.id, session.user.id))
}


export async function deleteResource(seenResource: resource) {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.id !== seenResource.userId && session.user.role !== "Admin")) throw new Error("no authority to delete this")

    await db.delete(resources).where(eq(resources.id, seenResource.id));

    //update user column
    await db.update(users)
        .set({
            amtOfResourcesPosted: sql`${users.amtOfResourcesPosted} - 1`
        }).where(eq(users.id, session.user.id))
}