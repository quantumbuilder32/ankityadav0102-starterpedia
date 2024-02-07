"use server"

import { db } from "@/db/db";
import { resources, users } from "@/db/schema";
import { resource, user, userSchema } from "@/types"
import { eq, ilike, desc, sql, and } from "drizzle-orm";

export async function getTopUsers(seenLimit = 50, seenOffset = 0): Promise<user[]> {
    const results = await db.query.users.findMany({
        limit: seenLimit,
        offset: seenOffset,
        orderBy: desc(users.amtOfResourcesPosted)
    });

    return results
}

export async function getUserPostedResources(userIdObj: Pick<user, "id">, seenLimit = 50, seenOffset = 0, onlyShowApproved = true): Promise<resource[]> {

    userSchema.pick({ id: true }).parse(userIdObj)

    const results = onlyShowApproved ?
        await db.query.resources.findMany({
            limit: seenLimit,
            offset: seenOffset,
            where: and(eq(resources.userId, userIdObj.id), eq(resources.approved, true))
        }) :
        await db.query.resources.findMany({
            limit: seenLimit,
            offset: seenOffset,
            where: eq(resources.userId, userIdObj.id)
        })

    return results
}
