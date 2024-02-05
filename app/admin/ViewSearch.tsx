"use client"
import EditResource from '@/components/resource/EditResource'
import ResourceSearch from '@/components/resource/ResourceSearch'
import { resource } from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function ViewSearch() {
    const [query, querySet] = useState<UseQueryResult<resource[], Error>>()

    return (
        <div style={{ display: "grid", marginTop: '1rem', padding: "1rem", gap: "1rem" }}>
            <h1>Search for resources</h1>

            <ResourceSearch querySet={querySet} />

            {query !== undefined && (
                <>
                    {query.isLoading && (
                        <>
                            <p> searching for results</p>
                        </>
                    )}

                    {query.isError && (
                        <>
                            <p> error</p>
                        </>
                    )}

                    {query.data !== undefined && (
                        <div>
                            {query.data.map(eachResource => {
                                return (
                                    <EditResource key={eachResource.id} resource={eachResource} />
                                )
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
