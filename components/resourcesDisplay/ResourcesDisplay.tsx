"use client"
import Resource, { ResourceType } from "../resource/Resource"
import styles from "./resource.module.css"

const resources: ResourceType[] = [
    {
        id: "askskskfjsine",
        category: "courses",
        dateCreated: new Date("2024-02-03"),
        imageSrc: "https://assets-global.website-files.com/63bc24277d11efd498c4b12c/659be985dc2cefbdf6a31ac2_groove-thumbnail.svg",
        sharedLink: "",
        title: "Groove"
    },
    {
        id: "smaskskdfuqjsmam",
        category: "courses",
        dateCreated: new Date("2024-02-01"),
        imageSrc: "https://assets-global.website-files.com/63bc24277d11efd498c4b12c/65ae3c5cf0c9b2284528d810_tella-thumbnail.png",
        sharedLink: "",
        title: "Tella"
    },
    {
        id: "asojdkamskxnaxmzma",
        category: "courses",
        dateCreated: new Date("2024-01-01"),
        imageSrc: "https://assets-global.website-files.com/63bc24277d11efd498c4b12c/659be345c662712c303feda7_adobe-creative-cloud-thumbnail.png",
        sharedLink: "",
        title: "Adobe Creative Cloud"
    }
]

export default function ResourcesDisplay() {
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: "auto auto auto", gap: "1rem", justifyContent: "space-between", alignItems: "center", paddingInline: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ border: '1px solid var(--tone95)', padding: '.5rem 1rem', borderRadius: ".2rem" }}>Filter</div>

                <div className="noScrollBar" style={{ display: "flex", gap: "1rem", overflow: "auto" }}>
                    <div className={styles.categoryButton}>Tools <span>21</span></div>
                    <div className={styles.categoryButton}>Articles <span>54</span></div>
                    <div className={styles.categoryButton}>Communities <span>73</span></div>
                    <div className={styles.categoryButton}>Books <span>81</span></div>
                    <div className={styles.categoryButton}>Courses <span>20</span></div>
                    <div className={styles.categoryButton}>Newsletters <span>80</span></div>
                    <div className={styles.categoryButton}>Videos <span>19</span></div>
                    <div className={styles.categoryButton}>Podcasts <span>33</span></div>
                    <div className={styles.categoryButton}>Threads <span>15</span></div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "center", gap: "1rem", maxWidth: "1000px", margin: "0 auto", padding: "1rem" }}>
                {resources.map(eachResource => {
                    return (
                        <Resource key={eachResource.id} resource={eachResource} />
                    )
                })}
            </div>
        </div>
    )
}
