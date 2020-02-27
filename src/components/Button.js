import React from 'react'
import { Link } from 'react-router-dom'

export const Button = ({ text, path }) => {
    return (
        <Link to={path} exact className="btn">
            <div className="btn-primary">
                { text }
            </div>
        </Link>
    )
}
