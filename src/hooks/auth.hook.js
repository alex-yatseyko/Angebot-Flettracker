import { useState, useCallback, useEffect } from 'react'
 
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [ready, setReady] = useState([])

    const login = useCallback((jwtToken, jwtRefreshToken) => {
        setToken(jwtToken)
        setRefreshToken(jwtRefreshToken)

        localStorage.setItem(storageName.JSON.stringify({
            token: jwtToken, refreshToken: jwtRefreshToken
        }))

        console.log(localStorage)
        console.log(jwtToken)
    }, [])

    const logout = useCallback(() => {
        setToken( null )
        setRefreshToken( null )
        localStorage.removeItem( storageName )
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if ( data && data.token ) {
            login(data.token, data.refresh_token)
        }
        setReady(true)
    }, [ login ])

    return { login, logout, token, refreshToken }
}