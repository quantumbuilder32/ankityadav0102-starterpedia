import Link from "next/link"
import styles from "./navbar.module.css"

export default function Navbar() {
    return (
        <nav className={styles.mainNav}>
            <p style={{ fontWeight: "bold", fontSize: "var(--largeFontSize)" }}>Starterpedia</p>

            <ul className={styles.mainMenu}>
                <li><Link href={""}>Leaderboards</Link></li>
                <li><Link href={""}>Bookmarks</Link></li>
                <li><Link href={""}>Advertise</Link></li>
                <li><Link href={""}>About</Link></li>
            </ul>

            <div className={styles.rightNavCont}>
                <Link href={""}>Submit</Link>
                <Link href={""}>Login</Link>
                <Link href={""}>Sign Up</Link>
            </div>
        </nav>
    )
}
