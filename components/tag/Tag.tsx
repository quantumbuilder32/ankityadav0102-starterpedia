import React from 'react'

export default function Tag({ text, highlight = false }: { text: string, highlight?: boolean }) {
    return (
        <button style={{ backgroundColor: highlight ? "var(--secondaryColor)" : "", color: "#fff" }} >
            {text}
        </button>
    )
}
