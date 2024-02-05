"use client"
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { UseQueryResult, useQuery, } from '@tanstack/react-query'
import { searchForResource } from '@/utility/serverFunctions/handleResources'
import { resource } from '@/types'
import EditResource from '@/components/resource/EditResource'

export default function ResourceSearch() {
    const debounceTimer = useRef<NodeJS.Timeout>()
    const [readyNameToSearch, readyNameToSearchSet] = useState("")

    const { data, isLoading, isError } = useQuery({
        queryKey: ['resourceSearch', readyNameToSearch],
        queryFn: async () => await searchForResource(readyNameToSearch),
        refetchOnWindowFocus: false,
        enabled: readyNameToSearch !== ""
    })

    return (
        <div style={{ display: "grid", marginTop: '1rem', padding: "1rem", gap: "1rem" }}>
            <h1>Search for resources</h1>

            <input type="text" placeholder="Filter by name" style={{ borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem", }}
                onChange={(e) => {
                    if (debounceTimer.current) clearTimeout(debounceTimer.current)

                    debounceTimer.current = setTimeout(() => {
                        readyNameToSearchSet(e.target.value)
                    }, 1000)
                }} />

            {isLoading && (
                <>
                    <p> searching for results</p>
                </>
            )}

            {isError && (
                <>
                    <p> error</p>
                </>
            )}

            {data && (
                <div>
                    {data.map(eachResource => {
                        return (
                            <EditResource key={eachResource.id} resource={eachResource} />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

