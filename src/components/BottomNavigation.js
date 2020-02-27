import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

export const BottomNavigation = () => {
    return (
        <div className="nav">
            <Link to="/map">
                <FontAwesomeIcon className="nav-icon" icon={faGlobe} />
            </Link>
            <Link to="/list">
                <FontAwesomeIcon className="nav-icon" icon={faList} />
            </Link>
            <Link to="/settings">
                <FontAwesomeIcon className="nav-icon" icon={faCog} />
            </Link>
          </div>
    )
}
