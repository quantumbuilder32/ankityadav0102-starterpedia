"use server"

import { db } from "@/db/db";
import { resourcesToCategories, resourcesToTags } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { resource, resourceSchema, tag, tagSchema } from "@/types"
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth"

export async function addResourceToTag(resourceIdObj: Pick<resource, "id">, tagNameObj: Pick<tag, "name">) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    resourceSchema.pick({ id: true }).parse(resourceIdObj)
    tagSchema.pick({ name: true }).parse(tagNameObj)

    await db.insert(resourcesToTags).values({
        resourceId: resourceIdObj.id,
        tagName: tagNameObj.name
    });
}

export async function removeResourceFromTag(resourceIdObj: Pick<resource, "id">, tagNameObj: Pick<tag, "name">) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    resourceSchema.pick({ id: true }).parse(resourceIdObj)
    tagSchema.pick({ name: true }).parse(tagNameObj)

    await db.delete(resourcesToTags).where(
        and(
            eq(resourcesToTags.resourceId, resourceIdObj.id),
            eq(resourcesToTags.tagName, tagNameObj.name),
        )
    )
}

export async function getResourcesFromTag(tagName: string, onlyGetApproved = true, seenLimit = 50, seenOffset = 0): Promise<resource[]> {
    const results = await db.query.resourcesToTags.findMany({
        limit: seenLimit,
        offset: seenOffset,
        where: eq(resourcesToCategories.categoryName, tagName),
        with: {
            resource: true
        }
    });

    return results.map(eachPair => eachPair.resource).filter(eachResource => onlyGetApproved ? eachResource.approved : true)
}