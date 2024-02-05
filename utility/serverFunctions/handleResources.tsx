"use server"

import { db } from "@/db/db";
import { resources } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { newResource, resource, resourceSchema } from "@/types"
import { eq, ilike } from "drizzle-orm";
import { getServerSession } from "next-auth"

export async function addResource(seenResource: newResource) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    const finalResource = {
        ...seenResource,
        userId: session.user.id,
    }

    resourceSchema.omit({ id: true, createdAt: true }).parse(finalResource)
    await db.insert(resources).values(finalResource);
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