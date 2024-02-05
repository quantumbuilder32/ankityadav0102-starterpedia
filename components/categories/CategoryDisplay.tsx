import React from 'react'
import styles from "./categoriesdisplay.module.css"
import { category } from '@/types'

export default function CategoryDisplay({ seenCategory, ElStyle }: { seenCategory: category, ElStyle?: React.CSSProperties }) {
    return (
        <div key={seenCategory.name} style={{ ...ElStyle }} className={styles.categoryButton}>{seenCategory.name} <span>{seenCategory.amountOfResources}</span></div>
    )
}
