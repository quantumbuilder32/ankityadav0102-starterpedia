"use client"
import { getUserPostedResources } from '@/utility/serverFunctions/handleUsers'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import ViewResource from '../resource/ViewResource'
import { useRouter } from 'next/navigation'
export default function ShowUserResources({ userId }: { userId: string }) {
    const [searchingForUserResources, searchingForUserResourcesSet] = useState(false)

    const { data: resourceData, isLoading: resourcesIsLoading } = useQuery({
        queryKey: ["userResources", userId],
        queryFn: async () => await getUserPostedResources({ id: userId }),
        refetchOnWindowFocus: false,
        enabled: searchingForUserResources
    })

    return (
        <div style={{ display: "grid", alignItems: "center", minHeight: "100%", padding: "1rem" }}>
            {searchingForUserResources ? (
                <div style={{ overflow: "auto", display: "grid", gridAutoFlow: "column", gridAutoColumns: "min(200px, 80%)", gap: "1rem", }}>
                    {resourceData?.map(eachResource => {
                        return (
                            <ViewResource key={eachResource.id} resource={eachResource} />
                        )
                    })}
                </div>
            ) : (
                <>
                    <button style={{ justifySelf: "center" }} onClick={() => { searchingForUserResourcesSet(true) }}>See their resources</button>
                </>
            )}
        </div>
    )
}
