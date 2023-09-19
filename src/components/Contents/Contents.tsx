'use client'
import { ReactNode, useContext, useDeferredValue, useEffect } from 'react'
import styles from './Contents.module.scss'
import { searchContext } from '../../SearchContext'
import { usePathname } from 'next/navigation'
import Pagination from '../Pagination/Pagination'

const Contents = (): ReactNode => {
    const { cards, fetcher, contentIndexes } = useContext(searchContext)
    const deffered = useDeferredValue(cards.current)
    const pathname = usePathname()
    useEffect(() => {
        fetcher(pathname)
    }, [])

    return (
        <div className={styles.cards}>
            {
                deffered.length ?
                <Pagination /> :
                null
            }
            {
                deffered.length ? deffered.slice(contentIndexes.contentStart, contentIndexes.contentEnd).map((card, i) => {
                    if ('userId' in card) {
                        return (
                            <div className={styles.card} key={i} id={`${card.id}`}>
                                <div className={styles.title}>{card.title}</div>
                                <div className={styles.body}>{card.body}</div>
                            </div>
                        )
                    } else {
                        return (
                            <div className={styles.card} key={i} id={`${card.id}`}>
                                <div className={styles.name}>{card.name}</div>
                                <div className={styles.email}>{card.email}</div>
                            </div>
                        )
                    }
                }) : <h1>Nothing not found</h1>
            }

        </div>
    )
}

export default Contents