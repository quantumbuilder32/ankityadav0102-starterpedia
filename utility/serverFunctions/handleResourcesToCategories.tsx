"use server"

import { db } from "@/db/db";
import { categories, resources, resourcesToCategories } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { resource, category, resourceSchema, categorySchema } from "@/types"
import { eq, sql, and } from "drizzle-orm";
import { getServerSession } from "next-auth"

export async function addResourceToCategory(resourceIdObj: Pick<resource, "id">, categoryNameObj: Pick<category, "name">) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    resourceSchema.pick({ id: true }).parse(resourceIdObj)
    categorySchema.pick({ name: true }).parse(categoryNameObj)

    await db.insert(resourcesToCategories).values({
        resourceId: resourceIdObj.id,
        categoryName: categoryNameObj.name
    });

    //update number on category
    await db.update(categories)
        .set({
            amountOfResources: sql`${categories.amountOfResources} + 1`,
        })
        .where(eq(categories.name, categoryNameObj.name));
}

export async function removeResourceFromCategory(resourceIdObj: Pick<resource, "id">, categoryNameObj: Pick<category, "name">) {
    const session = await getServerSession(authOptions)
    if (!session) throw new Error("not signed in")

    resourceSchema.pick({ id: true }).parse(resourceIdObj)
    categorySchema.pick({ name: true }).parse(categoryNameObj)

    await db.delete(resourcesToCategories).where(
        and(
            eq(resourcesToCategories.resourceId, resourceIdObj.id),
            eq(resourcesToCategories.categoryName, categoryNameObj.name),
        )
    )

    await db.update(categories)
        .set({
            amountOfResources: sql`${categories.amountOfResources} - 1`,
        })
        .where(eq(categories.name, categoryNameObj.name));
}

export async function getResourcesFromCategory(categoryName: string, onlyGetApproved = true, seenLimit = 50, seenOffset = 0): Promise<resource[]> {
    const results = await db.query.resourcesToCategories.findMany({
        limit: seenLimit,
        offset: seenOffset,
        where: eq(resourcesToCategories.categoryName, categoryName),
        with: {
            resource: true
        }
    });

    return results.map(eachPair => eachPair.resource).filter(eachResource => onlyGetApproved ? eachResource.approved : true)
}