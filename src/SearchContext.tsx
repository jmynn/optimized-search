'use client'
import axios from "axios"
import { createContext, ReactNode, useCallback, useMemo, useState } from "react"

export const searchContext = createContext<TValue>({} as TValue)

type TPost = {
    userId: number
    id: number
    title: string
    body: string
}
type TAddress = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
        lat: number
        lng: number
    }
}
type TCompany = {
    name: string
    catchPhrase: string
    bs: string
}
type TUser = {
    id: number
    name: string
    username: string
    email: string
    address: TAddress
    phone: string
    website: string
    company: TCompany
}
type TValue = {
    search: string
    current: (TPost | TUser)[]
    fetcher: (pathname: string) => Promise<void>
    searcher: (str: string) => void
    disabled: boolean
}

const SearchContext = ({children} : {children :  ReactNode}):ReactNode => {
    const [search, setSearch] = useState<string>('')
    const [cards, setCards] = useState<(TPost| TUser)[]>([] as (TPost | TUser)[])

    const [current, setCurrent] = useState<(TPost | TUser)[]>([] as (TPost | TUser)[])
    const [disabled, setDisabled] = useState<boolean>(true)

    const fetcher = useCallback(async (pathname: string) => { 
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
        setCards(data)
        setCurrent(data)
        setDisabled(data?.length ? false : true)
    }, [])

    const searcher = useCallback((str: string) => {
        setSearch(str)
        setCurrent(cards && [...cards].filter(item => {
            if(str === '') return item
            if('userId' in item) {
                if(item.title.toLowerCase().includes(str) || item.body.toLowerCase().includes(str)) return item
            } else if(item.name.toLowerCase().includes(str)) return item
            
        }))
    }, [cards])

    const resultValue = useMemo(() => ({
        search,
        current,
        disabled,

        fetcher,
        searcher

    }), [search, current, fetcher, searcher, disabled])

    return (
        <searchContext.Provider value={resultValue}>
            {children}
        </searchContext.Provider>
    )
}

export default SearchContext