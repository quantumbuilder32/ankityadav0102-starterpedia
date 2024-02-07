import ViewResource from '@/components/resource/ViewResource'
import DisplayUser from '@/components/user/DisplayUser'
import ShowUserResources from '@/components/user/ShowUserResources'
import { authOptions } from '@/lib/auth'
import { getTopUsers } from '@/utility/serverFunctions/handleUsers'
import { getUserBookmarks } from '@/utility/serverFunctions/handleUsersToBookmarks'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {
    const topUsers = await getTopUsers()

    return (
        <main style={{}}>
            <div style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
                {topUsers.map(eachUser => {
                    return (
                        <div key={eachUser.id} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <div style={{ display: "grid", gap: "1rem", alignContent: "flex-start" }}>
                                <DisplayUser seenUser={eachUser} />

                                <p>Resources Posted {eachUser.amtOfResourcesPosted}</p>
                            </div>

                            <div style={{ flex: "1 1 300px" }}>
                                <ShowUserResources userId={eachUser.id} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}
