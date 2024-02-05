import React from 'react'
import Link from "next/link"

export default function Logo() {
    return (
        <Link href={"/"}><p style={{ fontWeight: "bold", fontSize: "var(--largeFontSize)" }}>Starterpedia</p></Link>
    )
}
