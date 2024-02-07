"use server"

import { db } from "@/db/db";
import { resources } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { category, categorySchema, newResource, resource, resourceSchema, resourcesToTags, tag, tagSchema } from "@/types"
import { eq, and } from "drizzle-orm";
import { getServerSession } from "next-auth"

export async function getAllTags(): Promise<tag[]> {
    const results = await db.query.tags.findMany();
    return results
}

export async function getAllResourceTags(resourceIdObj: Pick<resource, "id">): Promise<resourcesToTags[] | undefined> {
    const results = await db.query.resources.findFirst({
        where: eq(resources.id, resourceIdObj.id),
        with: {
            resourcesToTags: true
        }
    });

    return results ? results.resourcesToTags : undefined
}

