import React from 'react'
import styles from "./categoriesdisplay.module.css"
import CategoryDisplay from './CategoryDisplay'
import { category } from '@/types'

export default async function CategoriesDisplay({ categories, searchParams }: { categories: category[], searchParams: { category: string } }) {

    return (
        <div style={{ display: 'grid', gridTemplateColumns: "auto auto auto", gap: "1rem", justifyContent: "space-between", alignItems: "center", paddingInline: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ border: '1px solid var(--tone95)', padding: '.5rem 1rem', borderRadius: ".2rem" }}>Filter</div>

            <div className="noScrollBar" style={{ display: "flex", gap: "1rem", overflow: "auto" }}>
                {categories.map(eachCategory => {
                    let currentlySelected = eachCategory.name === searchParams.category
                    if (!searchParams.category && eachCategory.name === "all") currentlySelected = true

                    return (
                        <CategoryDisplay key={eachCategory.name} seenCategory={eachCategory} ElStyle={{ backgroundColor: currentlySelected ? "var(--mainColor)" : "", color: currentlySelected ? "#fff" : "" }} showingAmountOfResources={eachCategory.amountOfResources === Infinity ? false : true} />
                    )
                })}
            </div>
        </div>)
}
