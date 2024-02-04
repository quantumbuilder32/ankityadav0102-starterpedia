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

                <div style={{ display: "flex", gap: "1rem", overflow: "auto" }}>
                    <div className={styles.categoryButton}>Tools</div>
                    <div className={styles.categoryButton}>Articles</div>
                    <div className={styles.categoryButton}>Communities</div>
                    <div className={styles.categoryButton}>Books</div>
                    <div className={styles.categoryButton}>Courses</div>
                </div>

                <div style={{ border: '1px solid var(--tone95)', padding: '.5rem 1rem', borderRadius: ".2rem" }}>Sort By</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px,100%), 1fr))", justifyContent: "center", gap: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
                {resources.map(eachResource => {
                    return (
                        <Resource key={eachResource.id} resource={eachResource} />
                    )
                })}
            </div>
        </div>
    )
}
