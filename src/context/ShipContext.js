import {createContext} from 'react'
// import { useHttp } from '../hooks/http.hook'

export const ShipContext = createContext({
    ships: [],
    shipsIds: []
})