import Image from 'next/image'
import React, { useState } from 'react'

export type ResourceType = {
    id: string,
    imageSrc: string,
    title: string,
    category: string,
    sharedLink: string,
    dateCreated: Date
}

const todaysDate = new Date();

export default function Resource({ resource }: { resource: ResourceType }) {
    const [dayDifferenceTime,] = useState(() => {
        const timeDifference = todaysDate.getTime() - resource.dateCreated.getTime()
        return timeDifference / (1000 * 3600 * 24)
    })

    return (
        <div style={{ position: "relative" }}>
            {dayDifferenceTime <= 1 && (
                <div style={{ padding: ".5rem 1rem", backgroundColor: "var(--mainColor)", position: "absolute", top: 0, right: 0, borderRadius: "2rem", color: "#fff", margin: ".5rem" }}>new</div>
            )}

            <Image alt={`${resource.title}'s image`} src={resource.imageSrc} width={500} height={500} style={{ objectFit: "cover", }} />

            <div style={{ padding: "1rem" }}>
                <p>{resource.title}</p>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <p>{resource.category}</p>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>
                </div>
            </div>
        </div>
    )
}
