import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    refresh_token: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
    ready: false
})