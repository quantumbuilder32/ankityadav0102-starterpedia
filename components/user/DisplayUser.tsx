import { user } from '@/types'
import Image from 'next/image'
import React from 'react'

export default function DisplayUser({ seenUser }: { seenUser: user }) {
    return (
        <div style={{ display: "grid", gap: "1rem", alignContent: "flex-start" }}>
            <p>{seenUser.name}</p>

            {seenUser.image && (
                <Image alt={`${seenUser.name}'s pfp`} src={seenUser.image} height={50} width={50} style={{ objectFit: "contain" }} />
            )}
        </div>
    )
}
