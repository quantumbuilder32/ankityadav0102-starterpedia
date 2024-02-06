import React from 'react'
import styles from "./categoriesdisplay.module.css"
import { category } from '@/types'
import Link from 'next/link'

const transofrmCategoryName = (name: string, pluralMode: boolean) => {
    if (pluralMode) return name



    if (name === "communities") {
        return "community"
    } else return name.slice(0, -1)
}

export default function CategoryDisplay({ seenCategory, ElStyle, showingAmountOfResources = true, pluralMode = true }: { seenCategory: category, ElStyle?: React.CSSProperties, showingAmountOfResources?: boolean, pluralMode?: boolean }) {
    return (
        <Link href={{
            pathname: '/',
            query: { category: seenCategory.name },
        }}
            scroll={false}
            key={seenCategory.name} style={{ ...ElStyle }} className={styles.categoryButton}>
            {transofrmCategoryName(seenCategory.name, pluralMode)}

            {showingAmountOfResources && <span> {seenCategory.amountOfResources}</span>}
        </Link>
    )
}
