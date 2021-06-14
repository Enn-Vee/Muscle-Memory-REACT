import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import '../NavBar.css'

function MainNavBar() {

    const {user, logOut} = useContext(UserContext);
    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light container">
            <Link to={{pathname: "/home"}} className="navbar-brand">Muscle Memory</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#links" aria-controls="links" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="links" className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    {!user ? 
                    <>
                        <li className="nav-item mx-2">
                            <Link to={{pathname: "/register"}} className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link to={{pathname: "/login"}} className="nav-link">Log In</Link>  
                        </li>
                    </>
                    : 
                    <>
                        <li className="nav-item mx-2">
                            <p className="nav-link nav-greeting">
                                Welcome, {user.username}!
                            </p>
                        </li>
                        <li className="nav-item mx-2">
                            <button type="button" className="nav-link nav-button" onClick={logOut}>Sign Out</button>  
                        </li>
                    </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default MainNavBar
