'use client'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'
import styles from './Sections.module.scss'
import { searchContext } from './SearchContext'

const SearchBar = ():ReactNode => {
    const {disabled, search, searcher} = useContext(searchContext)
    return (
        <div className={styles.aside}>
                <Link href={'/'}>main page</Link>
                <Link href={'/posts'}>Posts</Link>
                <Link href={'/users'}>Users</Link>
                <input type='text' name='search' value={search} onChange={e => searcher(e.target.value.trim().toLowerCase())} disabled={disabled} />
                <button onClick={() => searcher('')}>Clear</button>
            </div>
    )
}

export default SearchBar