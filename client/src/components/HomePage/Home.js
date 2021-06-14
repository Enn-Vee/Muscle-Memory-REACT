import React, { useEffect, useContext} from 'react'
import { UserContext } from '../../contexts/UserContext'
import NavBar from './NavBar';
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {

    const {user, logOut} = useContext(UserContext);

    useEffect(() => {
        document.title = "Muscle Memory | Home"
    },[])

    return (
        <div className="container-fluid">
            <section id="landing-page">
                <NavBar />
                <div id ="landing-content">
                    <h1 className="site-name">Muscle Memory</h1>
                    <p>Submit individual exercises and make customized workout regimens!</p>
                    {user ? <>
                        <h3>Welcome back, {user.username}!</h3> 
                        <hr className="separator" />
                        <Link to={{pathname: "/main"}} className="btn btn-outline-light btn-lg">Start Browsing</Link>
                        <br />
                        <button onClick={logOut}className="btn btn-outline-light btn-small mt-2">Log Out</button>
                    </>:
                    <>
                        <Link to={{pathname: "/register"}} className="btn btn-outline-light">Sign Up</Link>
                        <Link to={{pathname: "/login"}} className="btn btn-outline-light">Log In</Link>  
                    <hr className="separator" />
                    <Link to={{pathname: "/main"}} className="btn btn-outline-light btn-lg">Continue as Guest</Link>
                    </>}
                    

                </div>
            </section>     
        </div>
    )
}

export default Home
