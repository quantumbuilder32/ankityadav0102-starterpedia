import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginButton() {
    const { data: session } = useSession()

    return (
        <div>LoginButton</div>
    )
}
