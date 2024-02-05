"use server"

import { db } from "@/db/db";
import { resources, resourcesToCategories } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { category, newResource, resource, resourceSchema } from "@/types"
import { eq, ilike } from "drizzle-orm";
import { getServerSession } from "next-auth"

// export async function addResource(seenResource: newResource) {
//     const session = await getServerSession(authOptions)
//     if (!session) throw new Error("not signed in")

//     const finalResource = {
//         ...seenResource,
//         userId: session.user.id,
//     }

//     resourceSchema.omit({ id: true, createdAt: true }).parse(finalResource)
//     await db.insert(resources).values(finalResource);
// }

export async function getAllCategories(): Promise<category[]> {
    const results = await db.query.categories.findMany();
    return results
}

export async function getAllResourceCategories(resourceIdObj: Pick<resource, "id">): Promise<category[] | undefined> {
    const results = await db.query.resources.findFirst({
        where: eq(resources.id, resourceIdObj.id),
        with: {
            categories: {
                with: { category: true }
            }
        }
    });

    return results ? results.categories.map(eachpair => eachpair.category) : undefined
}

