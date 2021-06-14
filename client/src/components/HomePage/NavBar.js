import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import '../NavBar.css'

function NavBar() {

    const {user, logOut} = useContext(UserContext);

    return (
        <nav id="navbar"className="navbar navbar-expand-lg navbar-dark container">
            <Link to={{pathname:"/"}} className="navbar-brand">Muscle Memory</Link>
        </nav>
    )
}

export default NavBar
