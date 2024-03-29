"use client"
import type { resource } from '@/types'
import { getAllCategories, getAllResourceCategories } from '@/utility/serverFunctions/handleCategories'
import { updateResource } from '@/utility/serverFunctions/handleResources'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import CategoryDisplay from '../categories/CategoryDisplay'
import { addResourceToCategory, removeResourceFromCategory } from '@/utility/serverFunctions/handleResourcesToCategories'
import { getAllResourceTags, getAllTags } from '@/utility/serverFunctions/handleTags'
import { addResourceToTag, removeResourceFromTag } from '@/utility/serverFunctions/handleResourcesToTags'
import Tag from '../tag/Tag'

export default function EditResource({ resource }: { resource: resource }) {
    const queryClient = useQueryClient()

    const [resourceObj, resourceObjSet] = useState({ ...resource })

    const [addingCategory, addingCategorySet] = useState(false)
    const [addingATag, addingATagSet] = useState(false)

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

    const handleAddToCategory = async (categoryName: string, alreadyAdded: boolean) => {

        try {
            if (alreadyAdded) {
                await removeResourceFromCategory({ id: resourceObj.id }, { name: categoryName })

            } else {
                await addResourceToCategory({ id: resourceObj.id }, { name: categoryName })
            }

            toast.success("updated!")
            queryClient.invalidateQueries({ queryKey: ['categories', resourceObj.id] })
        } catch (error) {
            toast.error("category add error")
            console.log(`$error`, error);
        }
    }

    const handleAddTag = async (tagName: string, alreadyAdded: boolean) => {

        try {
            if (alreadyAdded) {
                await removeResourceFromTag({ id: resourceObj.id }, { name: tagName })

            } else {
                await addResourceToTag({ id: resourceObj.id }, { name: tagName })
            }

            toast.success("updated tag!")
            queryClient.invalidateQueries({ queryKey: ['tags', resourceObj.id] })

        } catch (error) {
            toast.error("tag add error")
            console.log(`$error`, error);
        }
    }

    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await getAllCategories(),
        refetchOnWindowFocus: false,
        enabled: addingCategory
    })

    const { data: resourceCategoriesData, isLoading: resourceCategoriesIsLoading } = useQuery({
        queryKey: ['categories', resourceObj.id],
        queryFn: async () => await getAllResourceCategories({ id: resourceObj.id }),
        refetchOnWindowFocus: false,
        enabled: addingCategory
    })

    const { data: tagsData } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => await getAllTags(),
        refetchOnWindowFocus: false,
        enabled: addingATag
    })

    const { data: resourceTagData, isLoading: resourceTagsIsLoading } = useQuery({
        queryKey: ['tags', resourceObj.id],
        queryFn: async () => await getAllResourceTags({ id: resourceObj.id }),
        refetchOnWindowFocus: false,
        enabled: addingATag
    })


    return (
        <div style={{ display: "grid", alignContent: "flex-start", gap: "1rem", border: "3px solid var(--tone95)", padding: "1rem", borderRadius: "1rem" }}>
            <button style={{ justifySelf: "center" }} onClick={() => {
                const newObj: resource = { ...resourceObj, approved: !resourceObj.approved }
                handleUpdate(newObj)
            }}>{resourceObj.approved ? "Remove Approval" : "Approve"}</button>

            <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
                {resourceCategoriesIsLoading && <p>Loading...</p>}
                {addingCategory && categoriesData && resourceCategoriesData && (
                    <div style={{ position: "absolute", top: 0, left: 0, padding: "1rem", backgroundColor: "#fff", width: "100%", display: "flex", flexDirection: "column", maxHeight: "70vh", overflowY: "auto" }}>
                        <div style={{ marginLeft: "auto" }} onClick={() => { addingCategorySet(false) }}>
                            <svg style={{ width: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", }}>
                            {categoriesData.map(eachCategory => {
                                const selectedCategory = resourceCategoriesData.find(eachSeenResouceCategory => eachSeenResouceCategory.name === eachCategory.name)

                                return (
                                    <div key={eachCategory.name} onClick={() => handleAddToCategory(eachCategory.name, selectedCategory ? true : false)}>
                                        <CategoryDisplay ElStyle={{ backgroundColor: selectedCategory ? "var(--mainColor)" : "" }} seenCategory={selectedCategory ? selectedCategory : eachCategory} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {addingATag && tagsData && resourceTagData && (
                    <div style={{ position: "absolute", top: 0, left: 0, padding: "1rem", backgroundColor: "#fff", width: "100%", display: "flex", flexDirection: "column", maxHeight: "70vh", overflowY: "auto" }}>
                        <div style={{ marginLeft: "auto" }} onClick={() => { addingATagSet(false) }}>
                            <svg style={{ width: "1.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", }}>
                            {tagsData.map(eachTag => {
                                const selectedTag = resourceTagData.find(eachPair => eachPair.tagName === eachTag.name)

                                return (
                                    <div key={eachTag.name} onClick={() => handleAddTag(eachTag.name, selectedTag ? true : false)}>
                                        <Tag text={eachTag.name} highlight={selectedTag ? true : false} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                <button style={{ margin: "0 auto" }} onClick={() => addingCategorySet(prev => !prev)}>{addingCategory ? "Close" : "Add Category"}</button>
                <button style={{ margin: "0 auto" }} onClick={() => addingATagSet(prev => !prev)}>{addingATag ? "Close" : "Add Tag"}</button>
            </div>

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
