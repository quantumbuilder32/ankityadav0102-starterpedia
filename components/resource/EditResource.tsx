"use client"
import type { resource } from '@/types'
import { updateResource } from '@/utility/serverFunctions/handleResources'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function EditResource({ resource }: { resource: resource }) {
    const [resourceObj, resourceObjSet] = useState({ ...resource })

    const handleUpdate = async (passedResourceObj?: resource) => {
        const usingResourceObj = passedResourceObj ? passedResourceObj : resourceObj

        try {
            const seenUpdatedResource = await updateResource(usingResourceObj)
            resourceObjSet(seenUpdatedResource[0])

            toast.success("updated!")
        } catch (error) {
            toast.error("could not update")
            console.log(`$error`, error);
        }
    }


    return (
        <div style={{ display: "grid", alignContent: "flex-start", gap: "1rem", border: "3px solid var(--tone95)", padding: "1rem", borderRadius: "1rem" }}>
            <button style={{ justifySelf: "center" }} onClick={() => {
                const newObj: resource = { ...resourceObj, approved: !resourceObj.approved }
                handleUpdate(newObj)
            }}>{resourceObj.approved ? "Remove Approval" : "Approve"}</button>

            <div style={{ display: "grid", gap: "1rem" }}>
                <label>Resource Name</label>
                <input type='text' value={resourceObj.name} onChange={(e) => {
                    resourceObjSet(prevObj => {
                        const newObj = { ...prevObj }
                        newObj.name = e.target.value
                        return newObj
                    })
                }} placeholder='Please enter a name' />

                <label>Link</label>
                <input type='text' value={resourceObj.link} onChange={(e) => {
                    resourceObjSet(prevObj => {
                        const newObj = { ...prevObj }
                        newObj.link = e.target.value
                        return newObj
                    })
                }} placeholder='Please enter the resource link' />

                <label>Description <span style={{ fontWeight: "normal", fontSize: "var(--smallFontSize)" }}>- optional</span></label>
                <input type='text' value={resourceObj.description ?? ""} onChange={(e) => {
                    resourceObjSet(prevObj => {
                        const newObj = { ...prevObj }
                        newObj.description = e.target.value

                        if (newObj.description === "") newObj.description = null
                        return newObj
                    })
                }} placeholder='Please enter a desctiprion' />

                <button onClick={() => handleUpdate()}>Update</button>
            </div>
        </div>
    )
}
