'use client'
import { ReactNode, useContext, useCallback } from 'react'
import styles from './Pagination.module.scss'
import { cardsCount, searchContext } from '../../SearchContext'

const Pagination = (): ReactNode => {
    const { setContentIndexes, contentIndexes } = useContext(searchContext)
    const handleChangePage = useCallback((pageNumber: number) => {
        setContentIndexes((prev) => ({
            ...prev,
            contentStart: pageNumber * cardsCount,
            contentEnd: (pageNumber + 1) * cardsCount
        }))
    }, [])
    return (
        <div className={styles.pagination}>
            {
                contentIndexes.pageNumbers.map(num => {
                    return <button key={num} className={`${contentIndexes.contentStart / cardsCount === num ? styles.active : ''}`} id={num.toString()} onClick={() => handleChangePage(num)}>{num + 1}</button>
                })
            }
        </div>
    )
}

export default Pagination