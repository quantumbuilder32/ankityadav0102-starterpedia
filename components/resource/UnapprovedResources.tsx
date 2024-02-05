"use client"
import React from 'react'
import { useQuery, } from '@tanstack/react-query'
import { getAllUnapprovedResources } from '@/utility/serverFunctions/handleResources'
import { resource } from '@/types'
import EditResource from './EditResource'

export default function UnapprovedResources({ initialResources }: { initialResources?: resource[] }) {

    const { isPending, error, data: resurcesData } = useQuery({
        queryKey: ['unapprovedResources'],
        queryFn: async () => await getAllUnapprovedResources(),
        initialData: initialResources,
        refetchOnWindowFocus: false,
        enabled: initialResources && initialResources.length > 0 ? false : true
    })

    return (
        <div style={{ display: "grid" }}>
            {isPending && (
                <p>Loading resources...</p>
            )}

            {error && (
                <p>Error Loading resources {error.message}</p>
            )}
            <div style={{ padding: "1rem" }}>
                <h1>Resources to approve</h1>
            </div>

            {resurcesData && (
                <div style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "min(80%, 400px)", gap: "1rem", overflow: "auto", padding: "1rem", }}>
                    {resurcesData.map(eachResource => {
                        return (
                            <EditResource key={eachResource.id} resource={eachResource} />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
