"use client"
import { newResource } from '@/types'
import { addResource } from '@/utility/serverFunctions/handleResources'
import { Session } from 'next-auth'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation";

const initialResourceObj: newResource = {
    name: "",
    link: "",
    userId: "",
    approved: false,
    description: null,
}

export default function Submit({ session }: { session: Session | null }) {
    const router = useRouter()
    const [wantsToSubmit, wantsToSubmitSet] = useState(false)
    const [resourceObj, resourceObjSet] = useState({ ...initialResourceObj })

    const handleSubmit = async () => {
        try {
            console.log(`$sending`, resourceObj);
            await addResource(resourceObj)

            toast.success("sent for approval!")
            resourceObjSet({ ...initialResourceObj })

        } catch (error) {
            toast.error("could not submit")
            console.log(`$error`, error);
        }
    }

    return (
        <>
            <button onClick={() => {
                if (!session) {
                    console.log(`$redirecting`);
                    router.push(`/api/auth/signin`)
                }

                wantsToSubmitSet(prev => !prev)
            }}>Submit ↪</button>

            {wantsToSubmit && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "grid", justifyItems: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.05)" }} onClick={() => wantsToSubmitSet(false)}>
                    <div style={{ width: 'min(100%, 400px)', maxHeight: "70vh", overflow: "auto", backgroundColor: "#fff", display: "grid", gap: "1rem", alignContent: "flex-start", padding: "2rem", borderTopLeftRadius: "2rem", cursor: "default" }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h1>Submit a resource</h1>

                            <div onClick={() => { wantsToSubmitSet(false) }}>
                                <svg style={{ width: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                            </div>
                        </div>

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
