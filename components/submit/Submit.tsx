"use client"
import { newResource } from '@/types'
import { addResource } from '@/utility/serverFunctions/handleResources'
import { Session } from 'next-auth'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast/headless'
import { redirect } from "next/navigation";

const initialResourceObj: newResource = {
    name: "",
    link: "",
    description: "",
    userId: "",
    approved: false,
}

export default function Submit({ session }: { session: Session | null }) {
    const [wantsToSubmit, wantsToSubmitSet] = useState(false)
    const [resourceObj, resourceObjSet] = useState({ ...initialResourceObj })

    const handleSubmit = async () => {
        try {
            await addResource(resourceObj)

            toast.success("sent for approval!")
            resourceObjSet({ ...initialResourceObj })

        } catch (error) {
            toast.error("error happened")
            console.log(`$error`, error);
        }
    }

    return (
        <>
            <button onClick={() => {
                if (!session) redirect(`/api/auth/signin`)

                wantsToSubmitSet(prev => !prev)
            }}>Submit ↪</button>

            {wantsToSubmit && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "grid", justifyItems: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.05)" }} onClick={() => wantsToSubmitSet(false)}>
                    <div style={{ width: 'min(100%, 400px)', maxHeight: "70vh", overflow: "auto", backgroundColor: "#fff", display: "grid", gap: "1rem", alignContent: "flex-start", padding: "2rem", borderTopLeftRadius: "2rem", cursor: "default" }} onClick={(e) => e.stopPropagation()}>
                        <h1>Submit a resource</h1>

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

                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </>
    )
}
