"use client"
import { category, resource } from '@/types';
import { getAllResourceCategories } from '@/utility/serverFunctions/handleCategories';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import CategoryDisplay from '../categories/CategoryDisplay';
import { bookmarkResource, checkIfResourceIsBookmarked, removeResourceBookmark } from '@/utility/serverFunctions/handleUsersToBookmarks';
import { useSession } from 'next-auth/react';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { getAmountOfResourceBookmarks } from '@/utility/serverFunctions/handleResources';
import { loadOgp } from '@/utility/serverFunctions/handleOgpLoad';

export default function ViewResource({ resource, fullScreen = false }: { resource: resource, fullScreen?: boolean }) {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    const [resourceImage, resourceImageSet] = useState("")

    const [dayDifferenceTime,] = useState(() => {
        const todaysDate = new Date();

        const timeDifference = todaysDate.getTime() - resource.createdAt.getTime()
        return timeDifference / (1000 * 3600 * 24)
    })

    const { data: resourceCategoriesData } = useQuery({
        queryKey: ['categories', resource.id],
        queryFn: async () => await getAllResourceCategories({ id: resource.id }),
        refetchOnWindowFocus: false,
        enabled: true
    })

    const { data: amtOfResourceBookmarksData } = useQuery({
        queryKey: ['bookmarks', resource.id],
        initialData: resource.amountOfUserBookmarks,
        queryFn: async () => await getAmountOfResourceBookmarks({ id: resource.id }),
        refetchOnWindowFocus: false,
    })

    const { data: userBookmarkedResourceData } = useQuery({
        queryKey: ['userBookmarked', resource.id],
        enabled: !session ? false : true,
        queryFn: async () => await checkIfResourceIsBookmarked({ id: session!.user.id }, { id: resource.id }),
        refetchOnWindowFocus: false,
    })



    const handleBookmarkResource = async () => {
        if (!session) return redirect("/api/auth/signin")
        if (userBookmarkedResourceData === undefined) return

        try {
            if (userBookmarkedResourceData) {
                //remove bookmark
                await removeResourceBookmark({ id: session.user.id }, { id: resource.id })

                toast.success("removed")
            } else {

                await bookmarkResource({ id: session.user.id }, { id: resource.id })

                toast.success("bookmarked")
            }

            await queryClient.invalidateQueries({ queryKey: ['userBookmarked', resource.id] })
            await queryClient.invalidateQueries({ queryKey: ['bookmarks', resource.id] })

        } catch (error) {
            toast.error("error")
            console.log(`$error`, error);
        }
    }


    useEffect(() => {
        const run = async () => {
            try {
                const result = await loadOgp(resource.link);

                if (result.ogImage && result.ogImage[0].url) {
                    resourceImageSet(result.ogImage[0].url)
                }

            } catch (error) {
                console.log(`$error loading ogp`, error);
            }
        }
        run()
    }, [])

    return (
        <div style={{ position: "relative", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "2rem" }}>
            {dayDifferenceTime <= 1 && (
                <div style={{ padding: ".5rem 1rem", backgroundColor: "var(--mainColor)", position: "absolute", top: 0, right: 0, borderRadius: "2rem", color: "#fff", margin: "1rem" }}>new</div>
            )}

            <div style={{ width: "100%", aspectRatio: '1/1', display: "grid", alignItems: "center", justifyItems: "center" }}>
                <Image alt={`${resource.name}'s image`} src={resourceImage ? resourceImage : "https://images.pexels.com/photos/158302/dahlia-flower-plant-nature-158302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} width={100} height={100} style={{ objectFit: "cover", maxWidth: "50%", height: "auto", aspectRatio: "1/1", borderRadius: "2rem", boxShadow: "0 0 5px 5px rgba(0,0,0,0.05)" }} />
            </div>

            <div style={{ padding: "1.5rem", display: "grid" }}>
                <div style={{ justifySelf: "flex-end", display: "flex", gap: ".5rem", alignItems: 'center', color: userBookmarkedResourceData ? "var(--secondaryColor)" : "" }} onClick={handleBookmarkResource}>
                    {amtOfResourceBookmarksData > 0 && <p>{amtOfResourceBookmarksData}</p>}

                    <svg style={{ fill: userBookmarkedResourceData ? "var(--secondaryColor)" : "" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg>
                </div>

                <p>{resource.name}</p>

                <div style={{ display: "flex", gap: ".5rem", fontSize: "var(--smallFontSize)", overflow: "auto" }}>
                    {resourceCategoriesData?.map(eachCategory => {
                        return (
                            <CategoryDisplay key={eachCategory.name} seenCategory={eachCategory} ElStyle={{ filter: "brightness(.8)", transformOrigin: "center left", borderRadius: ".7rem" }} showingAmountOfResources={false} pluralMode={false} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
