import { Dispatch, SetStateAction } from "react"

export type TPost = {
    userId: number
    id: number
    title: string
    body: string
}
export type TAddress = {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
        lat: number
        lng: number
    }
}
export type TCompany = {
    name: string
    catchPhrase: string
    bs: string
}
export type TUser = {
    id: number
    name: string
    username: string
    email: string
    address: TAddress
    phone: string
    website: string
    company: TCompany
}
export type TIndexes = {
    contentStart: number
    contentEnd: number
    pageNumbers: number[]
}
export type TCards = Record<'data' | 'current', (TPost | TUser)[]>
export type TValue<T = TCards> = {
    search: string
    fetcher: (pathname: string) => Promise<void>
    searcher: (str: string) => void
    disabled: boolean
    contentIndexes: TIndexes
    setContentIndexes: Dispatch<SetStateAction<TIndexes>>
    cards: T
}