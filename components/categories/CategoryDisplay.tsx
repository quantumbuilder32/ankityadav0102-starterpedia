import React from 'react'
import styles from "./categoriesdisplay.module.css"
import { category } from '@/types'
import Link from 'next/link'

export default function CategoryDisplay({ seenCategory, ElStyle, showingAmountOfResources = true }: { seenCategory: category, ElStyle?: React.CSSProperties, showingAmountOfResources?: boolean }) {
    return (
        <Link href={{
            pathname: '/',
            query: { category: seenCategory.name },
        }}
            scroll={false}
            key={seenCategory.name} style={{ ...ElStyle }} className={styles.categoryButton}>
            {seenCategory.name}

            {showingAmountOfResources && <span> {seenCategory.amountOfResources}</span>}
        </Link>
    )
}
