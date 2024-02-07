import ViewResource from '@/components/resource/ViewResource'
import { authOptions } from '@/lib/auth'
import { getUserBookmarks } from '@/utility/serverFunctions/handleUsersToBookmarks'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) redirect(`/api/auth/signin`)

    const userBookmarks = await getUserBookmarks({ id: session.user.id })

    return (
        <main style={{}}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%),1fr))", gap: "1rem", padding: "1rem" }}>
                {userBookmarks.map(eachBookmark => {
                    return (
                        <ViewResource key={eachBookmark.resourceId} resource={eachBookmark.resource!} />
                    )
                })}
            </div>
        </main>
    )
}
