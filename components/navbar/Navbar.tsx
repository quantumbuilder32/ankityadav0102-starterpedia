"use client"
import Link from "next/link"
import styles from "./navbar.module.css"
import { useState } from "react"
import { useAtom } from "jotai"
import { screenSizeGlobal } from "@/utility/ResizeChecker"
import Logo from "../logo/Logo"
import { signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"
import Image from "next/image";
import Submit from "../submit/Submit"

export default function Navbar({ session }: { session: Session | null }) {
    const [showingNav, showingNavSet] = useState(false)
    const [screenSize,] = useAtom(screenSizeGlobal)

    return (
        <nav className={styles.mainNav}>
            <Logo />

            {!screenSize.desktop && (
                <>
                    <Submit session={session} />
                </>
            )}

            <div className={styles.barIcon} onClick={() => showingNavSet(prev => !prev)}>
                <svg style={{ opacity: showingNav ? 1 : 0, rotate: showingNav ? "0deg" : "40deg", position: "absolute", top: "50%", left: "50%", translate: "-50% -50%", transition: "rotate 200ms", width: "2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>

                <svg style={{ opacity: !showingNav ? 1 : 0, rotate: !showingNav ? "0deg" : "-40deg", position: "absolute", top: "50%", left: "50%", translate: "-50% -50%", transition: "rotate 200ms", width: "1.7rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            </div>


            <ul style={{ display: !screenSize.desktop && !showingNav ? "none" : "" }} className={styles.mainMenu}>
                <li><Link href={""}>Leaderboard</Link></li>
                <li><Link href={""}>Bookmarks</Link></li>
                <li><Link href={""}>Advertise</Link></li>
                <li><Link href={""}>About</Link></li>

                {showingNav && (
                    <>
                        <SignInButtons linkStyles={{ margin: "0 auto" }} buttonStyles={{ width: "90vw", maxWidth: "400px", borderRadius: ".2rem" }} session={session} />
                    </>
                )}
            </ul>

            <div style={{ display: !screenSize.desktop ? "none" : "" }} className={styles.rightNavCont}>
                <Submit session={session} />

                <SignInButtons session={session} />
            </div>
        </nav>
    )
}

function SignInButtons({ linkStyles, buttonStyles, session }: { linkStyles?: React.CSSProperties, buttonStyles?: React.CSSProperties, session?: Session | null }) {

    return (
        <>
            {session?.user ? (
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Image alt="logo" src={session.user.image} width={40} height={40} style={{ objectFit: "cover" }} />
                    <Link style={{ ...linkStyles }} href={""}><button style={{ ...buttonStyles }} onClick={() => signOut()}>Sign Out</button></Link>
                </div>
            ) : (
                <>
                    <Link style={{ ...linkStyles }} href={""}><button style={{ ...buttonStyles }} onClick={() => signIn()}>Login</button></Link>
                    <Link style={{ ...linkStyles }} href={""}><button style={{ ...buttonStyles }} onClick={() => signIn()}>Sign Up</button></Link>
                </>
            )}
        </>
    )
}

