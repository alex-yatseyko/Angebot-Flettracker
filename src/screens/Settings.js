import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
// import { Button } from '../components/Button'

import logo from '../assets/logo-2.png';
import { AuthContext } from '../context/AuthContext';

export const Settings = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    
    const logoutHandler = e => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <div className="content">
            <img src={ logo } alt="logo"/>
            {/* <Button text="Logout" onClick={ logoutHandler }/> */}
                <div className="btn-primary" onClick={ logoutHandler }>
                    Logout
                </div>
        </div>
    )
}
