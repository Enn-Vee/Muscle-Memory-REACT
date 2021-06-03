import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

function MainNavBar() {

    const {user} = useContext(UserContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light container">
            <Link to={{pathname: "/home"}}>Muscle Memory</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#links" aria-controls="links" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="links" className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li key="log-in" className="nav-item active mx-2">
                        <a href="#about" id="about-link" className="nav-link">About</a>
                    </li>
                    <li key="Reasons" className="nav-item mx-2">
                        <Link to={{pathname: "/register"}} id="reasons-link" className="nav-link">Reasons</Link>
                    </li>
                    <li key="Features" className="nav-item mx-2">
                        <Link to={{pathname: "/register"}} id="features-link" className="nav-link">Features</Link>
                    </li>
                    <li key="Contact Me" className="nav-item mx-2">
                        <Link to={{pathname: "/register"}} id="contacts-link" className="nav-link">Contact Me</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainNavBar
