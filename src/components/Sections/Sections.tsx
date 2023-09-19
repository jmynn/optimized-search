'use server'
import { FunctionComponent, ReactNode, useContext } from 'react'
import styles from './Sections.module.scss'
import SearchContext from '../../SearchContext'
import SearchBar from '../SearchBar/SearchBar'

type Sections = {
    children: ReactNode
}

const Sections: FunctionComponent<Sections> = ({ children }): ReactNode => {
    return (
        <div className={styles.sections}>
            <SearchContext>
                <SearchBar />
                <div className={styles.content}>
                    {children}
                </div>
            </SearchContext>

        </div>
    )
}

export default Sections