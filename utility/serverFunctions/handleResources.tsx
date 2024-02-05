"use server"

import { db } from "@/db/db";
import { resources } from "@/db/schema";
import { authOptions } from "@/lib/auth"
import { newResource, resource, resourceSchema } from "@/types"
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