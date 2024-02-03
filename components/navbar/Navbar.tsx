"use client"
import Link from "next/link"
import styles from "./navbar.module.css"
import { useState } from "react"
import { useAtom } from "jotai"
import { screenSizeGlobal } from "@/utility/ResizeChecker"

export default function Navbar() {
    const [showingNav, showingNavSet] = useState(false)
    const [screenSize, screenSizeSet] = useAtom(screenSizeGlobal)

    return (
        <nav className={styles.mainNav}>
            <p style={{ fontWeight: "bold", fontSize: "var(--largeFontSize)" }}>Starterpedia</p>

            <div className={styles.barIcon} onClick={() => showingNavSet(prev => !prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            </div>

            <ul style={{ display: !screenSize.desktop && !showingNav ? "none" : "" }} className={styles.mainMenu}>
                <li><Link href={""}>Leaderboards</Link></li>
                <li><Link href={""}>Bookmarks</Link></li>
                <li><Link href={""}>Advertise</Link></li>
                <li><Link href={""}>About</Link></li>
            </ul>

            <div className={styles.rightNavCont}>
                <Link href={""}>Submit</Link>

                <div style={{ display: "flex", flexWrap: 'wrap', gap: "1rem" }}>
                    <Link href={""}>Login</Link>
                    <Link href={""}>Sign Up</Link>
                </div>
            </div>
        </nav>
    )
}
