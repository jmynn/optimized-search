'use client'
import { ReactNode, useContext, useEffect } from 'react'
import styles from './Contents.module.scss'
import { searchContext } from './SearchContext'
import {usePathname} from 'next/navigation'

const Contents = ():ReactNode => {
    const {current, fetcher} = useContext(searchContext)
    const pathname = usePathname()    
    useEffect(() => {
        fetcher(pathname)
    }, [])

    return (
        <div className={styles.cards}>
            {
                current.length ? current.map((card, i) => {
                    if('userId' in card) {
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