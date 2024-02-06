import { resource } from "@/types"
import ViewResource from "../resource/ViewResource"
import styles from "./resource.module.css"

export default async function ResourcesDisplay({ resources }: { resources: resource[] }) {

    return (
        <div className="resizePadding" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "center", gap: "1rem", maxWidth: "1000px", margin: "0 auto", }}>
            {resources.map(eachResource => {
                return (
                    <ViewResource key={eachResource.id} resource={eachResource} />
                )
            })}
        </div>
    )
}
