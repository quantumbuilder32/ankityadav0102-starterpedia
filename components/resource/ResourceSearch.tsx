"use client"
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { UseQueryResult, useQuery, } from '@tanstack/react-query'
import { searchForResource } from '@/utility/serverFunctions/handleResources'
import { resource } from '@/types'

export default function ResourceSearch({ querySet, ...elementProps }: { querySet: React.Dispatch<React.SetStateAction<UseQueryResult<resource[], Error> | undefined>> } & React.HTMLAttributes<HTMLInputElement>) {
    const debounceTimer = useRef<NodeJS.Timeout>()
    const [readyNameToSearch, readyNameToSearchSet] = useState("")

    const query = useQuery({
        queryKey: ['resourceSearch', readyNameToSearch],
        queryFn: async () => await searchForResource(readyNameToSearch),
        refetchOnWindowFocus: false,
        enabled: readyNameToSearch !== ""
    })

    const memoIzedQuery = useMemo(() => {
        return query
    }, [query.data])

    useEffect(() => {
        querySet(memoIzedQuery)
    }, [memoIzedQuery])

    return (
        <input type="text" placeholder="Filter by name" {...elementProps} style={{ borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem", ...elementProps?.style }}
            onChange={(e) => {
                if (debounceTimer.current) clearTimeout(debounceTimer.current)

                debounceTimer.current = setTimeout(() => {
                    readyNameToSearchSet(e.target.value)
                }, 1000)
            }} />
    )
}
