import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { getAllUnapprovedResources } from '@/utility/serverFunctions/handleResources'
import EditResource from '@/components/resource/EditResource'
import UnapprovedResources from '@/components/resource/UnapprovedResources'
import { resource } from '@/types'
import ResourceSearch from '../../components/resource/ResourceSearch'

const tempresources: resource[] = JSON.parse(`[
    {
        "id": 1,
        "userId": "bd900ada-5a75-4b3c-96f7-c013b5358e62",
        "name": "emails",
        "link": "https://reallygoodemails.com/",
        "description": "nice emails",
        "createdAt": "2024-02-05T09:50:50.000Z",
        "approved": false
    },
    {
        "id": 2,
        "userId": "8c44ecee-9813-4e16-845b-a9371c89ab1c",
        "name": "Starterpedia ",
        "link": "starterpedia.com",
        "description": "A resource directory website ",
        "createdAt": "2024-02-05T10:00:31.000Z",
        "approved": false
    }
]`).map((eachResource: resource) => {
    eachResource.createdAt = new Date(eachResource.createdAt)
    return eachResource
}) as resource[]

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session) redirect(`/api/auth/signin`)

    if (session.user.role !== "Admin") {
        return <p>No permissions to view this page</p>
    }

    //admin screen
    //first see resources that need to be approved
    //can click on them and edit
    //so need a resource editing screen

    // const resources = tempresources
    const resources = await getAllUnapprovedResources()

    return (
        <main style={{}}>
            <div style={{ padding: "1rem" }}>
                {session.user.name && (
                    <h2>Welcome Admin <span style={{ fontWeight: "bold" }}>- {session.user.name}</span></h2>
                )}
            </div>

            <UnapprovedResources initialResources={resources} />

            <ResourceSearch />
        </main>
    )
}
