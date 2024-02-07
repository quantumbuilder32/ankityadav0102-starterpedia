import React from 'react'
import Logo from '../logo/Logo'
import styles from "./footer.module.css"
import Link from 'next/link'

export default function Footer() {
    return (
        <footer style={{ backgroundColor: "#000", color: "#fff", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", maxWidth: "1000px", margin: "0 auto" }}>
                <div style={{ display: "flex", flex: 2, flexDirection: "column", gap: "1rem" }}>
                    <Logo />

                    <p>the best of breeders</p>

                    <h3>Subscribe to our newsletter and get the best resources every week</h3>

                    <div style={{ display: 'flex', backgroundColor: "#fff", borderRadius: ".2rem", padding: ".1rem 1rem .1rem 0" }}>
                        <input style={{ flex: 1, minWidth: 0 }} type='text' placeholder='Enter Email' />

                        <button style={{ backgroundColor: "var(--secondaryColor)", padding: "0 .5rem", borderRadius: ".2rem" }}>Subscribe</button>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <ul className={styles.mainMenu}>
                        <p>Links</p>
                        <li><Link href={``}>Privacy Policy</Link></li>
                        <li><Link href={``}>Contact</Link></li>
                        <li><Link href={``}>About</Link></li>
                        <li><Link href={``}>Terms and Conditions</Link></li>
                        <li><Link href={``}>Our Resources</Link></li>
                    </ul>
                </div>

                <div style={{ flex: 1 }}>
                    <ul className={styles.mainMenu}>
                        <p>Follow Us</p>
                        <li><Link href={``}>Twitter</Link></li>
                        <li><Link href={``}>Youtube</Link></li>
                        <li><Link href={``}>Telegram</Link></li>
                        <li><Link href={``}>Reddit</Link></li>
                        <li><Link href={``}>Github</Link></li>
                    </ul>
                </div>
            </div>

            <p style={{ textAlign: "center" }}>@2024 Staterperdia, All rights reserved</p>
        </footer>
    )
}
