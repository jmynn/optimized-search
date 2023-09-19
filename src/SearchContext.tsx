'use client'
import axios from "axios"
import { createContext, ReactNode, useCallback, useMemo, useState, Dispatch, SetStateAction } from "react"
import { TCards, TIndexes, TPost, TUser, TValue } from "./types/types"

export const searchContext = createContext<TValue>({} as TValue)
export const cardsCount: number = 10

const SearchContext = ({ children }: { children: ReactNode }): ReactNode => {
    const [search, setSearch] = useState<string>('')
    const [cards, setCards] = useState<TCards>({
        data: [] as (TPost | TUser)[],
        current: [] as (TPost | TUser)[]
    })

    const [disabled, setDisabled] = useState<boolean>(true)

    const [contentIndexes, setContentIndexes] = useState<TIndexes>({
        contentStart: 0,
        contentEnd: 10,
        pageNumbers: [],
    })

    const fetcher = useCallback(async (pathname: string): Promise<void> => { 
        const { data }: { data: (TPost | TUser)[] } = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
        setCards({
            data, 
            current: data
        })
        setDisabled(data?.length ? false : true)
        setContentIndexes(prev => {
            const pages: number[] = []
            for (let i = 0; i < (data.length / cardsCount); i++) pages.push(i)
            return {...prev, pageNumbers: pages}
        })
    }, [])

    const searcher = useCallback((str: string) => { 
        setSearch(str)
        setCards((prev) => {
            if(!cards) return {...prev, current: []}
            const filtered = [...prev.data].filter(item => {
                if (str === '') return item
                if ('userId' in item) {
                    if (item.title.toLowerCase().includes(str) || item.body.toLowerCase().includes(str)) return item
                } else if (item.name.toLowerCase().includes(str)) return item
            })
            setContentIndexes(prev => {
                const pages: number[] = []
                for (let i = 0; i < (filtered.length / cardsCount); i++) pages.push(i)
                return {...prev, pageNumbers: pages}
            })
            return {...prev, current: filtered}
        })
    }, [cards])

    const resultValue = useMemo(() => ({
        search,
        cards,
        disabled,

        fetcher,
        searcher,

        contentIndexes,
        setContentIndexes

    }), [search, cards, fetcher, searcher, disabled, contentIndexes])

    return (
        <searchContext.Provider value={resultValue}>
            {children}
        </searchContext.Provider>
    )
}

export default SearchContext