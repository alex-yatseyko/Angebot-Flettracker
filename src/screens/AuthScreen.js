import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
// import { Button } from '../components/Button'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo-2.png';

export const AuthScreen = () => {
    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()
    const [form, setForm] = useState({
        name: '',
        password: ''
    })

    useEffect(() => {
        console.log('Error', error ? error : 'No errors found')
    }, [error])

    useEffect(() => {
        // window.M.updateTextFields()
    }, [])

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('https://staging.api.app.fleettracker.de/api/token', 'POST', {...form}, {'Content-Type': 'application/json'})
            // console.log('Token: ', data.token)
            // console.log('RefreshToken', data.refresh_token)
            // console.log(data)
            auth.login(data.token, data.refresh_token)
        } catch (e) {
            // console.log('Name or Password is incorrect')
            // console.log( 'Authentification:', e ? e : true )
        }
    }

    return (
        <div className="content">
            <img src={ logo } alt="logo"/>
            <input 
                placeholder="Name"
                type="text"
                id="name"
                name="name"
                onChange={ changeHandler }
            />
            <input 
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                onChange={ changeHandler }
            />

                <div className="btn-primary" onClick={ loginHandler }>
                    Login
                </div>
        </div>
    )
}

// {
//     "name": "vegadebug",
//     "password": "test"
//     }

// https://staging.api.app.fleettracker.de/api/token
